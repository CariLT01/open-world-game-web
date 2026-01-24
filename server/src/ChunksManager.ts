import type WebSocket from "ws";
import type { Vector3 } from "../../common/Core/Vector3";
import { EventBus } from "../../common/EventBus";
import { EventBusEvent } from "../../common/EventTypes";
import { ChunkDataPacket } from "../../common/packets/ChunkDataPacket";
import { CHUNKS_PER_TICK } from "./ServerConfig";
import { ServerEventBus } from "./ServerEventBus";
import { TerrainGenerator } from "./TerrainGenerator";
import { Chunk } from "../../common/Chunk";
import { TerrainGenerator2 } from "./TerrainGenerator2";

type ChunkToLoadEntry = {
    requester: WebSocket;
    position: Vector3;
}

export class ChunksManager {

    private queuedChunksToLoad: ChunkToLoadEntry[] = [];

    private chunks: Map<string, Chunk> = new Map();
    private terrainGenerator: TerrainGenerator2 = new TerrainGenerator2();

    constructor() {
        this._registerEvents();
    }

    private _registerEvents() {
        ServerEventBus.on(EventBusEvent.SERVER_LOAD_CHUNK, (data) => {

            // console.log("Requested: ", data.position);
            
            this.queuedChunksToLoad.push({
                requester: data.connection,
                position: data.position
            });
        })
    }

    private _processChunk(position: Vector3, requester: WebSocket) {

        if (this.chunks.has(position.toKey())) {
            // Send data directly

            const chunk = this.chunks.get(position.toKey())!;


            const chunkDataPacket = new ChunkDataPacket();
            chunkDataPacket.chunkData = chunk.chunkData;
            chunkDataPacket.position = position;
            
            // chunk.chunkData.unfreeze();
            // console.log("Load chunk: already exists: ", position, " send directly");
            ServerEventBus.invokeEvent(EventBusEvent.SEND_PACKET_TO_CONNECTION, {packet: chunkDataPacket, connection: requester});
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
            ServerEventBus.invokeEvent(EventBusEvent.SEND_PACKET_TO_CONNECTION, {packet: chunkDataPacket, connection: requester});
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

    tick() {
        this._processChunks();
    }
}