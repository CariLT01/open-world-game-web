import * as THREE from "three";
import { CHUNK_SIZE } from "../Config";

export type Vec3Fast = [number, number, number];

export class Vector3 {

    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromThreeVector3(v: THREE.Vector3) {
        return new Vector3(v.x, v.y, v.z);
    }

    static zero() {
        return new Vector3(0, 0, 0);
    }

    set(x: number, y: number, z: number) {
        this.x = x!;
        this.y = y!;
        this.z = z!;
    }
    copy(other: Vector3) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
    }
    add(other: Vector3) {
        return new Vector3(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        )
    }

    addMut(other: Vector3) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    addScalar(s: number) {
        return new Vector3(
            this.x + s,
            this.y + s,
            this.z + s
        )
    }

    sub(other: Vector3) {
        return new Vector3(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z
        )
    }
    subMut(other: Vector3) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    mul(other: Vector3) {
        return new Vector3(
            this.x * other.x,
            this.y * other.y,
            this.z * other.z
        )
    }
    mulScalar(scalar: number) {
        return new Vector3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        )
    }
    div(other: Vector3) {
        return new Vector3(
            this.x / other.x,
            this.y / other.y,
            this.z / other.z
        )
    }
    divScalar(scalar: number) {
        return new Vector3(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar
        )
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    normalize() {
        const l = this.length();
        if (l === 0) {
            return new Vector3(0, 0, 0);
        }

        return new Vector3(
            this.x / l,
            this.y / l,
            this.z / l
        );
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    toThreeVec3() {
        return new THREE.Vector3(this.x, this.y, this.z);
    }
    toFastVec3() {
        return [this.x, this.y, this.z] as Vec3Fast;
    }

    toKey() {
        return `${this.x},${this.y},${this.z}`;
    }

    fromKey(s: string) {
        const [x, y, z] = s.split(',').map(Number);
        this.x = x!;
        this.y = y!;
        this.z = z!;
    }

    toChunkIndex() {
        return this.x * CHUNK_SIZE * CHUNK_SIZE + this.y * CHUNK_SIZE + this.z;
    }
    dot(other: Vector3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }


    distanceTo(v: Vector3) {
        return this.sub(v).length();
    }





}