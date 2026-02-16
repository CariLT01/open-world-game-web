import { EventBusEvent } from "../../../common/EventTypes";
import { ItemStack } from "../../../common/ItemStack";
import { PlayerInventoryContainer } from "../../../common/PlayerInventoryContainer";
import { ClientEventBus } from "../ClientEventBus";
import { InventoryStore } from "../Stores/InventoryStore";
import { InventoryRow } from "./InventoryRow";
import { _generateInventoryRow, type InventorySlotData } from "./InventoryTypes";





export function Inventory() {
    const isVisible = InventoryStore(state => state.isVisible);
    const slots = InventoryStore(state => state.container);
    const updateTime = InventoryStore(state => state.updateTime);

    const ROW_0_START = 0
    const ROW_0_END = 8;
    const ROW_1_START = 9;
    const ROW_1_END = 17;
    const ROW_2_START = 18;
    const ROW_2_END = 26;
    
    const onClick = (slotIndex: number) => {
        console.log("Clicked slot index:", slotIndex);

        const currentHoldingItem = InventoryStore.getState().holding;
        const itemInClickedSlot = InventoryStore.getState().getItemInSlot(slotIndex);

        if (currentHoldingItem.getCount() > 0) {
            // User is holding an item, trying to place it or swap
            if (itemInClickedSlot.getCount() > 0) {
                // Both holding and slot have items, swap them
                InventoryStore.getState().setItemInSlot(slotIndex, currentHoldingItem);
                InventoryStore.getState().setHolding(itemInClickedSlot);
            } else {
                // Holding an item, slot is empty, place item
                InventoryStore.getState().setItemInSlot(slotIndex, currentHoldingItem);
                InventoryStore.getState().clearHolding();
            }
        } else {
            // User is not holding an item, trying to pick one up
            if (itemInClickedSlot.getCount() > 0) {
                // Slot has an item, pick it up
                InventoryStore.getState().setHolding(itemInClickedSlot);
                InventoryStore.getState().setItemInSlot(slotIndex, ItemStack.empty());
            } else {
                // Not holding an item, slot is empty, do nothing for now
                // Future: Maybe send a "inspect slot" event to server
            }
        }

        // Regardless of client-side swap/pickup, always inform the server
        // The server will then validate and send back a sync packet.
        ClientEventBus.invokeEvent(EventBusEvent.CLIENT_INVENTORY_SLOT_CLICKED, {slot: slotIndex});
    }

    return isVisible ? <div className="w-fit h-fit p-4 fixed top-[50%] left-[50%] translate-x-[-50%] bg-black/15 rounded-md border border-white/15 pointer-events-auto">
        <div className="flex flex-col gap-1 items-center">
            <InventoryRow slots={_generateInventoryRow(slots, ROW_0_START, ROW_0_END)} onClick={onClick}></InventoryRow>
            <InventoryRow slots={_generateInventoryRow(slots, ROW_1_START, ROW_1_END)} onClick={onClick}></InventoryRow>
            <InventoryRow slots={_generateInventoryRow(slots, ROW_2_START, ROW_2_END)} onClick={onClick}></InventoryRow>
            <span className="hidden">{updateTime}</span>
            
        </div>
    </div> : null;
}