import { type World } from "@dimforge/rapier3d-compat";
import { type Camera } from "three";
export declare class Player {
    private playerBody;
    private pitch;
    private yaw;
    private sensitivity;
    private keysPressed;
    private physicsWorld;
    constructor(world: World);
    handleTranslation(): void;
    tick(camera: Camera): void;
    getPosition(): import("@dimforge/rapier3d-compat").Vector;
    setPosition(x: number, y: number, z: number): void;
}
//# sourceMappingURL=Player.d.ts.map