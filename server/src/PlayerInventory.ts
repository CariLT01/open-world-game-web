import { EventBusEvent } from "../../common/EventTypes";
import { ItemStack } from "../../common/ItemStack";
import { InventorySyncPacket } from "../../common/packets/InventorySyncPacket";
import { PlayerInventoryContainer } from "../../common/PlayerInventoryContainer";
import { ServerEventBus } from "./ServerEventBus";

type MoveResult = {
    valid: boolean;
    holdingRemainingCount: number;
    targetRemainingCount: number;
}

const MAX_STACK_SIZE = 64;

export class PlayerInventory {
    private container: PlayerInventoryContainer; // Holds the actual data
    private holding: ItemStack | null = null; // What player is currently holding

    constructor() {
        this.container = new PlayerInventoryContainer();
    }

    private _checkMoveValid(toSlot: number): MoveResult {

        if (this.holding == null) {
            return {
                valid: false,
                targetRemainingCount: 0,
                holdingRemainingCount: 0
            }
        }

        const destinationItem = this.container.getItemStackAt(toSlot);

        if (destinationItem.getName() !== this.holding.getName()) {
            if (destinationItem.getName() !== "" || destinationItem.getCount() != 0) {
                // Make sure it isn't empty, allow move to empty slot
                return {
                    valid: false,
                    targetRemainingCount: 0,
                    holdingRemainingCount: 0
                }
            }

        }

        // Name matches, check if destination stack already exceeding or at max stack size

        if (destinationItem.getCount() >= MAX_STACK_SIZE) {
            return {
                valid: false,
                targetRemainingCount: 0,
                holdingRemainingCount: 0
            }
        }

        // Name matches, destination has space, need to subtract to query the movable part

        const MOVABLE = Math.min(MAX_STACK_SIZE - destinationItem.getCount(), this.holding.getCount()); // How much actually transferrable

        const holdingNew = this.holding.getCount() - MOVABLE;
        const targetNew = destinationItem.getCount() + MOVABLE;

        if (destinationItem.getName() === "") {
            destinationItem.setName(this.holding.getName());
        }

        // Extra bound check

        if (holdingNew < 0) {
            console.warn("Holding new < 0; rejecting");

            return {
                valid: false,
                targetRemainingCount: 0,
                holdingRemainingCount: 0
            }
        }

        if (targetNew > MAX_STACK_SIZE) {
            console.warn("Target > MAX_STACK_SIZE; rejecting");

            return {
                valid: false,
                targetRemainingCount: 0,
                holdingRemainingCount: 0
            }
        }

        // Return result

        return {
            valid: true,
            targetRemainingCount: targetNew,
            holdingRemainingCount: holdingNew
        }




    }

    private _sync(username: string) {
        const syncPacket = new InventorySyncPacket();
        syncPacket.container = this.container;
        syncPacket.holding = this.holding ?? ItemStack.empty();

        ServerEventBus.invokeEvent(EventBusEvent.SEND_PACKET_TO_PLAYER, { username: username, packet: syncPacket })

    }

    synchronize(username: string) {
        this._sync(username);
    }

    moveItem(toSlot: number) {
        const destination = this.container.getItemStackAt(toSlot);
        if (!this.holding) return;

        // SCENARIO 1: Names match - Try to Stack/Merge
        if (destination.getName() === this.holding.getName() || destination.isEmpty()) {
            const moveResult = this._checkMoveValid(toSlot);
            if (!moveResult.valid) return;

            // Update Name if we are moving into an empty slot
            if (destination.isEmpty()) {
                destination.setName(this.holding.getName());
            }

            // Update Counts
            destination.setCount(moveResult.targetRemainingCount);

            if (moveResult.holdingRemainingCount <= 0) {
                this.holding = null;
            } else {
                this.holding.setCount(moveResult.holdingRemainingCount);
            }
        }
        // SCENARIO 2: Names differ - SWAP
        else {
            const temp = this.holding;
            this.holding = destination;
            this.container.setItemStackAt(toSlot, temp);
        }
    }

    grabItem(fromSlot: number) {
        const item = this.container.getItemStackAt(fromSlot);
        if (item.getCount() <= 0) return; // Not valid, no item there

        if (this.holding) {
            return; // Nothing should be holding while grabbing
        }

        // Grab

        this.holding = item;
        this.container.setItemStackAt(fromSlot, ItemStack.empty());


    }

    handleInventoryClickEvent(atSlot: number, username: string) {
        if (this.holding) {
            this.moveItem(atSlot);
        } else {
            this.grabItem(atSlot);
        }

        this._sync(username);
    }

    getContainer() {
        return this.container;
    }

}