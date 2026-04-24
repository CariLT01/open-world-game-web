import { EventType } from "../../../common/EventTypes";
import { ClientEventBus } from "../ClientEventBus";
import { InventoryStore } from "../Stores/InventoryStore";
import { InventoryRow } from "./InventoryRow";
import { InventorySlot } from "./InventorySlot";
import { _generateInventoryRow, type InventorySlotData } from "./InventoryTypes";
import { ItemStack } from "../../../common/ItemStack"; // Import ItemStack
import { useState } from "react";

export function Hotbar() {


    const container = InventoryStore(state => state.container);
    const updateTime = InventoryStore(state => state.updateTime);

    const hotbarSelectedIndex = InventoryStore(state => state.hotbarSelectedIndex);

    const ROW_4_START = 27;
    const ROW_4_END = 35;


    const onClick = (slotIndex: number) => { // Renamed slotIndeX to slotIndex for consistency
        console.log("Clicked hotbar slot index:", slotIndex); // Updated log message

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
        ClientEventBus.invokeEvent(EventType.CLIENT_INVENTORY_SLOT_CLICKED, {slot: slotIndex});
    }

    const rows = _generateInventoryRow(container, ROW_4_START, ROW_4_END);

    const newData: InventorySlotData[] = [];

    let i = 0;
    for (const oldData of rows) {
        if (i == hotbarSelectedIndex) {
            console.log("Found selected");
            newData.push({
                slot: oldData.slot,
                slotIndex: oldData.slotIndex,
                selected: true
            });
        } else {
            newData.push(oldData);
        }
        i++;
    }

    return <div className="fixed bottom-5 left-[50%] translate-x-[-50%] z-99 flex gap-2 pointer-events-auto">
        <InventoryRow slots={newData} onClick={onClick}></InventoryRow>
    </div>
}