import { type Vec3Fast } from "../Core/Vector3";
import { type Chunk } from "./Chunk";
export type Triangle = {
    a: Vec3Fast;
    b: Vec3Fast;
    c: Vec3Fast;
    color: Vec3Fast;
};
export declare class TerrainBuilder {
    constructor();
    private addVec3Fast;
    private VertexInterp;
    private generateCell;
    private _getDensityWith;
    private _getBlockWith;
    generateTerrainChunk(currentChunk: Chunk, neighborPosX: Chunk, neighborPosZ: Chunk, neighborPosY: Chunk, neighborCornerXZ: Chunk, neighborCornerXY: Chunk, neighborCornerZY: Chunk, neighborCornerXYZ: Chunk): Triangle[];
}
//# sourceMappingURL=TerrainBuilder.d.ts.map