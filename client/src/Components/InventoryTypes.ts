import type { ItemStack } from "../../../common/ItemStack";
import type { PlayerInventoryContainer } from "../../../common/PlayerInventoryContainer";

export type InventorySlotData = {
    slot: ItemStack
    slotIndex: number;
    selected?: boolean;
}

export function _generateInventoryRow(container: PlayerInventoryContainer, rangeStart: number, rangeEnd: number) {
    
    const items: InventorySlotData[] = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
        const item = container.getItemStackAt(i);

        items.push({
            slotIndex: i,
            slot: item
        });
    }

    return items;
}