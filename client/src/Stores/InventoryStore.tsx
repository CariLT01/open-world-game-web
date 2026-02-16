import { create } from "zustand";
import { ItemStack } from "../../../common/ItemStack";
import { PlayerInventoryContainer } from "../../../common/PlayerInventoryContainer";

interface InventoryStoreInterface {
    isVisible: boolean;
    container: PlayerInventoryContainer;
    updateTime: number;
    holding: ItemStack;
    hotbarSelectedIndex: number;
    
    // Actions
    setIsVisible: (visible: boolean) => void;
    setHolding: (itemStack: ItemStack) => void;
    clearHolding: () => void;
    setItemInSlot: (slotIndex: number, itemStack: ItemStack) => void;
    getItemInSlot: (slotIndex: number) => ItemStack;
    setContainer: (container: PlayerInventoryContainer) => void;
}

export const InventoryStore = create<InventoryStoreInterface>((set, get) => {
    return {
        isVisible: false,
        container: new PlayerInventoryContainer(),
        updateTime: Date.now(),
        holding: ItemStack.empty(),
        hotbarSelectedIndex: 0,

        setIsVisible: (visible: boolean) => set({ isVisible: visible }),
        setHolding: (itemStack: ItemStack) => set({ holding: itemStack, updateTime: Date.now() }),
        clearHolding: () => set({ holding: ItemStack.empty(), updateTime: Date.now() }),
        setItemInSlot: (slotIndex: number, itemStack: ItemStack) => {
            get().container.setItemStackAt(slotIndex, itemStack);
            const newContainer = PlayerInventoryContainer.copyFrom(get().container);
            set({ container: newContainer, updateTime: Date.now() });
        },
        getItemInSlot: (slotIndex: number) => {
            return get().container.getItemStackAt(slotIndex);
        },
        setContainer: (container: PlayerInventoryContainer) => set({ container: container, updateTime: Date.now() }),
    }
});