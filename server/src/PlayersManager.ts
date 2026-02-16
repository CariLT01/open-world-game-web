import type WebSocket from "ws";
import type { Vector3 } from "../../common/Core/Vector3";
import { EventBusEvent } from "../../common/EventTypes";
import { PlayerMovePacket } from "../../common/packets/PlayerMovePacket";
import { ServerEventBus } from "./ServerEventBus";
import { ServerPlayer } from "./ServerPlayer";
import type { IPacket } from "../../common/packets/IPacket";
import { EventBus } from "../../common/EventBus";
import { PlayerJoinPacket } from "../../common/packets/PlayerJoinPacket";
import { PlayerLeavePacket } from "../../common/packets/PlayerLeavePacket";
import { HOTBAR_END, HOTBAR_START } from "../../common/SlotRanges";
import { HoldingItemUpdatePacket } from "../../common/packets/HoldingItemUpdatePacket";

export class PlayersManager {
    private players: Map<string, ServerPlayer> = new Map();
    private playerConnections: Map<string, WebSocket> = new Map();

    constructor() {
        this._handlePlayerEvents();
    }

    private _addPlayer(username: string) {
        this.players.set(username, new ServerPlayer(username));
    }

    private _handlePlayerEvents() {
        ServerEventBus.on(
            EventBusEvent.SERVER_PLAYER_JOINED,
            (data) => {
                const playerName = data.username;
                const ws = data.ws;
                if (this.players.has(playerName)) {
                    throw new Error("Player already exists in the server!");
                }

                this._addPlayer(playerName);
                this.playerConnections.set(playerName, ws);

                console.log("Player joined: ", playerName);

                // Broadcast back to everyone else

                const joinPacket = new PlayerJoinPacket();
                joinPacket.name = playerName;

                ServerEventBus.invokeEvent(EventBusEvent.SEND_PACKET, {packet: joinPacket});

                // Send existing players

                for (const [name, player] of this.players) {
                    if (name !== playerName) {

                        joinPacket.name = name;

                        ServerEventBus.invokeEvent(EventBusEvent.SEND_PACKET_TO_CONNECTION, {packet: joinPacket, connection: ws});
                    }
                }


                // Initial inventory synchronization

                const player = this.players.get(playerName)!;

                player.getInventory().synchronize(playerName);
            },
        );

        ServerEventBus.on(
            EventBusEvent.SERVER_PLAYER_MOVED,
            (data) => {
                if (!this.players.has(data.username)) {
                    throw new Error("Player does not exist in the server!");
                }

                this.players.get(data.username)!.setPosition(data.position);

                // console.log("Player moved: ", playerName, position);
            },
        );

        ServerEventBus.on(
            EventBusEvent.SERVER_PLAYER_LEFT_WS,
            (data) => {
                // Check which username
                for (const [username, ws] of this.playerConnections) {
                    if (ws == data.ws) {

                        ServerEventBus.invokeEvent(
                            EventBusEvent.SERVER_PLAYER_LEFT,
                            {
                                username: username
                            }
                        )

                        this.players.delete(username);
                        this.playerConnections.delete(username);
                        break;
                    }
                }
            }
        )

        ServerEventBus.on(
            EventBusEvent.SEND_PACKET_TO_PLAYER,
            (data) => {
                if (!this.playerConnections.has(data.username)) {
                    throw new Error("Player does not exist in the server!");
                }

                const ws = this.playerConnections.get(data.username)!;

                ServerEventBus.invokeEvent(
                    EventBusEvent.SEND_PACKET_TO_CONNECTION,
                    {
                        packet: data.packet,
                        connection: ws
                    },
                );
            },
        );

        ServerEventBus.on(
            EventBusEvent.SERVER_PLAYER_LEFT,
            (data) => {
                console.log("Player left: ", data.username);

                if (!this.players.has(data.username)) {
                    throw new Error("Username does not exist on the server");
                }

                this.players.delete(data.username);
                this.playerConnections.delete(data.username);
                
                const playerLeavePacket = new PlayerLeavePacket();
                playerLeavePacket.username = data.username;

                ServerEventBus.invokeEvent(
                    EventBusEvent.SEND_PACKET,
                    {
                        packet: playerLeavePacket
                    }
                );
            }
        )

        ServerEventBus.on(
            EventBusEvent.SERVER_INVENTORY_UPDATE, (data) => {
                const user = this.players.get(data.username);
                
                if (!user) throw new Error("User not found");
                
                user.getInventory().handleInventoryClickEvent(data.slot, data.username);
            }
        )

        ServerEventBus.on(
            EventBusEvent.SERVER_PLAYER_HOTBAR_SELECT_UPDATE, (data) => {
                const user = this.players.get(data.username);

                if (!user) throw new Error("Player not found");

                this._handlePlayerHotbarSelectUpdate(data.slot, user);
            }
        )
    }

    private _handlePlayerHotbarSelectUpdate(slot: number, player: ServerPlayer) {
        // get slot

        // check if in the correct range
        
        
        if (slot < 0 || slot >= 9) {
            console.warn("Invalid slot: ", slot);
            return;
        }

        const slotIndex = HOTBAR_START + slot;

        const item = player.getInventory().getContainer().getItemStackAt(slotIndex);

        if (item.isEmpty()) {
            // empty stack
            return;
        }

        // broadcast

        const itemChangePacket = new HoldingItemUpdatePacket();
        itemChangePacket.itemName = item.getName();
        itemChangePacket.playerName = player.getName();

        ServerEventBus.invokeEvent(
            EventBusEvent.SEND_PACKET, {packet: itemChangePacket}
        );
    }       

    private _broadcastPlayerPositions() {
        for (const [username, data] of this.players) {
            const playerMovementPacket = new PlayerMovePacket();
            playerMovementPacket.name = username;
            playerMovementPacket.position = data.getPosition();

            ServerEventBus.invokeEvent(
                EventBusEvent.SEND_PACKET,
                {packet: playerMovementPacket},
            );
        }
    }

    tick() {
        this._broadcastPlayerPositions();
    }
}
