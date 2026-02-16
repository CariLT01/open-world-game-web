import type { ItemStack } from "../../../common/ItemStack";
import { InventorySlot } from "./InventorySlot";
import type { InventorySlotData } from "./InventoryTypes";



interface Props {
    slots: InventorySlotData[];
    onClick: (slotindex: number) => void;
}

export function InventoryRow(props: Props) {
    return (
        <div className="flex items-center gap-1">
            {props.slots.map((slot) => {
                return <InventorySlot selected={slot.selected ? true : false} key={slot.slotIndex} slotIndex={slot.slotIndex} count={slot.slot.getCount()} name={slot.slot.getName()} onClick={props.onClick}></InventorySlot>
            })}
        </div>
    );
}
