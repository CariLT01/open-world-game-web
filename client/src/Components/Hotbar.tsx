import { InventorySlot } from "./InventorySlot";

export function Hotbar() {
    return <div className="fixed bottom-5 left-[50%] translate-x-[-50%] z-99 flex gap-2 pointer-events-auto">
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
        <InventorySlot></InventorySlot>
    </div>
}