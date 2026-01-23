import type { Vector3 } from "../../../common/Core/Vector3";
import { EventBusEvent } from "../../../common/EventTypes";
import { ClientEventBus } from "../ClientEventBus";
import { NetworkingPlayer } from "./NetworkingPlayer";

export class PlayersManager {
    private myUsername: string;

    private players: Map<string, NetworkingPlayer> = new Map();


    constructor(currentUsername: string) {
        this.myUsername = currentUsername;

        this._registerEvents();
    }

    private _registerEvents() {
        ClientEventBus.on(EventBusEvent.CLIENT_PLAYER_JOINED, (data) => {
            if (data.name === this.myUsername) return;

            this.addPlayer(data.name);
        })

        ClientEventBus.on(EventBusEvent.CLIENT_PLAYER_MOVED, (data) => {

            if (data.name === this.myUsername) return;

            this.setPositionFor(data.name, data.position);
        })
    }

    addPlayer(username: string) {
        if (username === this.myUsername) return;
        this.players.set(username, new NetworkingPlayer(username));
    }

    setPositionFor(username: string, pos: Vector3) {
        if (username === this.myUsername) return;

        if (!this.players.has(username)) throw new Error("Player does not exist");

        this.players.get(username)!.updatePosition(pos);
    }
}