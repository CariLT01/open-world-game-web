import { Camera, type Scene } from "three";
import { Vector3 } from "./Core/Vector3";
import { Chunk } from "./Terrain/Chunk";
import type { World } from "@dimforge/rapier3d-compat";
import type { Player } from "./Player";
export declare const RENDER_DISTANCE = 5;
export declare class WorldChunks {
    private chunkMeshBuilder;
    private terrainBuilder;
    private terrainGenerator;
    private chunks;
    private chunksMeshes;
    private chunksColliders;
    private cachedClosestChunks;
    private pendingChunks;
    private loadedChunks;
    private scene;
    private physicsWorld;
    private isFirstChunk;
    private visibleChunks;
    constructor(scene: Scene, phyicsWorld: World);
    private _computeVisibility;
    private _bakeClosestChunks;
    getChunkToGenerate(currentPosition: Vector3): Vector3 | null;
    isReadyToGenerate(chunkPosition: Vector3): boolean;
    getNeighbors(chunkPosition: Vector3): Chunk[];
    private _handleUnload;
    private _unfreezeList;
    computeOcclusion(playerPosition: Vector3, camera: Camera): void;
    tick(playerPosition: Vector3, player: Player, camera: Camera): void;
}
//# sourceMappingURL=WorldChunks.d.ts.map