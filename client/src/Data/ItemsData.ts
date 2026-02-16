import { ItemTypes } from "../../../common/data/ItemTypes";

// asset



type ClientItemData = {
    description: string;
}

export const ItemData: {[key: string]: ClientItemData} = {
    [ItemTypes.STICK]: {
        description: "A basic stick"
    },
    [ItemTypes.DIAMOND]: {
        description: "Valuable mineral"
    },
    [ItemTypes.IRON_PICKAXE]: {
        description: "A good-enough pickaxe"
    }
}