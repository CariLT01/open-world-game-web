import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export class InventoryUpdatePacket implements IPacket {

    slot?: number;
    packetType: PacketTypes = PacketTypes.INVENTORY_UPDATE;

    serialize(): Uint8Array {
        if (this.slot === undefined) {
            throw new Error("No slot");
        }

        const encoded = game.InventoryUpdate.encode({slot: this.slot}).finish();

        return encoded;
    }

    deserialize(data: Uint8Array): void {
        const decoded = game.InventoryUpdate.decode(data);

        this.slot = decoded.slot ?? 0;
    }
}