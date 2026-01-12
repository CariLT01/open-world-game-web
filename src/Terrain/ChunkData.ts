
import type { Vector3 } from "../Core/Vector3";
import { CHUNK_SIZE } from "./Chunk";

export type MaterialIndex = number & { readonly __brand: "MaterialIndex" };
export type PaletteIndex = number & { readonly __brand: "PaletteIndex" };

export type BlockData = {
    material: MaterialIndex;
    properties: Map<String, any>;
    hash: number;
}

export class ChunkData {
    private densities: Float32Array;
    private materials: Uint8Array;

    private queuedMaterials: BlockData[] = [];
    private queuedMaterialsHashes: number[] = [];
    private queuedMaterialsSet: Set<number> = new Set();
    private palette: Map<PaletteIndex, BlockData> = new Map();
    private paletteReverseMap: Map<number, PaletteIndex> = new Map();



    constructor() {
        this.densities = new Float32Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
        this.materials = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
    }

    private _getIndexFromBlockPosition(position: Vector3) {
        return position.x * CHUNK_SIZE * CHUNK_SIZE + position.y * CHUNK_SIZE + position.z;
    }

    flushPaletteChanges() {
        const oldPaletteSize = this.palette.size;

        // 1. Assign permanent indices to queued materials in the current palette
        for (const material of this.queuedMaterials) {
            const nextIdx = this.palette.size as PaletteIndex;
            this.palette.set(nextIdx, material);
            this.paletteReverseMap.set(material.hash, nextIdx);
        }

        // 2. Identify which indices are actually used in the voxel buffer
        const usedIndicesInVoxelBuffer = new Set<number>();
        for (let i = 0; i < this.materials.length; i++) {
            usedIndicesInVoxelBuffer.add(this.materials[i]!);
        }

        // 3. Create a NEW palette and an Index Map
        const newPalette: Map<PaletteIndex, BlockData> = new Map();
        const newPaletteReverseMap: Map<number, PaletteIndex> = new Map();
        const indexMapping: Map<number, number> = new Map();

        let nextAvailableIndex = 0;

        // We only migrate materials that are actually present in the chunk
        this.palette.forEach((blockData, oldIdx) => {
            if (usedIndicesInVoxelBuffer.has(oldIdx)) {
                const newIdx = nextAvailableIndex as PaletteIndex;
                newPalette.set(newIdx, blockData);
                newPaletteReverseMap.set(blockData.hash, newIdx);
                indexMapping.set(oldIdx, nextAvailableIndex);
                nextAvailableIndex++;
            }
        });

        // 4. Update the voxel buffer ONLY ONCE
        for (let i = 0; i < this.materials.length; i++) {
            const currentIdx = this.materials[i];
            // If for some reason it's not in the map, fallback to 0 (Air/Default)
            this.materials[i] = indexMapping.has(currentIdx!) ? indexMapping.get(currentIdx!)! : 0;
        }

        // 5. Replace the old maps with the cleaned ones
        this.palette = newPalette;
        this.paletteReverseMap = newPaletteReverseMap;

        this.queuedMaterials = [];
        this.queuedMaterialsSet.clear();
        this.queuedMaterialsHashes = [];
    }

    setBlockAt(position: Vector3, density: number, material: BlockData, flushChanges: boolean) {

        let toWriteIndex = -1;

        if (!this.paletteReverseMap.has(material.hash)) {
            if (!this.queuedMaterialsSet.has(material.hash)) {
                this.queuedMaterialsSet.add(material.hash);
                this.queuedMaterials.push(material);
                this.queuedMaterialsHashes.push(material.hash);

                toWriteIndex = this.palette.size + (this.queuedMaterials.length - 1);
            } else {
                const index = this.queuedMaterialsHashes.indexOf(material.hash);
                toWriteIndex = this.palette.size + index;
            }

        } else {
            toWriteIndex = this.paletteReverseMap.get(material.hash)!;
        }

        const writeIndexPositoin = this._getIndexFromBlockPosition(position);

        this.densities[writeIndexPositoin] = density;
        this.materials[writeIndexPositoin] = toWriteIndex;

        if (flushChanges) {
            this.flushPaletteChanges();
        }
    }

    getBlockAt(position: Vector3): PaletteIndex {
        const index = this._getIndexFromBlockPosition(position);
        if (index >= this.materials.length) throw new Error(`Index out of bounds: ${position.x}, ${position.y}, ${position.z}`)

        return this.materials[index] as PaletteIndex;
    }

    getMaterialWithPaletteIndex(i: PaletteIndex): BlockData | undefined {
        return this.palette.get(i);
    }

    getDensityAt(position: Vector3) {
        const index = this._getIndexFromBlockPosition(position);
        if (index >= this.densities.length) throw new Error(`Index out of bounds: ${position.x}, ${position.y}, ${position.z}`)

        return this.densities[index] as number;
    }
}