import { EventBusEvent } from "../../../common/EventTypes";
import { ClientEventBus } from "../ClientEventBus";
import { InventoryStore } from "../Stores/InventoryStore";
import type { ISetupProcess } from "./SetupProcessInterface";

export class HotbarSelectionEvents implements ISetupProcess {
    setup() {
        document.addEventListener("keydown", (e) => {
            try {
                const i = parseInt(e.key, 10);
                if (Number.isNaN(i)) return;
                if (i >= 1 && i <= 9) {
                    InventoryStore.setState({hotbarSelectedIndex: i - 1});
                    ClientEventBus.invokeEvent(EventBusEvent.CLIENT_HOTBAR_SELECTION_CHANGED, {index: i - 1});
                } else {
                    console.warn("invalid hotbar index: ", i);
                }
            } catch {
                console.warn("cannot parse string: ", e.key);
            }
        })
    }
}