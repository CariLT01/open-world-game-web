import type { Mesh, Scene } from "three";
import { Vector3 } from "./Core/Vector3";
import { Chunk, CHUNK_SIZE } from "./Terrain/Chunk";
import { ChunkMeshBuilder } from "./Terrain/ChunkMeshBuilder";
import { TerrainBuilder } from "./Terrain/TerrainBuilder";
import { TerrainGenerator } from "./Terrain/TerrainGenerator";
import { RAPIER } from "./RapierInstance";
import type { Collider, World } from "@dimforge/rapier3d-compat";
import { checkType } from "./TypeCheck";
import type { Player } from "./Player";

export const RENDER_DISTANCE = 5;

export class WorldChunks {
    private chunkMeshBuilder: ChunkMeshBuilder;
    private terrainBuilder: TerrainBuilder;
    private terrainGenerator: TerrainGenerator;

    private chunks: Map<string, Chunk> = new Map();
    private chunksMeshes: Map<string, Mesh> = new Map();
    private chunksColliders: Map<string, Collider> = new Map();

    private cachedClosestChunks: Vector3[] = [];
    private pendingChunks: Set<string> = new Set();
    private loadedChunks: Set<string> = new Set();

    private scene: Scene;
    private physicsWorld: World;

    private isFirstChunk: boolean = true;

    constructor(scene: Scene, phyicsWorld: World) {
        this.terrainBuilder = new TerrainBuilder();
        this.chunkMeshBuilder = new ChunkMeshBuilder(this.terrainBuilder);
        this.terrainGenerator = new TerrainGenerator();
        this.scene = scene;
        this.physicsWorld = phyicsWorld;

        this._bakeClosestChunks();
    }

    private _bakeClosestChunks() {
        const chunks: Vector3[] = [];

        for (let x = -RENDER_DISTANCE; x <= RENDER_DISTANCE; x++) {
            for (let y = -RENDER_DISTANCE; y <= RENDER_DISTANCE; y++) {
                for (let z = -RENDER_DISTANCE; z <= RENDER_DISTANCE; z++) {
                    chunks.push(new Vector3(x, y, z));
                }
            }
        }

        // sort by distance from origin (0,0,0) or player position
        chunks.sort((a, b) => {
            const distA = a.x * a.x + a.y * a.y + a.z * a.z; // squared distance
            const distB = b.x * b.x + b.y * b.y + b.z * b.z;
            return distA - distB;
        });

        this.cachedClosestChunks = chunks;
    }

    getChunkToGenerate(currentPosition: Vector3) {
        for (const chunkPos of this.cachedClosestChunks) {


            const realPos = chunkPos.add(currentPosition);

            if (
                !this.loadedChunks.has(realPos.toKey()) &&
                !this.pendingChunks.has(realPos.toKey())
            ) {
                return realPos;
            }
        }

        return null;
    }

    isReadyToGenerate(chunkPosition: Vector3) {
        if (
            this.chunks.has(chunkPosition.add(new Vector3(1, 0, 0)).toKey()) &&
            this.chunks.has(chunkPosition.add(new Vector3(0, 1, 0)).toKey()) &&
            this.chunks.has(chunkPosition.add(new Vector3(0, 0, 1)).toKey()) &&
            this.chunks.has(chunkPosition.add(new Vector3(1, 0, 1)).toKey()) &&
            this.chunks.has(chunkPosition.add(new Vector3(1, 1, 0)).toKey()) &&
            this.chunks.has(chunkPosition.add(new Vector3(0, 1, 1)).toKey()) &&
            this.chunks.has(chunkPosition.add(new Vector3(1, 1, 1)).toKey())
        ) {
            return true;
        }
        return false;
    }

    getNeighbors(chunkPosition: Vector3) {
        return [
            this.chunks.get(chunkPosition.add(new Vector3(1, 0, 0)).toKey()),
            this.chunks.get(chunkPosition.add(new Vector3(0, 1, 0)).toKey()),
            this.chunks.get(chunkPosition.add(new Vector3(0, 0, 1)).toKey()),
            this.chunks.get(chunkPosition.add(new Vector3(1, 0, 1)).toKey()),
            this.chunks.get(chunkPosition.add(new Vector3(1, 1, 0)).toKey()),
            this.chunks.get(chunkPosition.add(new Vector3(0, 1, 1)).toKey()),
            this.chunks.get(chunkPosition.add(new Vector3(1, 1, 1)).toKey()),
        ] as Chunk[];
    }

    private _handleUnload(currentPos: Vector3) {
        const shouldBeLoaded: Set<string> = new Set();
        for (const cached of this.cachedClosestChunks) {
            shouldBeLoaded.add(cached.add(currentPos).toKey());
        }

        const toRemove: Set<string> = new Set();

        for (const [c, mesh] of this.chunksMeshes) {
            if (!shouldBeLoaded.has(c)) {
                // Unload

                toRemove.add(c);
                this.scene.remove(this.chunksMeshes.get(c)!);

                const rigidBody = this.chunksColliders.get(c)!;
                this.physicsWorld.removeCollider(rigidBody, true);
                this.loadedChunks.delete(c);
            }
        }

        for (const c of toRemove) {
            this.chunksMeshes.delete(c);
        }
    }

