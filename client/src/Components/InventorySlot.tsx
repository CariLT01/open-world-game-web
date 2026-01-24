
interface Props {
    name: string;
    count: number;
    slotIndex: number;
    onClick?: (slotIndex: number) => void;
}

export function InventorySlot(props: Props) {



    return <div className="w-15 h-15 p-1 bg-black/15 rounded-md hover:bg-white/15 transition-colors" onClick={() => {
        if (!props.onClick) return;
        props.onClick(props.slotIndex)
    }}>
        {props.name}
        {props.count}
    </div>
}