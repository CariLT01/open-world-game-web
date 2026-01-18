import { Box3, Camera, Frustum, Matrix4, type Mesh, type Scene } from "three";
import { Vector3 } from "./Core/Vector3";
import { Chunk, CHUNK_SIZE } from "./Terrain/Chunk";
import { ChunkMeshBuilder } from "./Terrain/ChunkMeshBuilder";
import { TerrainBuilder } from "./Terrain/TerrainBuilder";
import { TerrainGenerator } from "./Terrain/TerrainGenerator";
import { RAPIER } from "./RapierInstance";
import type { Collider, World } from "@dimforge/rapier3d-compat";
import { checkType } from "./TypeCheck";
import type { Player } from "./Player";
import { debugGlobal } from "./DebugGlobal";
import { Face } from "./Config";

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

    private visibleChunks: Set<string> = new Set();

    constructor(scene: Scene, phyicsWorld: World) {
        this.terrainBuilder = new TerrainBuilder();
        this.chunkMeshBuilder = new ChunkMeshBuilder(this.terrainBuilder);
        this.terrainGenerator = new TerrainGenerator();
        this.scene = scene;
        this.physicsWorld = phyicsWorld;

        this._bakeClosestChunks();
    }

    private _computeVisibility(chunkPosition: Vector3, camera: Camera) {

        const shouldBeLoaded: Set<string> = new Set();
        for (const cached of this.cachedClosestChunks) {
            shouldBeLoaded.add(cached.add(chunkPosition).toKey());
        }

        const frustum = new Frustum();
        const projScreenMatrix = new Matrix4();

        // Combine Projection and View matrices
        projScreenMatrix.multiplyMatrices(
            camera.projectionMatrix,
            camera.matrixWorldInverse
        );
        frustum.setFromProjectionMatrix(projScreenMatrix);

        const tempBox = new Box3(); // Re-use this for performance

        const FACES = [Face.FRONT, Face.BACK, Face.LEFT, Face.RIGHT, Face.TOP, Face.BOTTOM];
        const FACE_DIRECTIONS = {
            [Face.FRONT]: new Vector3(0, 0, 1),
            [Face.BACK]: new Vector3(0, 0, -1),
            [Face.LEFT]: new Vector3(-1, 0, 0),
            [Face.RIGHT]: new Vector3(1, 0, 0),
            [Face.TOP]: new Vector3(0, 1, 0),
            [Face.BOTTOM]: new Vector3(0, -1, 0)
        };
        const OPPOSITE_FACE = {
            [Face.FRONT]: Face.BACK,
            [Face.BACK]: Face.FRONT,
            [Face.LEFT]: Face.RIGHT,
            [Face.RIGHT]: Face.LEFT,
            [Face.TOP]: Face.BOTTOM,
            [Face.BOTTOM]: Face.TOP
        };
        const visibleChunks: Set<string> = new Set();
        const queue: { pos: Vector3, entryFace?: Face }[] = [];

        queue.push({ pos: chunkPosition });

        while (queue.length > 0) {
            const item = queue.shift()!;
            const key = item.pos.toKey()!;

            if (visibleChunks.has(key)) continue;
            visibleChunks.add(key);

            if (!shouldBeLoaded.has(key)) {
                // Outside of render distance
                continue;
            }


            const chunk = this.chunks.get(key);
            if (!chunk) continue;

            const connection = chunk.visibility;
            for (const face of FACES) {

                if (item.pos.sub(chunkPosition).length() <= 3) {

                    for (const [face, direction] of Object.entries(FACE_DIRECTIONS)) {
                        const neighborPosition = item.pos.add(direction);
                        const faceKey = Number(face) as Face;
                        queue.push({
                            pos: neighborPosition,
                            entryFace: OPPOSITE_FACE[faceKey]
                        });
                        continue;
                    }


                }

                if (item.entryFace != null) {
                    const canExit = connection.get(item.entryFace)?.has(face);
                    if (!canExit) continue;
                }


                const neighborPosition = item.pos.add(FACE_DIRECTIONS[face]);


                const worldX = neighborPosition.x * CHUNK_SIZE;
                const worldY = neighborPosition.y * CHUNK_SIZE;
                const worldZ = neighborPosition.z * CHUNK_SIZE;

                tempBox.min.set(worldX, worldY, worldZ);
                tempBox.max.set(worldX + CHUNK_SIZE, worldY + CHUNK_SIZE, worldZ + CHUNK_SIZE);

                if (!frustum.intersectsBox(tempBox)) {
                    if (item.pos.sub(chunkPosition).length() > 2) {
                        continue;
                    }

                }

                queue.push({
                    pos: neighborPosition,
                    entryFace: OPPOSITE_FACE[face]
                });
            }
        }
        return visibleChunks;
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
            this.visibleChunks.has(chunkPosition.toKey()) &&
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
                const mesh = this.chunksMeshes.get(c)!;
                this.scene.remove(mesh);
                mesh.geometry.dispose();


                const collider = this.chunksColliders.get(c);
                if (collider) {
                    const parentBody = collider.parent();
                    this.physicsWorld.removeCollider(collider, true);
                    if (parentBody) {
                        this.physicsWorld.removeRigidBody(parentBody);
                    }
                    this.chunksColliders.delete(c);
                }

                this.loadedChunks.delete(c);

                const chunk = this.chunks.get(c)!;

                // Freeze data to save memory
                if (!chunk.chunkData.getIsFrozen()) {
                    chunk.chunkData.freeze();
                }
            }
        }

        // Also delete pending ones

        const toRemovePending: Set<string> = new Set();

        for (const c of this.pendingChunks) {
            if (!shouldBeLoaded.has(c)) {
                toRemovePending.add(c);
            }
        }

        for (const c of toRemove) {
            this.chunksMeshes.delete(c);
        }

        for (const c of toRemovePending) {
            this.pendingChunks.delete(c);
        }
    }

    private _unfreezeList(list: Chunk[]) {
        for (const chunk of list) {
            if (chunk.chunkData.getIsFrozen()) {
                chunk.chunkData.unfreeze();
            }
        }
    }

    computeOcclusion(playerPosition: Vector3, camera: Camera) {
        const visibleChunks = this._computeVisibility(playerPosition, camera);
        this.visibleChunks = visibleChunks;


        let totalChunks = this.chunksMeshes.size;
        let culledChunks = 0;

        for (const [c, mesh] of this.chunksMeshes) {
            mesh.visible = visibleChunks.has(c);
            if (!visibleChunks.has(c)) culledChunks++;
        }

        debugGlobal.updateKey("chunksCulled", `${culledChunks}/${totalChunks} (${Math.round((culledChunks / totalChunks) * 100)}%)`)
    }

    tick(playerPosition: Vector3, player: Player, camera: Camera) {

        this.computeOcclusion(playerPosition, camera);

        this._handleUnload(playerPosition);

        if (this.isFirstChunk) {
            player.setPosition(0, 50, 0);
        }

        const toGenerate = this.getChunkToGenerate(playerPosition);

        if (!toGenerate) return;

        console.log("Generate: ", toGenerate.x, toGenerate.y, toGenerate.z);

        debugGlobal.updateKey("pendingChunks", this.pendingChunks.size.toString());
        debugGlobal.updateKey("builtChunks", this.loadedChunks.size.toString());
        debugGlobal.updateKey("passiveChunks", this.chunks.size.toString());



        let chunk: Chunk;

        if (!this.chunks.has(toGenerate.toKey())) {
            const chunk_ = new Chunk();
            this.terrainGenerator.generateTerrainOf(chunk_, toGenerate);
            this.chunks.set(toGenerate.toKey(), chunk_);

            chunk = chunk_;
        } else {
            chunk = this.chunks.get(toGenerate.toKey())!;
        }



        if (!this.isReadyToGenerate(toGenerate)) {
            this.pendingChunks.add(toGenerate.toKey());
            console.log("Added to pending chunks ", this.pendingChunks.size);
        } else {

            if (chunk.chunkData.getIsFrozen()) {
                chunk.chunkData.unfreeze();
            }
            const neighbors = this.getNeighbors(toGenerate)

            this._unfreezeList(neighbors);

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

            const neighbors = this.getNeighbors(chunkPos);

            this._unfreezeList(neighbors);
            if (chunk.chunkData.getIsFrozen()) {
                chunk.chunkData.unfreeze();
            }


            const mesh = this.chunkMeshBuilder.buildChunkMesh(
                chunk,
                chunkPos,
                (neighbors[0] as Chunk),
                (neighbors[2] as Chunk),
                (neighbors[1] as Chunk),
                (neighbors[3] as Chunk),
                (neighbors[4] as Chunk),
                (neighbors[5] as Chunk),
                (neighbors[6] as Chunk)
            );

            toRemoveFromPending.add(chunkPos);
            this.loadedChunks.add(chunkPos.toKey());
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

            break; // Never allow more than two chunks/tick loaded

        }

        for (const toRemove of toRemoveFromPending) {
            this.pendingChunks.delete(toRemove.toKey());
        }
    }
}
