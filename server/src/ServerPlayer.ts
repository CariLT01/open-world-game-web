import { Vector3 } from "../../common/Core/Vector3";

export class ServerPlayer {

    private position: Vector3;
    private name: string;


    constructor(username: string) {
        this.position = new Vector3(0, 0, 0);
        this.name = username;
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

    
}