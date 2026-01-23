import type WebSocket from "ws";
import type { Vector3 } from "../../common/Core/Vector3";
import { EventBusEvent } from "../../common/EventTypes";
import { PlayerMovePacket } from "../../common/packets/PlayerMovePacket";
import { ServerEventBus } from "./ServerEventBus";
import { ServerPlayer } from "./ServerPlayer";
import type { IPacket } from "../../common/packets/IPacket";

export class PlayersManager {

    private players: Map<string, ServerPlayer> = new Map();
    private playerConnections: Map<String, WebSocket> = new Map();


    constructor() {
        this._handlePlayerEvents();
    }


    private _addPlayer(username: string) {
        this.players.set(username, new ServerPlayer(username));
    }

    private _handlePlayerEvents() {
        ServerEventBus.on(EventBusEvent.SERVER_PLAYER_JOINED, (playerName: string, ws: WebSocket) => {
            if (this.players.has(playerName)) {
                throw new Error("Player already exists in the server!");
            }

            this._addPlayer(playerName);
            this.playerConnections.set(playerName, ws);

            console.log("Player joined: ", playerName);

        });

        ServerEventBus.on(EventBusEvent.SERVER_PLAYER_MOVED, (playerName: string, position: Vector3) => {
            if (!this.players.has(playerName)) {
                throw new Error("Player does not exist in the server!");
            }

            this.players.get(playerName)!.setPosition(position);

            console.log("Player moved: ", playerName, position);
        });

        ServerEventBus.on(EventBusEvent.SEND_PACKET_TO_PLAYER, (packet: IPacket, playerUsername: string) => {
            if (!this.playerConnections.has(playerUsername)) {
                throw new Error("Player does not exist in the server!");
            }

            const ws = this.playerConnections.get(playerUsername)!;

            ServerEventBus.fireEvent(EventBusEvent.SEND_PACKET_TO_CONNECTION, packet, ws);
        })
    }

    private _broadcastPlayerPositions() {
        for (const [username, data] of this.players) {
            const playerMovementPacket = new PlayerMovePacket();
            playerMovementPacket.name = username;
            playerMovementPacket.position = data.getPosition();

            ServerEventBus.fireEvent(EventBusEvent.SEND_PACKET, playerMovementPacket);
        }
    }

    tick() {
        this._broadcastPlayerPositions()
    }
}