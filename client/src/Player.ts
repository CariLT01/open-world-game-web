import { type RigidBody, type World } from "@dimforge/rapier3d-compat";
import { RAPIER } from "./RapierInstance";
import { type Camera } from "three";
import { ClientEventBus } from "./ClientEventBus";
import { EventBusEvent } from "../../common/EventTypes";
import { PlayerMovePacket } from "../../common/packets/PlayerMovePacket";
import { Vector3 } from "../../common/Core/Vector3";

export class Player {
    private playerBody: RigidBody;
    private pitch = 0;
    private yaw = 0;
    private sensitivity = 0.002;
    private keysPressed: Set<string> = new Set();

    private physicsWorld: World;

    private username: string;

    private _lastMovePacketTime: number = 0;


    constructor(world: World, username: string) {
        this.physicsWorld = world;
        this.username = username;

        const playerBodyDesc = RAPIER.RigidBodyDesc.dynamic();
        playerBodyDesc.setTranslation(0, 100, 0);
        playerBodyDesc.lockRotations();

        const colliderDesc = RAPIER.ColliderDesc.capsule(1, 0.5);

        this.playerBody = world.createRigidBody(playerBodyDesc);
        world.createCollider(colliderDesc, this.playerBody);

        document.addEventListener("mousemove", (event) => {
            this.yaw -= event.movementX * this.sensitivity;
            this.pitch -= event.movementY * this.sensitivity;

            const maxPitch = Math.PI / 2 - 0.01; // just below 90 degrees
            this.pitch = Math.max(-maxPitch, Math.min(maxPitch, this.pitch));
        });

        document.addEventListener("keydown", (ev) => {
            this.keysPressed.add(ev.key.toLowerCase());

            console.log("Key down: ", ev.key.toLowerCase());

            if (ev.code == "Space") {
                const capsuleHalfHeight = 1;
                const playerPos = this.playerBody.translation();

                const rayOrigin = {
                    x: playerPos.x,
                    y: playerPos.y, // slightly above feet
                    z: playerPos.z,
                };

                const ray = new RAPIER.Ray(
                    new RAPIER.Vector3(rayOrigin.x, rayOrigin.y, rayOrigin.z),
                    new RAPIER.Vector3(0, -1, 0),
                );

                const rayLength = 2; // very small distance just below feet
                const hit = this.physicsWorld.castRay(ray, rayLength, false);

                if (hit) {
                    console.log(hit);
                    this.playerBody.applyImpulse({ x: 0, y: 15, z: 0 }, true);
                } else {
                    console.log("no double jump allowed");
                }
            }
        });
        document.addEventListener("keyup", (ev) => {
            this.keysPressed.delete(ev.key.toLowerCase());
        });
    }

    handleTranslation(delta: number) {
        const forward = new Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
        const right = new Vector3(
            Math.sin(this.yaw + Math.PI / 2),
            0,
            Math.cos(this.yaw + Math.PI / 2),
        );

        let dir = Vector3.zero();

        const SPEED = -15;

        if (this.keysPressed.has("w")) dir.addMut(forward);
        if (this.keysPressed.has("s")) dir.subMut(forward);
        if (this.keysPressed.has("d")) dir.subMut(right);
        if (this.keysPressed.has("a")) dir.addMut(right);

        // console.log("Initial velocity: ", dir.x, dir.y, dir.z);

        const newDir = dir.normalize().mulScalar(SPEED);

        // console.log("Apply velocity: ", newDir.x, newDir.y, newDir.z);

        this.playerBody.setLinvel(
            { x: newDir.x, y: this.playerBody.linvel().y, z: newDir.z },
            true,
        );
    }

    sendMovePacket() {
        // 20 times per second
        if (Date.now() - this._lastMovePacketTime < 50) return;
        this._lastMovePacketTime = Date.now();

        const playerMovePacket = new PlayerMovePacket();

        playerMovePacket.name = this.username;
        playerMovePacket.position = new Vector3(
            this.playerBody.translation().x,
            this.playerBody.translation().y,
            this.playerBody.translation().z,
        );

        ClientEventBus.invokeEvent(EventBusEvent.SEND_PACKET, {
            packet: playerMovePacket,
        });
    }

    tick(camera: Camera, delta: number) {
        this.handleTranslation(delta);

        camera.position.set(
            this.playerBody.translation().x,
            this.playerBody.translation().y + 1 * 0.4,
            this.playerBody.translation().z,
        );
        camera.updateMatrix();

        // console.log("At: ", camera.position.x, camera.position.y, camera.position.z);

        camera.rotation.set(this.pitch, this.yaw, 0, "YXZ");

        this.sendMovePacket();
    }

    getPosition() {
        return this.playerBody.translation();
    }

    setPosition(x: number, y: number, z: number) {
        this.playerBody.setTranslation(new RAPIER.Vector3(x, y, z), true);
    }
}
