import { EventType } from "../../../common/EventTypes";
import { ClientEventBus } from "../ClientEventBus";
import { MousePositionStore } from "../Stores/MousePositionStore";
import type { ISetupProcess } from "./SetupProcessInterface";

export class MousePositionEvents implements ISetupProcess {
    setup( ) {
        document.addEventListener("mousemove", (e) => {
            MousePositionStore.setState({x: e.clientX, y: e.clientY});
        })

        document.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                ClientEventBus.invokeEvent(EventType.CLIENT_ATTACK, {});
            }
        })
    }
}