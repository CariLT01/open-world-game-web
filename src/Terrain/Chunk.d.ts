import { Vector3, type Vec3Fast } from "../Core/Vector3";
import { ChunkData, type BlockData } from "./ChunkData";
export declare const CHUNK_SIZE = 32;
export declare class Chunk {
    chunkData: ChunkData;
    constructor();
    private generateVoidData;
    calculateIndexAt(p: Vector3): number;
    calculateIndexAtFast(p: Vec3Fast): number;
    getDensityAt(p: Vector3): number;
    getMaterialAt(p: Vector3): number;
    setDensityAndMaterialAt(p: Vector3, density: number, material: BlockData): void;
    getDensityAtFast(p: Vec3Fast): number;
    getMaterialAtFast(p: Vec3Fast): number;
}
//# sourceMappingURL=Chunk.d.ts.map