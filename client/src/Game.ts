import { BufferAttribute, BufferGeometry, GridHelper, HemisphereLight, Material, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { Chunk, CHUNK_SIZE } from "../../common/Chunk";
import { Vector3 } from "../../common/Core/Vector3";
import * as THREE from 'three'
import { TerrainBuilder, type Triangle } from "./Terrain/TerrainBuilder";
import { OrbitControls, Sky } from "three/examples/jsm/Addons.js";
import FastNoiseLite from "fastnoise-lite";
import type { MaterialIndex } from "../../common/ChunkData";
import { WorldChunks } from "./WorldChunks";
import { RAPIER } from "./RapierInstance";
import type { World } from "@dimforge/rapier3d-compat";
import { Player } from "./Player";
import { debugGlobal } from "./DebugGlobal";
import { NetworkHandler } from "../../server/src/NetworkHandler";
import { ClientNetworkingHandler } from "./ClientNetworkingHandler";
import { ClientEventBus } from "./ClientEventBus";
import { EventBusEvent } from "../../common/EventTypes";
import { PlayerJoinPacket } from "../../common/packets/PlayerJoinPacket";
import { EventBus } from "../../common/EventBus";
import { PlayersManager } from "./Networking/PlayersManager";
import { GameSetup } from "./GameSetup";
import { LocalInventory } from "./LocalInventory";
import { WebGPURenderer } from "three/webgpu";
import { HeldItem } from "./HeldItem";

export class Game {

    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private renderer!: WebGPURenderer;
    private testMesh!: Mesh;
    private controls!: Player;
    private worldChunks!: WorldChunks;
    private physicsWorld!: World;
    private clock: THREE.Clock = new THREE.Clock();

    private crashed: boolean = false;



    private sky!: Sky;
    private accumulator: number = 0;

    private playerUsername: string = prompt("Enter your username:") ?? "Guest"; // Temporary
    private networkingHandler: ClientNetworkingHandler = new ClientNetworkingHandler();
    private playersManager: PlayersManager = new PlayersManager(this.playerUsername);

    private localInventory: LocalInventory = new LocalInventory();
    private handheldItem!: HeldItem;

    private pointerLocked: boolean = true;

    constructor() {


        this.renderLoop = this.renderLoop.bind(this);


        ClientEventBus.on(EventBusEvent.FATAL_CRASH_STATE, (data) => {
            this.crashed = true;
        })
    }

    async asyncInit() {
        await RAPIER.init();

        this.physicsWorld = new RAPIER.World(
            new RAPIER.Vector3(0, -9.81, 0)
        );
    }

    private async _createWorldAndEnvironment() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.set(0, 2, 5);

        this.renderer = new WebGPURenderer({ antialias: true });
        await this.renderer.init();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);





        const sky = new Sky();
        sky.scale.setScalar(200); // really big
        /// this.scene.add(sky);
        this.scene.background = new THREE.Color().setRGB(135 / 255, 206 / 255, 235 / 255);

        const sun = new THREE.Vector3();
        sun.setFromSphericalCoords(
            1,               // radius (distance doesn't really matter)
            Math.PI * 0.49,     // inclination (vertical angle)
            Math.PI * 2 * 0.25                // azimuth (horizontal rotation)
        );

        sky.material.uniforms['sunPosition']!.value.copy(sun);
        sky.material.uniforms['turbidity']!.value = 10;       // haze in the air
        sky.material.uniforms['rayleigh']!.value = 2;         // scattering of small particles
        sky.material.uniforms['mieCoefficient']!.value = 0.005;
        sky.material.uniforms['mieDirectionalG']!.value = 0.8;

        this.sky = sky;

        const sunLight = new THREE.DirectionalLight(0xffffff, 1); // color, intensity
        sunLight.position.copy(sky.material.uniforms['sunPosition']!.value);

        this.scene.add(sunLight);

        const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x444444, 0.6);
        this.scene.add(hemiLight);

        this.renderer.toneMappingExposure = 0.9;

        const gridHelper = new GridHelper(10, 10);
        this.scene.add(gridHelper);
        this.scene.add(this.camera);

        this.handheldItem = new HeldItem(this.camera);
    }


    private async _setupEvents() {
        ClientEventBus.on(EventBusEvent.CLIENT_ADD_TO_SCENE, (data) => {
            this.scene.add(data.object);
        })

        ClientEventBus.on(EventBusEvent.CLIENT_REMOVE_FROM_SCENE, (data) => {
            this.scene.remove(data.object);
        })
    }

    private async _runSetupProcesses() {
        const setup = new GameSetup();

        setup.runSetupProcesses();
    }

    async initialize() {

        ClientEventBus.on(EventBusEvent.CLIENT_SOCKET_CONNECTED, () => {
            console.log("Client socket connected, sending username");

            const joinPacket = new PlayerJoinPacket();
            joinPacket.name = this.playerUsername;

            ClientEventBus.invokeEvent(EventBusEvent.SEND_PACKET, {packet: joinPacket});
        })

        this.networkingHandler.connect();

        await this.asyncInit();
        await this._createWorldAndEnvironment();
        await this._setupEvents();
        await this._runSetupProcesses();



        this.controls = new Player(this.physicsWorld, this.playerUsername);
        this.worldChunks = new WorldChunks(this.scene, this.physicsWorld);

        this.renderer.domElement.addEventListener("click", () => {
            if (this.pointerLocked) {
                this.renderer.domElement.requestPointerLock();
            }
        })

        ClientEventBus.on(EventBusEvent.CLIENT_TOGGLE_POINTER_LOCK, (data) => {
            this.pointerLocked = data.lockPointer;
            if (data.lockPointer) {
                this.renderer.domElement.requestPointerLock();
            } else {
                document.exitPointerLock();
            }
        })


    }

    private updateSkyPosition() {
        this.sky.position.set(this.controls.getPosition().x, this.controls.getPosition().y, this.controls.getPosition().z);
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }
    private tick(delta: number) {

        this.networkingHandler.tick();

        this.controls.tick(this.camera, delta);

        this.accumulator += delta;

        while (this.accumulator >= 1 / 60) {
            this.physicsWorld.timestep = 1 / 60;
            this.physicsWorld.step();
            this.accumulator -= 1 / 60;
        }

        const v = this.controls.getPosition();
        const chunkPos = new Vector3(
            Math.round(v.x / CHUNK_SIZE),
            Math.round(v.y / CHUNK_SIZE),
            Math.round(v.z / CHUNK_SIZE)
        );
        this.worldChunks.tick(chunkPos, this.controls, this.camera);

        this.updateSkyPosition();

    }


    renderLoop() {

        if (this.crashed) {
            throw new Error("Game crashed");
        }

        const delta = this.clock.getDelta();

        this.tick(delta);
        this.render();

        debugGlobal.render();

        requestAnimationFrame(this.renderLoop);
    }
}