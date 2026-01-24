import { ItemStack } from "./ItemStack";


const ROWS = 3;
const COLUMNS = 9;
const HOTBAR = 9;

export class PlayerInventoryContainer {
    
    private slots: ItemStack[] = [];

    constructor() {
        this._populateContainer();
    }

    static copyFrom(other: PlayerInventoryContainer) {
        const newContainer = new PlayerInventoryContainer();

        for (let i = 0; i < other.getLength(); i++) {
            const item = other.getItemStackAt(i);
            newContainer.setItemStackAt(i, item);
        }

        return newContainer;
    }

    private _populateContainer() {
        for (let row = 0; row < ROWS; row++) {
            for (let column = 0; column < COLUMNS; column++) {
                this.slots.push(ItemStack.empty());
            }
        }

        for (let slot = 0; slot < HOTBAR; slot++) {
            this.slots.push(ItemStack.empty());
        }
    }

    private _slotIndexBoundsCheck(slotIndex: number) {
        if (slotIndex < 0) throw new Error("Slot index is negative");
        if (slotIndex > this.slots.length - 1) throw new Error("Slot index out of bounds: " + slotIndex); 
    }

    getItemStackAt(slotIndex: number) {
        this._slotIndexBoundsCheck(slotIndex);
        return this.slots[slotIndex]!;
    }

    setItemStackAt(slotIndex: number, stack: ItemStack) {
        this._slotIndexBoundsCheck(slotIndex);
        this.slots[slotIndex] = stack;
    }

    getLength() {
        return this.slots.length;
    }
}