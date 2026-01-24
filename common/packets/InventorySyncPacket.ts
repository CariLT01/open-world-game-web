import { game } from "../generated/proto";
import { ItemStack } from "../ItemStack";
import { PlayerInventoryContainer } from "../PlayerInventoryContainer";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

type ItemStackType = {
    name: string;
    count: number;
    attributes: {[key: string]: {
        value: string;
        type: string;
    }}
}

export class InventorySyncPacket implements IPacket {

    container?: PlayerInventoryContainer;
    holding?: ItemStack;

    packetType: PacketTypes = PacketTypes.INVENTORY_SYNC;

    serialize(): Uint8Array {
        if (!this.container) {
            throw new Error("No container");
        }
        if (!this.holding) {
            throw new Error("Holding item stack not specified");
        }

        const items: ItemStackType[] = [];

        for (let i = 0; i < this.container.getLength(); i++) {
            const item = this.container.getItemStackAt(i);

            items.push({
                name: item.getName(),
                count: item.getCount(),
                attributes: {} // TODO: Actually use real attributes
            })
        }

        const holding: ItemStackType = {
            name: this.holding.getName(),
            count: this.holding.getCount(),
            attributes: {} // TODO: Actually use real attributes
        }

        const encoded = game.InventorySync.encode({
            items: items,
            holding: holding
        }).finish()

        return encoded;

        
    }

    deserialize(data: Uint8Array): void {
        const decoded = game.InventorySync.decode(data);

        if (!decoded.items) {
            throw new Error("No items");
        }

        if (!decoded.holding) {
            throw new Error("No holding item");
        }

        this.holding = new ItemStack(decoded.holding.name ?? "", decoded.holding.count ?? 0, {}); // TODO: Use real attributes
        this.container = new PlayerInventoryContainer();
        
        let i = 0;
        for (const item of decoded.items) {
            this.container.setItemStackAt(i, new ItemStack(item.name ?? "", item.count ?? 0, {})); // TODO: Use real attributes
            i++;
        }
    }
}