import "../Styling/Main.css"
import { Hotbar } from "./Hotbar"

export function App() {
    return <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-99 pointer-events-none">
        <Hotbar></Hotbar>
    </div>
}