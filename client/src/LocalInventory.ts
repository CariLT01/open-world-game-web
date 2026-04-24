import { EventType } from "../../common/EventTypes";
import { InventoryUpdatePacket } from "../../common/packets/InventoryUpdatePacket";
import { PlayerInventoryContainer } from "../../common/PlayerInventoryContainer";
import { ClientEventBus } from "./ClientEventBus";
import { HOTBAR_START } from "../../common/SlotRanges";
import { InventoryStore } from "./Stores/InventoryStore";
import { HotbarSelectionUpdatePacket } from "../../common/packets/HotbarSelectionUpdatePacket";

export class LocalInventory {

    private container: PlayerInventoryContainer = new PlayerInventoryContainer();

    constructor() {
        this._registerEvents();
    }

    private _registerEvents() {
        ClientEventBus.on(EventType.CLIENT_INVENTORY_SLOT_CLICKED, (data) => {
            console.log("Send inventory packet");
            const updatePacket = new InventoryUpdatePacket();
            updatePacket.slot = data.slot;

            ClientEventBus.invokeEvent(EventType.SEND_PACKET, {packet: updatePacket});
        })

        ClientEventBus.on(EventType.CLIENT_INVENTORY_SYNC, (data) => {
            console.log("Received sync");
            this.container = data.container;

            InventoryStore.getState().setContainer(this.container);
        });

        ClientEventBus.on(EventType.CLIENT_HOTBAR_SELECTION_CHANGED, (data) => {
            const slotIndex = HOTBAR_START + data.index;
            const stack = this.container.getItemStackAt(slotIndex);

            ClientEventBus.invokeEvent(EventType.CLIENT_HANDHELD_ITEM_UPDATE, {stack: stack});

            const updatePacket = new HotbarSelectionUpdatePacket();
            updatePacket.slot = data.index;

            ClientEventBus.invokeEvent(EventType.SEND_PACKET, {
                packet: updatePacket
            });
        })
    }


}