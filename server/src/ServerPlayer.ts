import { Vector3 } from "../../common/Core/Vector3";
import { ItemStack } from "../../common/ItemStack";
import { PlayerInventoryContainer } from "../../common/PlayerInventoryContainer";
import { PlayerInventory } from "./PlayerInventory";

export class ServerPlayer {

    private position: Vector3;
    private name: string;
    private inventory: PlayerInventory;


    constructor(username: string) {
        this.position = new Vector3(0, 0, 0);
        this.name = username;
        this.inventory = new PlayerInventory();

        // We add some troll items first

        this.inventory.getContainer().setItemStackAt(12,
            new ItemStack("Diamond", 24)
        );
        this.inventory.getContainer().setItemStackAt(14,
            new ItemStack("Diamond", 45)
        );

        this.inventory.getContainer().setItemStackAt(18,
            new ItemStack("Fake Diamond", 14)
        );

        this.inventory.getContainer().setItemStackAt(27,
            new ItemStack("Fake Diamond", 60)
        );
    }

    getPosition(): Vector3 {
        return this.position;
    }

    getName(): string {
        return this.name;
    }

    setPosition(position: Vector3) {
        this.position = position;
    }

    getInventory() {
        return this.inventory;
    }


}