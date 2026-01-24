import { Vector3 } from "../../../common/Core/Vector3";
import { EventBus } from "../../../common/EventBus";
import { EventBusEvent } from "../../../common/EventTypes";
import { ChunkDataPacket } from "../../../common/packets/ChunkDataPacket";
import { PacketTypes } from "../../../common/packets/PacketTypes";
import { PlayerJoinPacket } from "../../../common/packets/PlayerJoinPacket";
import { PlayerLeavePacket } from "../../../common/packets/PlayerLeavePacket";
import { PlayerMovePacket } from "../../../common/packets/PlayerMovePacket";
import { ClientEventBus } from "../ClientEventBus";

export class ClientPacketProcessor {
    constructor() {}

    processPacket(data: Uint8Array) {
        if (data.length === 0) {
            throw new Error("Cannot process packet with length 0");
        }

        const packetType = data[0] as PacketTypes;
        const packetBuffer = data.slice(1);

        let decodedPacket;

        switch (packetType) {
            case PacketTypes.PLAYER_JOIN_PACKET:
                decodedPacket = new PlayerJoinPacket();
                decodedPacket.deserialize(packetBuffer);

                ClientEventBus.fireEvent(
                    EventBusEvent.CLIENT_PLAYER_JOINED,
                    {name: decodedPacket.name ?? "UNKNOWN"}
                );
                break;
            case PacketTypes.PLAYER_MOVE_PACKET:
                decodedPacket = new PlayerMovePacket();
                decodedPacket.deserialize(packetBuffer);

                if (!decodedPacket.position) {
                    throw new Error("Packet has no positoin");
                }

                ClientEventBus.fireEvent(EventBusEvent.CLIENT_PLAYER_MOVED, {
                    name: decodedPacket.name ?? "",
                    position: new Vector3(
                        decodedPacket.position.x ?? 0,
                        decodedPacket.position.y ?? 0,
                        decodedPacket.position.z ?? 0,
                    ),
                });
                break;
            case PacketTypes.CHUNK_DATA_PACKET:
                decodedPacket = new ChunkDataPacket();
                decodedPacket.deserialize(packetBuffer);


                if (decodedPacket.position === undefined) {
                    throw new Error("Packet has no position");
                }

                if (decodedPacket.chunkData === undefined) {
                    throw new Error("Packet has no chunk data");
                }

                // console.log("Got chunk data packet at: ", decodedPacket.position.toKey());

                ClientEventBus.fireEvent(EventBusEvent.CLIENT_CHUNK_RECEIVED, {
                    position: decodedPacket.position,
                    data: decodedPacket.chunkData,
                })

                

                break;
            case PacketTypes.PLAYER_LEAVE_PACKET:
                decodedPacket = new PlayerLeavePacket();
                decodedPacket.deserialize(packetBuffer);

                if (decodedPacket.username === undefined) {
                    throw new Error("No username in packet");
                }

                ClientEventBus.fireEvent(EventBusEvent.SERVER_PLAYER_LEFT, {
                    username: decodedPacket.username
                });

                break;
            default:
                console.warn("Unknown packet type: ", packetType);
                break;
        }
    }
}
