import { Euler, InstancedMesh, Matrix4, Object3D, Quaternion } from "three";
import type { Vector3 } from "../../../common/Core/Vector3";
import { InstancedBucket } from "./InstancedBucket";
import { ClientEventBus } from "../ClientEventBus";
import { EventType } from "../../../common/EventTypes";



export class InstancedModelsManager {

    private instancedMeshes: Map<string, InstancedBucket> = new Map();
    private freeIndices: Map<string, number[]> = new Map();
    private usedCounters: Map<string, number> = new Map();
    private baseMatrices: Map<string, Matrix4> = new Map();

    private tempMatrix = new Matrix4();

    constructor() {

    }

    private growInstancedMesh(oldMesh: InstancedMesh, newSize: number) {
        const newMesh = new InstancedMesh(
            oldMesh.geometry,
            oldMesh.material,
            newSize
        );

        newMesh.castShadow = oldMesh.castShadow;
        newMesh.receiveShadow = oldMesh.receiveShadow;
        newMesh.frustumCulled = oldMesh.frustumCulled;

        const dummy = new Object3D();

        for (let i = 0; i < oldMesh.count; i++) {
            oldMesh.getMatrixAt(i, dummy.matrix);
            newMesh.setMatrixAt(i, dummy.matrix);
        }

        newMesh.instanceMatrix.needsUpdate = true;

        return newMesh;
    }

    private shrinkBucket(meshId: string, bucket: InstancedBucket) {
        const shrinkThreshold = bucket.capacity / 4;

        console.log("used: ", bucket.used, " capacity: ", bucket.capacity, " ratio: ", bucket.used / bucket.capacity);

        if (bucket.used > shrinkThreshold || bucket.capacity <= 8) return;

        const newCapacity = bucket.capacity / 2;

        // 1. Trim the high-water mark
        // Check if the highest allocated indices are currently sitting in the free list.
        let currentMax = this.usedCounters.get(meshId)!;
        const freeList = this.freeIndices.get(meshId) || [];
        const freeSet = new Set(freeList);

        // While the top-most slot is empty, lower the high-water mark
        while (currentMax > 0 && freeSet.has(currentMax - 1)) {
            currentMax--;
            freeSet.delete(currentMax); // Remove from free pool, it no longer exists
        }

        // Update the manager's counters with the newly trimmed values
        this.usedCounters.set(meshId, currentMax);
        this.freeIndices.set(meshId, Array.from(freeSet));

        // 2. Now check if we can safely shrink
        if (currentMax <= newCapacity) {
            console.log("Capacity shrink: ", bucket.capacity, "->", newCapacity);

            const entry = this.instancedMeshes.get(meshId)!;
            const newMesh = this.growInstancedMesh(entry.mesh, newCapacity);

            this.swapModel(meshId, newMesh);
            bucket.capacity = newCapacity;

            // Extra safety: clear any free indices that might somehow be out of bounds
            const updatedFreeList = this.freeIndices.get(meshId) || [];
            const filteredFreeList = updatedFreeList.filter(index => index < newCapacity);
            this.freeIndices.set(meshId, filteredFreeList);
        } else {
            console.log("Cannot shrink yet. Active models exist in the upper half. True max index:", currentMax);
        }
    }

    private swapModel(modelId: string, newMesh: InstancedMesh) {
        const bucket = this.instancedMeshes.get(modelId);
        if (!bucket) throw new Error("Model not found");

        const oldMesh = bucket.mesh;

        oldMesh.parent?.remove(oldMesh);

        bucket.mesh = newMesh; // single source of truth

        ClientEventBus.invokeEvent(EventType.CLIENT_ADD_TO_SCENE, {
            object: newMesh
        });
    }

    private growBucket(meshId: string, bucket: InstancedBucket) {
        const entry = this.instancedMeshes.get(meshId);
        if (!entry) return;

        if (bucket.used < bucket.capacity) return;
        console.log("Capacity grow: ", bucket.capacity, bucket.capacity * 2);

        const newCapacity = bucket.capacity * 2;

        const newMesh = this.growInstancedMesh(entry.mesh, newCapacity);

        this.swapModel(meshId, newMesh);

        // IMPORTANT: keep bucket in sync AFTER swap
        bucket.capacity = newCapacity;
    }

    createModel(model: string, mesh: InstancedMesh, baseMatrix: Matrix4) {
        this.instancedMeshes.set(model, new InstancedBucket(mesh, 8));
        this.freeIndices.set(model, []);
        this.usedCounters.set(model, 0);
        this.baseMatrices.set(model, baseMatrix);
    }

    _composeMatrix(position: Vector3, rotation: Vector3, scale: Vector3) {
        const matrix = new Matrix4().compose(
            position.toThreeVec3(), new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, 'XYZ')),
            scale.toThreeVec3()
        );

        return matrix;
    }

    addModel(model: string, position: Vector3, rotation: Vector3, scale: Vector3): number {

        if (!this.instancedMeshes.get(model)) return -1;

        this.instancedMeshes.get(model)!.used += 1;

        this.growBucket(model, this.instancedMeshes.get(model)!);

        const matrix = this._composeMatrix(position, rotation, scale);
        const freeListMap = this.freeIndices.get(model)!;

        let index = -1;
        if (freeListMap.length > 0) {
            index = freeListMap.pop()!;
        } else {
            const usedCountCurrent = this.usedCounters.get(model)!;
            index = usedCountCurrent;
            this.usedCounters.set(model, usedCountCurrent + 1);
        }

        this.updateModelPosWithMatrix(model, index, matrix);

        return index;

    }

    updateModelPosWithMatrix(model: string, index: number, matrix: Matrix4) {
        const mesh = this.instancedMeshes.get(model)!;
        const base = this.baseMatrices.get(model)!;

        this.tempMatrix.copy(matrix).multiply(base); // propMatrix * localMeshOffset

        mesh.mesh.setMatrixAt(index, this.tempMatrix);
        mesh.mesh.instanceMatrix.needsUpdate = true;
    }

    updateModel(model: string, index: number, position: Vector3, rotation: Vector3, scale: Vector3) {
        const matrix = this._composeMatrix(position, rotation, scale);
        this.updateModelPosWithMatrix(model, index, matrix);
    }

    deleteModel(model: string, index: number) {
        const matrix = new Matrix4().makeScale(0, 0, 0);
        const mesh = this.instancedMeshes.get(model)!;

        mesh.mesh.setMatrixAt(index, matrix);
        mesh.mesh.instanceMatrix.needsUpdate = true;

        this.freeIndices.get(model)!.push(index);

        this.instancedMeshes.get(model)!.used -= 1;

        this.shrinkBucket(model, mesh);
    }


}