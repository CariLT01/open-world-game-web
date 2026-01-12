import { Mesh } from "three";
import { type Chunk } from "./Chunk";
import type { TerrainBuilder } from "./TerrainBuilder";
import type { Vector3 } from "../Core/Vector3";
import type { ColliderDesc } from "@dimforge/rapier3d-compat";
type ChunkMeshBuilderReturnType = {
    mesh?: Mesh;
    colliderDesc?: ColliderDesc;
};
export declare class ChunkMeshBuilder {
    private terrainBuilder;
    constructor(terrainMeshBuilder: TerrainBuilder);
    buildChunkMesh(chunk: Chunk, position: Vector3, neighborPosX: Chunk, neighborPosZ: Chunk, neighborPosY: Chunk, neighborCornerXZ: Chunk, neighborCornerXY: Chunk, neighborCornerZY: Chunk, neighborCornerXYZ: Chunk): ChunkMeshBuilderReturnType;
}
export {};
//# sourceMappingURL=ChunkMeshBuilder.d.ts.map