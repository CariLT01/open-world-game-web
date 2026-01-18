import * as THREE from "three";
export type Vec3Fast = [number, number, number];
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    set(x: number, y: number, z: number): void;
    copy(other: Vector3): void;
    add(other: Vector3): Vector3;
    sub(other: Vector3): Vector3;
    mul(other: Vector3): Vector3;
    mulScalar(scalar: number): Vector3;
    div(other: Vector3): Vector3;
    divScalar(scalar: number): Vector3;
    length(): number;
    lengthSq(): number;
    normalize(): Vector3;
    clone(): Vector3;
    toArray(): number[];
    toThreeVec3(): THREE.Vector3;
    toFastVec3(): Vec3Fast;
    toKey(): string;
    fromKey(s: string): void;
    toChunkIndex(): number;
}
//# sourceMappingURL=Vector3.d.ts.map