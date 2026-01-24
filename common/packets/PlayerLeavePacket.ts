import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export class PlayerLeavePacket implements IPacket {
    packetType = PacketTypes.PLAYER_LEAVE_PACKET;
    username?: string;

    serialize(): Uint8Array {
        if (!this.username) {
            throw new Error("No username specified");
        }

        const encodedPacket = game.PlayerLeave.encode({name: this.username}).finish();

        return encodedPacket;
    }

    deserialize(data: Uint8Array): void {
        const decodedPacket = game.PlayerLeave.decode(data);
        if (!decodedPacket.name) {
            throw new Error("No username specified");
        }

        this.username = decodedPacket.name;
    }
}