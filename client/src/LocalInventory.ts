import { EventBusEvent } from "../../common/EventTypes";
import { InventoryUpdatePacket } from "../../common/packets/InventoryUpdatePacket";
import { PlayerInventoryContainer } from "../../common/PlayerInventoryContainer";
import { ClientEventBus } from "./ClientEventBus";
import { InventoryStore } from "./Stores/InventoryStore";

export class LocalInventory {

    private container: PlayerInventoryContainer = new PlayerInventoryContainer();

    constructor() {
        this._registerEvents();
    }

    private _registerEvents() {
        ClientEventBus.on(EventBusEvent.CLIENT_INVENTORY_SLOT_CLICKED, (data) => {
            console.log("Send inventory packet");
            const updatePacket = new InventoryUpdatePacket();
            updatePacket.slot = data.slot;

            ClientEventBus.invokeEvent(EventBusEvent.SEND_PACKET, {packet: updatePacket});
        })

        ClientEventBus.on(EventBusEvent.CLIENT_INVENTORY_SYNC, (data) => {
            console.log("Received sync");
            this.container = data.container;

            InventoryStore.getState().setContainer(this.container);
        })
    }


}