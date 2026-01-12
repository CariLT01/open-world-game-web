import { Vector3, type Vec3Fast } from "../Core/Vector3";
import { ChunkData, type BlockData } from "./ChunkData";

export const CHUNK_SIZE = 32;

export class Chunk {
    public chunkData: ChunkData;

    constructor() {

        this.chunkData = new ChunkData();

        this.generateVoidData();
    }

    private generateVoidData() {
        console.log("-- Gen void data");

        console.log("Void data gen complete");
    }

    calculateIndexAt(p:Vector3) {
        return p.x * CHUNK_SIZE * CHUNK_SIZE + p.y * CHUNK_SIZE + p.z;
    }
    calculateIndexAtFast(p: Vec3Fast) {
        return p[0] * CHUNK_SIZE * CHUNK_SIZE + p[1] * CHUNK_SIZE + p[2];
    }

    getDensityAt(p: Vector3) {
        return this.chunkData.getDensityAt(p);
    }
    getMaterialAt(p:Vector3) {
        return this.chunkData.getBlockAt(p);
    }
    setDensityAndMaterialAt(p: Vector3, density: number, material: BlockData) {
        return this.chunkData.setBlockAt(p, density, material, false);
    }
    getDensityAtFast(p: Vec3Fast) {
        return this.chunkData.getDensityAt(new Vector3(p[0], p[1], p[2]));
    }
    getMaterialAtFast(p: Vec3Fast) {
        return this.chunkData.getBlockAt(new Vector3(p[0], p[1], p[2]))
    }
}