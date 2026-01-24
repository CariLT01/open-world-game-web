import { create } from "zustand";

interface IMousePositionStore {
    x: number;
    y: number;
}

export const MousePositionStore = create<IMousePositionStore>(() => {
    return {
        x: 0,
        y: 0
    }
})