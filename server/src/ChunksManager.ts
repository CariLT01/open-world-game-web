import type WebSocket from "ws";
import { Vector3 } from "../../common/Core/Vector3";
import { EventBus } from "../../common/EventBus";
import { EventType } from "../../common/EventTypes";
import { ChunkDataPacket } from "../../common/packets/ChunkDataPacket";
import { CHUNKS_PER_TICK } from "./ServerConfig";
import { ServerEventBus } from "./ServerEventBus";
import { TerrainGenerator } from "./TerrainGenerator";
import { Chunk } from "../../common/Chunk";
import { TerrainGenerator2 } from "./TerrainGenerator2";
import type { PlayersManager } from "./PlayersManager";
import { CHUNK_SIZE } from "../../common/Config";
import type { ServerPlayer } from "./ServerPlayer";

export const SIMULATION_DISTANCE = 6;

type ChunkToLoadEntry = {
    requester: string;
    position: Vector3;
}

export class ChunksManager {

    private queuedChunksToLoad: ChunkToLoadEntry[] = [];

    private chunks: Map<string, Chunk> = new Map();
    private terrainGenerator: TerrainGenerator2 = new TerrainGenerator2();

    private closestChunks: Vector3[] = [];

    private playersLoadedChunks: Map<string, Set<string>> = new Map();


    constructor() {


        this._registerEvents();
        this._precomputeClosestChunks();
    }

    private _registerEvents() {
        ServerEventBus.on(EventType.SERVER_LOAD_CHUNK, (data) => {

            console.warn("use of outdated event");
        });

        ServerEventBus.on(EventType.SERVER_PLAYER_JOINED, (data) => {
            this.playersLoadedChunks.set(data.username, new Set());
        })
    }

    private _processChunk(position: Vector3, requester: string) {

        if (this.chunks.has(position.toKey())) {
            // Send data directly

            const chunk = this.chunks.get(position.toKey())!;


            const chunkDataPacket = new ChunkDataPacket();
            chunkDataPacket.chunkData = chunk.chunkData;
            chunkDataPacket.position = position;

            // chunk.chunkData.unfreeze();
            // console.log("Load chunk: already exists: ", position, " send directly");
            ServerEventBus.invokeEvent(EventType.SEND_PACKET_TO_PLAYER, { packet: chunkDataPacket, username: requester });
            // chunk.chunkData.freeze();
        } else {
            // Needs terrain generation

            const chunk = new Chunk();

            const generatedChunk = this.terrainGenerator.generateTerrainOf(chunk, position);




            this.chunks.set(position.toKey(), chunk);

            // Send data

            const chunkDataPacket = new ChunkDataPacket();
            chunkDataPacket.chunkData = chunk.chunkData;
            chunkDataPacket.position = position;

            // console.log("Load chunk: doesn't exist: ", position, " generate");
            // chunk.chunkData.unfreeze();
            ServerEventBus.invokeEvent(EventType.SEND_PACKET_TO_PLAYER, { packet: chunkDataPacket, username: requester });
        }

    }

    private _processChunks() {
        // console.log("Chunks remaining: ", this.queuedChunksToLoad.length);
        for (let i = 0; i < CHUNKS_PER_TICK; i++) {

            if (this.queuedChunksToLoad.length === 0) return;
            const first = this.queuedChunksToLoad[0]!;
            this.queuedChunksToLoad.splice(0, 1);

            // console.log("Loading chunk: ", first.position);

            this._processChunk(first.position, first.requester);
        }


    }

    private _precomputeClosestChunks() {



        const chunks: Vector3[] = [];

        for (let x = -SIMULATION_DISTANCE; x <= SIMULATION_DISTANCE; x++) {
            for (let y = -SIMULATION_DISTANCE; y <= SIMULATION_DISTANCE; y++) {
                for (let z = -SIMULATION_DISTANCE; z <= SIMULATION_DISTANCE; z++) {
                    chunks.push(new Vector3(x, y, z));
                }
            }
        }

        chunks.sort((a, b) => {
            const distA = a.x * a.x + a.y * a.y + a.z * a.z; // squared distance
            const distB = b.x * b.x + b.y * b.y + b.z * b.z;
            return distA - distB;
        });

        this.closestChunks = chunks;

    }

    private _playerGetNextChunkToLoad(playerName: string, playerChunkPosition: Vector3): Vector3 | null {
        const currentlyLoadedChunks = this.playersLoadedChunks.get(playerName);
        if (!currentlyLoadedChunks) {
            console.warn("player does not exist on server: ", playerName);
            return null;
        }

        for (const closestChunk of this.closestChunks) {

            const realPosition = closestChunk.add(playerChunkPosition);

            if (!currentlyLoadedChunks.has(realPosition.toKey())) {
                return realPosition;
            } else {
                // console.log("has: ", realPosition);
            }
        }

        return null;
    }

    private _sendChunksToClients(playersManager: PlayersManager) {

        // console.log("the function runs");

        const players = playersManager.getPlayers();

        for (const [playerName, player] of players) {

            const position = player.getPosition();
            const toChunkPos = new Vector3(
                Math.floor(position.x / CHUNK_SIZE),
                Math.floor(position.y / CHUNK_SIZE),
                Math.floor(position.z / CHUNK_SIZE)
            );


            for (let i = 0; i < CHUNKS_PER_TICK; i++) {
                const nextChunk = this._playerGetNextChunkToLoad(playerName, toChunkPos);
                if (!nextChunk) {
                    console.log("no chunks to load");
                    continue;
                }

                this.queuedChunksToLoad.push({
                    "position": nextChunk,
                    "requester": playerName
                });

                // console.log("adding for queued chunk: ", playerName, " at: ", nextChunk);

                const loadedList = this.playersLoadedChunks.get(playerName);
                if (!loadedList) {
                    console.warn("couldn't find list");
                    continue;
                }
                loadedList.add(nextChunk.toKey());
            }



        }


    }

    tick(playersManager: PlayersManager) {
        this._sendChunksToClients(playersManager);
        this._processChunks();
    }
}