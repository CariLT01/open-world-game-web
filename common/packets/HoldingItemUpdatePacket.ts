import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export class HoldingItemUpdatePacket implements IPacket {
    itemName?: string;
    playerName?: string;

    packetType: PacketTypes = PacketTypes.HOLDING_ITEM_UPDATE;

    serialize(): Uint8Array {
        if (!this.itemName) {
            throw new Error("No item name");
        }
        if (!this.playerName) {
            throw new Error("No player name");
        }

        const encoded = game.HoldingItemUpdate.encode({itemName: this.itemName, playerName: this.playerName}).finish(); // TODO: Use item stack
        return encoded;
    }

    deserialize(data: Uint8Array): void {
        const decoded = game.HoldingItemUpdate.decode(data);
        this.itemName = decoded.itemName;
        this.playerName = decoded.playerName;
    }


}