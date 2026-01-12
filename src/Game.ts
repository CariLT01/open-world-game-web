import { BufferAttribute, BufferGeometry, GridHelper, HemisphereLight, Material, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { Chunk, CHUNK_SIZE } from "./Terrain/Chunk";
import { Vector3 } from "./Core/Vector3";
import * as THREE from 'three'
import { TerrainBuilder, type Triangle } from "./Terrain/TerrainBuilder";
import { OrbitControls, Sky } from "three/examples/jsm/Addons.js";
import FastNoiseLite from "fastnoise-lite";
import type { MaterialIndex } from "./Terrain/ChunkData";
import { WorldChunks } from "./WorldChunks";
import { RAPIER } from "./RapierInstance";
import type { World } from "@dimforge/rapier3d-compat";
import { Player } from "./Player";

export class Game {

    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private renderer!: WebGLRenderer;
    private testMesh!: Mesh;
    private controls!: Player;
    private worldChunks!: WorldChunks;
    private physicsWorld!: World;

    private sky!: Sky;


    constructor() {


        this.renderLoop = this.renderLoop.bind(this);



    }

    async asyncInit() {
        await RAPIER.init();

        this.physicsWorld = new RAPIER.World(
            new RAPIER.Vector3(0, -9.81, 0)
        );
    }

    async initialize() {

        await this.asyncInit();

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.set(0, 2, 5);

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);





        const sky = new Sky();
        sky.scale.setScalar(200); // really big
        this.scene.add(sky);

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

        this.controls = new Player(this.physicsWorld);



        this.worldChunks = new WorldChunks(this.scene, this.physicsWorld);

        this.renderer.domElement.addEventListener("click", () => {
            this.renderer.domElement.requestPointerLock();
        })

        
    }

    private updateSkyPosition() {
        this.sky.position.set(this.controls.getPosition().x, this.controls.getPosition().y, this.controls.getPosition().z);
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }
    private tick() {

        this.controls.tick(this.camera);

        this.physicsWorld.step();
        const v = this.controls.getPosition();
        const chunkPos = new Vector3(
            Math.round(v.x / CHUNK_SIZE),
            Math.round(v.y / CHUNK_SIZE),
            Math.round(v.z / CHUNK_SIZE)
        );
        this.worldChunks.tick(chunkPos, this.controls);

        this.updateSkyPosition();

    }


    renderLoop() {

        this.tick();
        this.render();

        requestAnimationFrame(this.renderLoop);
    }
}