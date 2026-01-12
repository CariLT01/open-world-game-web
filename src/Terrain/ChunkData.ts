
import type { Vector3 } from "../Core/Vector3";
import { CHUNK_SIZE } from "./Chunk";

export type MaterialIndex = number & {readonly __brand: "MaterialIndex"};
type PaletteIndex = number & {readonly __brand: "PaletteIndex"};

export type BlockData = {
    material: MaterialIndex;
    properties: Map<String, any>;
    hash: number;
}

export class ChunkData {
    private densities: Float32Array;
    private materials: Uint8Array;

    private queuedMaterials: BlockData[] = [];
    private queuedMaterialsSet: Set<number> = new Set();
    private palette: Map<PaletteIndex, BlockData> = new Map();
    private paletteReverseMap: Map<BlockData, PaletteIndex> = new Map();
    


    constructor() {
        this.densities = new Float32Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
        this.materials = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
    }

    private _getIndexFromBlockPosition(position: Vector3) {
        return position.x * CHUNK_SIZE * CHUNK_SIZE + position.y * CHUNK_SIZE + position.z;
    }

    flushPaletteChanges() {

        // Add queued materials

        for (const material of this.queuedMaterials) {
            this.palette.set(this.palette.size as PaletteIndex, material);
        }
        this.queuedMaterials = [];
        this.queuedMaterialsSet.clear();

        const oldPaletteIndices: number[] = [];
        for (let i = 0; i < this.palette.size; i++) oldPaletteIndices.push(i);
        

        // Gather all used materials

        const usedPaletteIndices: Set<PaletteIndex> = new Set();

        for (let i = 0; i < CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE; i++) {
            const localMaterial = this.materials[i] as PaletteIndex;
            
            usedPaletteIndices.add(localMaterial);
            
        }

        // Gather all unused materials
        
        const unusedPaletteIndices: Set<PaletteIndex> = new Set();

        for (let i = 0; i < this.palette.size; i++) {
            if (!usedPaletteIndices.has(i as PaletteIndex)) {
                unusedPaletteIndices.add(i as PaletteIndex);
            }
        }

        const newPaletteIndices = [...oldPaletteIndices];

        // Purge from new palette indices

        for (const unusedIndex of unusedPaletteIndices) {
            newPaletteIndices.splice(unusedIndex, 1);
        }

        // Diff to know how to shift each deleted palette index
        
        const indexMap: Map<PaletteIndex, PaletteIndex> = new Map();

        let newIndex = 0;
        for (let oldIndex = 0; oldIndex < this.palette.size; oldIndex++) {
            if (!unusedPaletteIndices.has(oldIndex as PaletteIndex)) {
                // oldIndex survives, assign it a new index
                indexMap.set(oldIndex as PaletteIndex, newIndex as PaletteIndex);
                newIndex++;
            }
        }

        // Map old indices to new indices in the palette

        for (let i = 0; i < CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE; i++) {
            const localMaterial = this.materials[i] as PaletteIndex;
            this.materials[i] = indexMap.get(localMaterial) as PaletteIndex;
        }
    }

    setBlockAt(position: Vector3, density: number, material: BlockData, flushChanges: boolean) {

        let toWriteIndex = -1;

        if (!this.paletteReverseMap.has(material)) {
            if (!this.queuedMaterialsSet.has(material.hash)) {
                this.queuedMaterialsSet.add(material.hash);
                this.queuedMaterials.push(material);

                toWriteIndex = this.palette.size + (this.queuedMaterials.length - 1);
            } else {
                const index = this.queuedMaterials.indexOf(material);
                toWriteIndex = this.palette.size + index;
            }

        } else {
            toWriteIndex = this.paletteReverseMap.get(material)!;
        }

        const writeIndexPositoin = this._getIndexFromBlockPosition(position);

        this.densities[writeIndexPositoin] = density;
        this.materials[writeIndexPositoin] = toWriteIndex;
        
        if (flushChanges) {
            this.flushPaletteChanges();
        }
    }

    getBlockAt(position: Vector3) {
        const index = this._getIndexFromBlockPosition(position);
        if (index >= this.materials.length) throw new Error(`Index out of bounds: ${position.x}, ${position.y}, ${position.z}`)

        return this.materials[index] as number;
    }

    getDensityAt(position: Vector3) {
        const index = this._getIndexFromBlockPosition(position);
        if (index >= this.densities.length) throw new Error(`Index out of bounds: ${position.x}, ${position.y}, ${position.z}`)

        return this.densities[index] as number;
    }
}