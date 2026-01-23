import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export class PlayerJoinPacket implements IPacket {

    packetType = PacketTypes.PLAYER_JOIN_PACKET;
    name?: string;

    serialize(): Uint8Array {

        if (!this.name) {
            throw new Error("PlayerJoinPacket has no name");
        }

        const encodedPacket = game.PlayerJoin.encode({
            name: this.name
        }).finish();
        return encodedPacket;
    }

    deserialize(data: Uint8Array): void {
        const decodedPacket = game.PlayerJoin.decode(data);

        this.name = decodedPacket.name;
    }
}