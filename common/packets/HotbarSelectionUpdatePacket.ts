import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";


export class HotbarSelectionUpdatePacket implements IPacket {
    slot?: number;

    packetType: PacketTypes = PacketTypes.HOTBAR_SELECT_UPDATE;

    serialize(): Uint8Array {
        if (this.slot == null) {
            throw new Error("No slot");
        }

        const encoded = game.HotbarSelectUpdate.encode({slot: this.slot}).finish();
        return encoded;
    }

    deserialize(data: Uint8Array): void {
        const decoded = game.HotbarSelectUpdate.decode(data);
        this.slot = decoded.slot;
    }

}