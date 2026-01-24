import { InventoryStore } from "../Stores/InventoryStore";
import { MousePositionStore } from "../Stores/MousePositionStore";
import { InventorySlot } from "./InventorySlot";

export function HoldingInventorySlot() {
    const holdingItem = InventoryStore((state) => state.holding);
    const x = MousePositionStore((state) => state.x);
    const y = MousePositionStore((state) => state.y);
    const updateTime = InventoryStore(state => state.updateTime);
    const isVisible = InventoryStore(state => state.isVisible);

    return (isVisible && holdingItem.getCount() > 0) ? (
        <div
            className={`fixed z-99 translate-x-[-50%] translate-y-[-50%] pointer-events-none`}
            style={{
                top: `${y}px`,
                left: `${x}px`,
            }}
        >
            <InventorySlot
                slotIndex={0}
                onClick={() => {}}
                name={holdingItem.getName()}
                count={holdingItem.getCount()}
            ></InventorySlot>
            {updateTime}
        </div>
    ) : null;
}
