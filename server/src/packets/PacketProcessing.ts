import type WebSocket from "ws";
import { Vector3 } from "../../../common/Core/Vector3";
import { EventBusEvent } from "../../../common/EventTypes";
import type { IPacket } from "../../../common/packets/IPacket";
import { PacketTypes } from "../../../common/packets/PacketTypes";
import { PlayerJoinPacket } from "../../../common/packets/PlayerJoinPacket";
import { PlayerMovePacket } from "../../../common/packets/PlayerMovePacket";
import { ServerEventBus } from "../ServerEventBus";


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
                

                ServerEventBus.fireEvent(EventBusEvent.SERVER_PLAYER_JOINED, packetData.name, ws);
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

                ServerEventBus.fireEvent(EventBusEvent.SERVER_PLAYER_MOVED, packetData.name, playerPosition);
            
            
        }

    }  
}