import "../Styling/Main.css"
import { Crosshair } from "./Crosshair"
import { HoldingInventorySlot } from "./HoldingInventorySlot"
import { Hotbar } from "./Hotbar"
import { Inventory } from "./Inventory"

export function App() {
    return <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-99 pointer-events-none">
        <Hotbar></Hotbar>
        <Inventory></Inventory>
        <HoldingInventorySlot></HoldingInventorySlot>
        <Crosshair></Crosshair>
    </div>
}