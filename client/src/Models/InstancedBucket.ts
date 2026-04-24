import type { InstancedMesh } from "three";

export class InstancedBucket {
    mesh: InstancedMesh;
    capacity: number;
    used = 0;

    constructor(mesh: InstancedMesh, capacity: number) {
        this.mesh = mesh;
        this.capacity = capacity;
    }
}