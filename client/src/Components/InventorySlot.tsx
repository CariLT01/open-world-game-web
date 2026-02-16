import { useEffect, useState } from "react";
import inventorySlotImage from "../../assets/inventory_slot.png";
import inventorySlotSelectedImage from "../../assets/inventory_slot_selected.png"
import { ItemData } from "../Data/ItemsData";
import { ItemModels } from "../Data/models/Items";
import { ItemModelTypes } from "../Data/models/ModelTypes";
import { ItemThumbnailBakery } from "../Models/ItemThumbnailBakery";

interface Props {
    name: string;
    count: number;
    slotIndex: number;
    onClick?: (slotIndex: number) => void;
    selected?: boolean;
    hideSlotTexture?: boolean;
}

async function getTextureFromName(name: string) {
    return ItemThumbnailBakery.getThumbnail(name);
}

export function InventorySlot(props: Props) {
    const [texture, setTexture] = useState("");

    useEffect(() => {
        const a = async () => {

            if (!props.name) {
                setTexture("");
                return;
            }

            const t = await getTextureFromName(props.name);
            if (!t) return;
            setTexture(t);
        }
        a();
    }, [props.name]);

    

    if (texture == null && props.name !== "") {
        console.warn("Could not find texture with item name: ", props.name);
        console.warn("Available: ", ItemData);
    }

    return (
        <div
            className="w-20 h-20 p-1 bg-no-repeat bg-cover pixel-art relative"
            style={!props.hideSlotTexture ? { backgroundImage: !props.selected ? `url(${inventorySlotImage})` : `url(${inventorySlotSelectedImage})` } : {}}
            onClick={() => {
                if (!props.onClick) return;
                props.onClick(props.slotIndex);
            }}
        >
            {texture && (
                <div
                    className="w-[70%] h-[70%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-no-repeat bg-cover pixel-art absolute"
                    style={{
                        backgroundImage: `url(${texture})`,
                    }}
                ></div>
            )}
            {props.count > 0 && (
                <span className="bottom-2 right-2 text-xl font-bold text-white absolute">
                    {props.count}
                </span>
            )}
        </div>
    );
}
