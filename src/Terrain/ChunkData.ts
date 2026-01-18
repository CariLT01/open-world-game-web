
import { CHUNK_SIZE } from "../Config";
import type { Vector3 } from "../Core/Vector3";
import { debugGlobal } from "../DebugGlobal";
import { FrozenChunkData } from "./FrozenChunkData";

export type MaterialIndex = number & { readonly __brand: "MaterialIndex" };
export type PaletteIndex = number & { readonly __brand: "PaletteIndex" };

export type BlockData = {
    material: MaterialIndex;
    properties: Map<String, any>;
    hash: number;
}

const CHUNK_VOLUME = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE;

let nChunksFrozen = 0;
let nActiveChunks = 0;
let memoryUsageFrozen = 0;
let memoryUsageActive = 0;

const SPACE_TAKEN_PER_CHUNK = CHUNK_VOLUME * 4 + CHUNK_VOLUME;



export class ChunkData {

    private densitiesBuffer: ArrayBuffer = new ArrayBuffer(CHUNK_VOLUME * 4, { maxByteLength: CHUNK_VOLUME * 4});
    private materialsBuffer: ArrayBuffer = new ArrayBuffer(CHUNK_VOLUME, { maxByteLength: CHUNK_VOLUME});


    private densities: Float32Array = new Float32Array(this.densitiesBuffer);
    private materials: Uint8Array = new Uint8Array(this.materialsBuffer);

    private queuedMaterials: BlockData[] = [];
    private queuedMaterialsHashes: number[] = [];
    private queuedMaterialsSet: Set<number> = new Set();
    private palette: Map<PaletteIndex, BlockData> = new Map();
    private paletteReverseMap: Map<number, PaletteIndex> = new Map();

    private frozenDensities: FrozenChunkData<Float32Array> = new FrozenChunkData(4, Float32Array);
    private frozenMaterials: FrozenChunkData<Uint8Array> = new FrozenChunkData(1, Uint8Array);

    private isFrozen: boolean = false;



    constructor() {
        nActiveChunks++;
    }

    private _getIndexFromBlockPosition(position: Vector3) {
        return position.x * CHUNK_SIZE * CHUNK_SIZE + position.y * CHUNK_SIZE + position.z;
    }

    densityAtIndex(i: number) {
        return this.densities[i];
    }

    freeze() {

        this.checkFrozen();

        this.frozenDensities.freeze(this.densities);
        this.frozenMaterials.freeze(this.materials);

        (this.densitiesBuffer).resize(0);
        (this.materialsBuffer).resize(0);

        this.isFrozen = true;

        console.log("Frozen");

        nChunksFrozen++;
        nActiveChunks--;

        memoryUsageFrozen += this.frozenMaterials.getSpaceTaken(); 
        memoryUsageFrozen += this.frozenDensities.getSpaceTaken();

        debugGlobal.updateKey("frozenChunksCount", `${nChunksFrozen}/${nActiveChunks} (${Math.round((nChunksFrozen / nActiveChunks) * 100)}%)`);
        debugGlobal.updateKey("frozenChunksCompressionRatio", `(${Math.round((memoryUsageFrozen / (SPACE_TAKEN_PER_CHUNK * nChunksFrozen)) * 100)}%)`);

    }

    unfreeze() {

        if (!this.isFrozen) {
            throw new Error("Cannot unfreeze while not frozen");
        }

        console.log("Unfreeze");

        // (this.densities.buffer as ArrayBuffer).resize(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE * 4);
        // (this.materials.buffer as ArrayBuffer).resize(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE * 1);

        memoryUsageFrozen -= this.frozenMaterials.getSpaceTaken(); 
        memoryUsageFrozen -= this.frozenDensities.getSpaceTaken();

        this.densitiesBuffer.resize(CHUNK_VOLUME * 4);
        this.materialsBuffer.resize(CHUNK_VOLUME * 1);

        this.frozenDensities.unfreeze(this.densities);
        this.frozenMaterials.unfreeze(this.materials);

        this.isFrozen = false;

        nChunksFrozen--;
        nActiveChunks++;

        debugGlobal.updateKey("frozenChunksCount", `${nChunksFrozen}/${nActiveChunks} (${Math.round((nChunksFrozen / nActiveChunks) * 100)}%)`);
        debugGlobal.updateKey("frozenChunksCompressionRatio", `(${Math.round((memoryUsageFrozen / (SPACE_TAKEN_PER_CHUNK * nChunksFrozen)) * 100)}%)`);
    }

    isEmpty() {
        if (this.palette.size > 1) return false;
        if (this.palette.size == 0) return true;
        if ((this.palette.get(0 as PaletteIndex)!).material == 0) return true;
        return false;
    }

    isFilled() {
        if (this.isEmpty()) return false;
        const isFilled = this.densities.every(v => v === 1.0)

        return isFilled;
    }

    getIsFrozen() {
        return this.isFrozen;
    }

    private checkFrozen() {
        if (this.isFrozen) throw new Error("Operation invalid in frozen state, call .unfreeze() and try again");
    }

    flushPaletteChanges() {

        this.checkFrozen();

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

        this.checkFrozen();

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

        this.checkFrozen();

        const index = this._getIndexFromBlockPosition(position);
        if (index >= this.materials.length) throw new Error(`Index out of bounds: ${position.x}, ${position.y}, ${position.z}`)

        return this.materials[index] as PaletteIndex;
    }

    getMaterialWithPaletteIndex(i: PaletteIndex): BlockData | undefined {
        return this.palette.get(i);
    }

    getDensityAt(position: Vector3) {

        this.checkFrozen();

        const index = this._getIndexFromBlockPosition(position);
        if (index >= this.densities.length) throw new Error(`Index out of bounds: ${position.x}, ${position.y}, ${position.z}`)

        return this.densities[index] as number;
    }
}