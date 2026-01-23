import type WebSocket from "ws";
import { Vector3 } from "../../../common/Core/Vector3";
import { EventBusEvent } from "../../../common/EventTypes";
import type { IPacket } from "../../../common/packets/IPacket";
import { PacketTypes } from "../../../common/packets/PacketTypes";
import { PlayerJoinPacket } from "../../../common/packets/PlayerJoinPacket";
import { PlayerMovePacket } from "../../../common/packets/PlayerMovePacket";
import { ServerEventBus } from "../ServerEventBus";
import { ChunkLoadRequestPacket } from "../../../common/packets/ChunkLoadRequestPacket";


export class PacketProcessor {
    constructor() {


    }


    processPacket(data: Uint8Array, ws: WebSocket) {
        const packetType = data[0] as PacketTypes;
        const packetBuffer = data.slice(1);

        let packetData;

        switch (packetType) {
            case PacketTypes.PLAYER_JOIN_PACKET:
                
                packetData = new PlayerJoinPacket();
                packetData.deserialize(packetBuffer)
                
                if (!packetData.name) {
                    throw new Error("No name");
                }

                ServerEventBus.fireEvent(EventBusEvent.SERVER_PLAYER_JOINED, {username: packetData.name, ws: ws});
                break;
            case PacketTypes.PLAYER_MOVE_PACKET:
                packetData = new PlayerMovePacket();
                packetData.deserialize(packetBuffer)

                if (!packetData.position) {
                    throw new Error("PlayerMovePacket has no position");
                }

                const playerPosition = new Vector3(
                    packetData.position.x ?? 0,
                    packetData.position.y ?? 0,
                    packetData.position.z ?? 0
                );

                if (!packetData.name) {
                    throw new Error("No name");
                }

                ServerEventBus.fireEvent(EventBusEvent.SERVER_PLAYER_MOVED, {username: packetData.name, position: playerPosition});
                break;
            case PacketTypes.CHUNK_LOAD_REQUEST_PACKET:
                packetData = new ChunkLoadRequestPacket();
                packetData.deserialize(packetBuffer);

                if (!packetData.position) {
                    throw new Error("Failed to deserialize");
                }

                ServerEventBus.fireEvent(EventBusEvent.SERVER_LOAD_CHUNK, {
                    position: packetData.position,
                    connection: ws
                });
                break;
            default:
                console.warn("Unrecognized packet type: ", packetType);
                break;
        }

    }  
}