    tick(playerPosition: Vector3, player: Player) {

        this._handleUnload(playerPosition);

        if (this.isFirstChunk) {
            player.setPosition(0, 50, 0);
        }

        const toGenerate = this.getChunkToGenerate(playerPosition);

        if (!toGenerate) return;

        console.log("Generate: ", toGenerate.x, toGenerate.y, toGenerate.z);

        const chunk = new Chunk();

        this.chunks.set(toGenerate.toKey(), chunk);

        this.terrainGenerator.generateTerrainOf(chunk, toGenerate);

        if (!this.isReadyToGenerate(toGenerate)) {
            this.pendingChunks.add(toGenerate.toKey());
            console.log("Added to pending chunks ", this.pendingChunks.size);
        } else {

            const neighbors = this.getNeighbors(toGenerate)

            const mesh = this.chunkMeshBuilder.buildChunkMesh(
                chunk,
                toGenerate,
                (neighbors[0] as Chunk),
                (neighbors[2] as Chunk),
                (neighbors[1] as Chunk),
                (neighbors[3] as Chunk),
                (neighbors[4] as Chunk),
                (neighbors[5] as Chunk),
                (neighbors[6] as Chunk)
            );

            this.loadedChunks.add(toGenerate.toKey());
            if (mesh.mesh && mesh.colliderDesc) {
                this.chunksMeshes.set(toGenerate.toKey(), mesh.mesh);

                this.scene.add(mesh.mesh);


                const bodyDesc = RAPIER.RigidBodyDesc.fixed();
                bodyDesc.setTranslation(
                    toGenerate.x * CHUNK_SIZE,
                    toGenerate.y * CHUNK_SIZE,
                    toGenerate.z * CHUNK_SIZE
                );
                const rigidBody = this.physicsWorld.createRigidBody(bodyDesc);

                checkType(rigidBody, RAPIER.RigidBody);
                checkType(mesh.colliderDesc, RAPIER.ColliderDesc);

                if (Object.getPrototypeOf(mesh.colliderDesc) != RAPIER.ColliderDesc.prototype) {
                    throw new Error("runtime type mistmatch");
                }

                if (Object.getPrototypeOf(rigidBody) != RAPIER.RigidBody.prototype) {
                    throw new Error("runtime type mistmatch");
                }

                this.chunksColliders.set(toGenerate.toKey(), this.physicsWorld.createCollider(mesh.colliderDesc, rigidBody));
                
            }



        }

        const toRemoveFromPending: Set<Vector3> = new Set();

        for (const chunkPosI of this.pendingChunks) {

            const chunkPos = new Vector3(0, 0, 0)
            chunkPos.fromKey(chunkPosI);

            const chunk = this.chunks.get(chunkPos.toKey());

            if (!chunk) continue;

            if (!this.isReadyToGenerate(chunkPos)) continue;
            console.log("Rendering chunk");

            const mesh = this.chunkMeshBuilder.buildChunkMesh(
                chunk,
                chunkPos,
                (this.getNeighbors(chunkPos)[0] as Chunk),
                (this.getNeighbors(chunkPos)[2] as Chunk),
                (this.getNeighbors(chunkPos)[1] as Chunk),
                (this.getNeighbors(chunkPos)[3] as Chunk),
                (this.getNeighbors(chunkPos)[4] as Chunk),
                (this.getNeighbors(chunkPos)[5] as Chunk),
                (this.getNeighbors(chunkPos)[6] as Chunk)
            );

            toRemoveFromPending.add(chunkPos);
            this.loadedChunks.add(toGenerate.toKey());
            if (mesh.mesh && mesh.colliderDesc) {
                this.chunksMeshes.set(chunkPos.toKey(), mesh.mesh);

                this.scene.add(mesh.mesh);

                const bodyDesc = RAPIER.RigidBodyDesc.fixed();
                bodyDesc.setTranslation(
                    chunkPos.x * CHUNK_SIZE,
                    chunkPos.y * CHUNK_SIZE,
                    chunkPos.z * CHUNK_SIZE
                );
                const rigidBody = this.physicsWorld.createRigidBody(bodyDesc);

                checkType(rigidBody, RAPIER.RigidBody);
                checkType(mesh.colliderDesc, RAPIER.ColliderDesc);

                if (Object.getPrototypeOf(mesh.colliderDesc) != RAPIER.ColliderDesc.prototype) {
                    throw new Error("runtime type mistmatch");
                }

                if (Object.getPrototypeOf(rigidBody) != RAPIER.RigidBody.prototype) {
                    throw new Error("runtime type mistmatch");
                }

                this.chunksColliders.set(chunkPos.toKey(), this.physicsWorld.createCollider(mesh.colliderDesc, rigidBody));
                

                if (this.isFirstChunk) {

                    const v = chunkPos.mulScalar(CHUNK_SIZE).add(new Vector3(CHUNK_SIZE / 2, CHUNK_SIZE, CHUNK_SIZE / 2));

                    player.setPosition(v.x, v.y, v.z);
                    this.isFirstChunk = false;
                }
            };


        }

        for (const toRemove of toRemoveFromPending) {
            this.pendingChunks.delete(toRemove.toKey());
        }
    }
}
