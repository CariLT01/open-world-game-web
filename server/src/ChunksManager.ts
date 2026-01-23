import type WebSocket from "ws";
import type { Vector3 } from "../../common/Core/Vector3";
import { EventBus } from "../../common/EventBus";
import { EventBusEvent } from "../../common/EventTypes";
import { ChunkDataPacket } from "../../common/packets/ChunkDataPacket";
import { ServerChunk } from "./ServerChunk";
import { CHUNKS_PER_TICK } from "./ServerConfig";
import { ServerEventBus } from "./ServerEventBus";
import { TerrainGenerator } from "./TerrainGenerator";

type ChunkToLoadEntry = {
    requester: WebSocket;
    position: Vector3;
}

export class ChunksManager {

    private queuedChunksToLoad: ChunkToLoadEntry[] = [];

    private chunks: Map<string, ServerChunk> = new Map();
    private terrainGenerator: TerrainGenerator = new TerrainGenerator();

    constructor() {
        this._registerEvents();
    }

    private _registerEvents() {
        ServerEventBus.on(EventBusEvent.SERVER_LOAD_CHUNK, (data) => {
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
            
            // chunk.chunkData.unfreeze();
            ServerEventBus.fireEvent(EventBusEvent.SEND_PACKET_TO_CONNECTION, {packet: chunkDataPacket, connection: requester});
            // chunk.chunkData.freeze();
        } else {
            // Needs terrain generation

            const generatedChunk = this.terrainGenerator.generateTerrain(position);

            const chunk = new ServerChunk();
            chunk.chunkData = generatedChunk;

            this.chunks.set(position.toKey(), chunk);

            // Send data

            const chunkDataPacket = new ChunkDataPacket();
            chunkDataPacket.chunkData = chunk.chunkData;

            // chunk.chunkData.unfreeze();
            ServerEventBus.fireEvent(EventBusEvent.SEND_PACKET_TO_CONNECTION, {packet: chunkDataPacket, connection: requester});
        }

    }

    private _processChunks() {
        for (let i = 0; i < CHUNKS_PER_TICK; i++) {

            if (this.queuedChunksToLoad.length === 0) return;
            const first = this.queuedChunksToLoad[0]!;
            this.queuedChunksToLoad.splice(0, 1);

            this._processChunk(first.position, first.requester);
        }
    }

    tick() {
        this._processChunks();
    }
}