import { Face } from "../Config";
import { Vector3, type Vec3Fast } from "../Core/Vector3";
import { ChunkData, type BlockData, type PaletteIndex } from "./ChunkData";
export declare const CHUNK_SIZE = 32;
type VisibilityMask = Map<Face, Set<Face>>;
export declare class Chunk {
    chunkData: ChunkData;
    visibility: VisibilityMask;
    private visited;
    private queue;
    constructor();
    private generateVoidData;
    calculateIndexAt(p: Vector3): number;
    calculateIndexAtFast(p: Vec3Fast): number;
    getDensityAt(p: Vector3): number;
    getMaterialAt(p: Vector3): PaletteIndex;
    setDensityAndMaterialAt(p: Vector3, density: number, material: BlockData): void;
    getDensityAtFast(p: Vec3Fast): number;
    getMaterialAtFast(p: Vec3Fast): PaletteIndex;
    getMaterialWithPaletteIndex(i: PaletteIndex): BlockData | undefined;
    computeVisibilityMask(): void;
    getVisibilityMap(): VisibilityMask;
    flushChanges(): void;
}
export {};
//# sourceMappingURL=Chunk.d.ts.map