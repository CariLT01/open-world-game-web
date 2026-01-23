import { Vector3 } from "../Core/Vector3";
import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export class PlayerMovePacket implements IPacket {

    packetType: PacketTypes = PacketTypes.PLAYER_MOVE_PACKET;

    position?: Vector3;
    name?: string;

    serialize(): Uint8Array {

        if (!this.position) {
            throw new Error("PlayerMovePacket has no position");
        }

        if (!this.name) {
            throw new Error("PlayerMovePacket has no name");
        }

        const encodedPacket = game.PlayerMoveData.encode({
            position: {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z,
            },
            name: this.name
        }).finish();

        return encodedPacket;
    }

    deserialize(data: Uint8Array): void {
        const decodedPacket = game.PlayerMoveData.decode(data);

        if (!decodedPacket.position) {
            throw new Error("Decoded packet has no position");
        }

        this.position = new Vector3(
            decodedPacket.position.x ?? 0,
            decodedPacket.position.y ?? 0,
            decodedPacket.position.z ?? 0,
        );
        this.name = decodedPacket.name;
    }
}
