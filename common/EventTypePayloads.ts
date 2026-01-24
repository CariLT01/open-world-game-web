import type { Object3D } from "three";
import { EventBusEvent } from "./EventTypes";
import { EventBus } from "./EventBus";
import { Vector3 } from "./Core/Vector3";
import type { IPacket } from "./packets/IPacket";
import type WebSocket from "ws";
import type { ChunkData } from "./ChunkData";

export interface EventTypePayloads {
    [EventBusEvent.CLIENT_ADD_TO_SCENE]: {object: Object3D},
    [EventBusEvent.CLIENT_PLAYER_JOINED]: {name: string},
    [EventBusEvent.CLIENT_PLAYER_MOVED]: {name: string, position: Vector3},
    [EventBusEvent.CLIENT_SOCKET_CONNECTED]: {},
    [EventBusEvent.SEND_PACKET]: {packet: IPacket},
    [EventBusEvent.SEND_PACKET_TO_CONNECTION]: {packet: IPacket, connection: WebSocket},
    [EventBusEvent.SEND_PACKET_TO_PLAYER]: {packet: IPacket, username: string},
    [EventBusEvent.SERVER_LOAD_CHUNK]: {position: Vector3, connection: WebSocket},
    [EventBusEvent.SERVER_PLAYER_JOINED]: {username: string, ws: WebSocket},
    [EventBusEvent.SERVER_PLAYER_MOVED]: {username: string, position: Vector3},
    [EventBusEvent.CLIENT_CHUNK_RECEIVED]: {position: Vector3, data: ChunkData},
    [EventBusEvent.SERVER_PLAYER_LEFT_WS]: {ws: WebSocket},
    [EventBusEvent.SERVER_PLAYER_LEFT]: {username: string},
    [EventBusEvent.FATAL_CRASH_STATE]: {}
}