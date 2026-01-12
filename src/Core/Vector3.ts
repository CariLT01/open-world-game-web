import * as THREE from "three";

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

    set(x: number, y: number, z: number) {
        this.x = x!;
        this.y = y!;
        this.z = z!;
    }
    copy(other: Vector3) {
        this.x = other.x;
        this.y = other.x;
        this.z = other.z;
    }
    add(other: Vector3) {
        return new Vector3(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        )
    }
    sub(other: Vector3) {
        return new Vector3(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z
        )
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





}