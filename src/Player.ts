import { type RigidBody, type World } from "@dimforge/rapier3d-compat";
import { RAPIER } from "./RapierInstance";
import { Vector3, type Camera } from "three";


export class Player {

    private playerBody: RigidBody;
    private pitch = 0;
    private yaw = 0;
    private sensitivity = 0.002;
    private keysPressed: Set<string> = new Set();

    private physicsWorld: World;

    constructor(world: World) {

        this.physicsWorld = world;

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
        })

        document.addEventListener("keydown", (ev) => {
            this.keysPressed.add(ev.key.toLowerCase());

            if (ev.code == "Space") {

                const capsuleHalfHeight = 1;
                const playerPos = this.playerBody.translation();

                const rayOrigin = {
                    x: playerPos.x,
                    y: playerPos.y, // slightly above feet
                    z: playerPos.z
                };

                const ray = new RAPIER.Ray(
                    new RAPIER.Vector3(rayOrigin.x, rayOrigin.y, rayOrigin.z),
                    new RAPIER.Vector3(0, -1, 0)
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
        })
        document.addEventListener("keyup", (ev) => {
            this.keysPressed.delete(ev.key.toLowerCase());
        })

    }

    handleTranslation() {
        const forward = new Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
        const right = new Vector3(Math.sin(this.yaw + Math.PI / 2), 0, Math.cos(this.yaw + Math.PI / 2));

        let dir = new Vector3(0, 0, 0);

        if (this.keysPressed.has("w")) dir.add(forward);
        if (this.keysPressed.has("s")) dir.sub(forward);
        if (this.keysPressed.has("d")) dir.sub(right);
        if (this.keysPressed.has("a")) dir.add(right);

        dir.normalize().multiplyScalar(-15);
        this.playerBody.setLinvel({ x: dir.x, y: this.playerBody.linvel().y, z: dir.z }, true);
    }

    tick(camera: Camera) {

        this.handleTranslation();

        camera.position.set(this.playerBody.translation().x, this.playerBody.translation().y + 1 * 0.4, this.playerBody.translation().z);
        camera.updateMatrix();

        console.log("At: ", camera.position.x, camera.position.y, camera.position.z);

        camera.rotation.set(this.pitch, this.yaw, 0, "YXZ");


    }

    getPosition() {
        return this.playerBody.translation();
    }

    setPosition(x: number, y: number, z: number) {
        this.playerBody.setTranslation(new RAPIER.Vector3(x, y, z), true);
    }
}