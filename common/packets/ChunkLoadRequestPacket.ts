import { Vector3 } from "../Core/Vector3";
import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export class ChunkLoadRequestPacket implements IPacket {
    
    position?: Vector3;
    packetType = PacketTypes.CHUNK_LOAD_REQUEST_PACKET;

    serialize(): Uint8Array {
        
        if (!this.position) {
            throw new Error("No position");
        }

        const encoded = game.LoadChunkRequest.encode({
            chunkPosition: {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            }
        }).finish();

        return encoded;
    }

    deserialize(data: Uint8Array): void {
        
        const decoded = game.LoadChunkRequest.decode(data);

        if (!decoded.chunkPosition) {
            throw new Error("No position");
        }

        if (decoded.chunkPosition.x == null || decoded.chunkPosition.y == null || decoded.chunkPosition.z == null) {
            throw new Error("XYZ of chunk position not defined");
        }


        this.position = new Vector3(
            decoded.chunkPosition.x ?? 0,
            decoded.chunkPosition.y ?? 0,
            decoded.chunkPosition.z ?? 0
        );
    }
}