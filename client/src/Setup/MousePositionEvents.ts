import { MousePositionStore } from "../Stores/MousePositionStore";
import type { ISetupProcess } from "./SetupProcessInterface";

export class MousePositionEvents implements ISetupProcess {
    setup( ) {
        document.addEventListener("mousemove", (e) => {
            MousePositionStore.setState({x: e.clientX, y: e.clientY});
        })
    }
}