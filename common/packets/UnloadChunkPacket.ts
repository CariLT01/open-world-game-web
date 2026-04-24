import { Vector3 } from "../Core/Vector3";
import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export class UnloadChunkPacket implements IPacket {
    packetType: PacketTypes = PacketTypes.UNLOAD_CHUNK;
    chunkPosition?: Vector3;

    serialize(): Uint8Array {
        if (!this.chunkPosition) {
            throw new Error("no chunk pos");
        }
     
        const encoded = game.UnloadChunk.encode({
            "chunkPosition": {
                "x": this.chunkPosition.x,
                "y": this.chunkPosition.y,
                "z": this.chunkPosition.z
            }
        }).finish();

        return encoded;
    }

    deserialize(data: Uint8Array): void {
        const decoded = game.UnloadChunk.decode(data);
        if (!decoded.chunkPosition) {
            throw new Error("no chunk pos in packet");
        }
        this.chunkPosition = new Vector3(
            decoded.chunkPosition.x ?? 0,
            decoded.chunkPosition.y ?? 0,
            decoded.chunkPosition.z ?? 0
        );
    }
}