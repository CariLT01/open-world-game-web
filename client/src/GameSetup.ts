import { HotbarSelectionEvents } from "./Setup/HotbarSelectionEvents";
import { InventoryVisibilityEvent } from "./Setup/InventoryVisibilityToggle";
import { MousePositionEvents } from "./Setup/MousePositionEvents";
import type { ISetupProcess } from "./Setup/SetupProcessInterface";

type SetupProcessConstructor = new () => ISetupProcess;

const SETUP_PROCESSESS: SetupProcessConstructor[] = [
    InventoryVisibilityEvent,
    MousePositionEvents,
    HotbarSelectionEvents
];

export class GameSetup {
    
    runSetupProcesses() {
        console.log("Running game setup");
        for (const process of SETUP_PROCESSESS) {
            console.log("Running ", process.name);
            new process().setup();
        }
        console.log("Finished processes");
    }


}