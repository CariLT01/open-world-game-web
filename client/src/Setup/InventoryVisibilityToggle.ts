import { EventType } from "../../../common/EventTypes";
import { ClientEventBus } from "../ClientEventBus";
import { InventoryStore } from "../Stores/InventoryStore";
import type { ISetupProcess } from "./SetupProcessInterface";

export class InventoryVisibilityEvent implements ISetupProcess {
    setup() {
        document.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === 'e') {

                const isInventoryVisible = InventoryStore.getState().isVisible;
                InventoryStore.getState().setIsVisible(!isInventoryVisible);

                ClientEventBus.invokeEvent(EventType.CLIENT_TOGGLE_POINTER_LOCK, {lockPointer: isInventoryVisible});
            }
        })
    }
}