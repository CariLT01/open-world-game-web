import type { Object3D } from "three";
import { EventBusEvent } from "./EventTypes";
import { EventBus } from "./EventBus";
import { Vector3 } from "./Core/Vector3";
import type { IPacket } from "./packets/IPacket";
import type WebSocket from "ws";
import type { ChunkData } from "./ChunkData";
import type { PlayerInventoryContainer } from "./PlayerInventoryContainer";
import type { ItemStack } from "./ItemStack";

export interface EventTypePayloads {
    // Client
    [EventBusEvent.CLIENT_ADD_TO_SCENE]: {object: Object3D},
    [EventBusEvent.CLIENT_REMOVE_FROM_SCENE]: {object: Object3D},
    [EventBusEvent.CLIENT_PLAYER_JOINED]: {name: string},
    [EventBusEvent.CLIENT_PLAYER_MOVED]: {name: string, position: Vector3},
    [EventBusEvent.CLIENT_SOCKET_CONNECTED]: {},
    [EventBusEvent.CLIENT_CHUNK_RECEIVED]: {position: Vector3, data: ChunkData},
    [EventBusEvent.CLIENT_TOGGLE_POINTER_LOCK]: {lockPointer: boolean},
    [EventBusEvent.CLIENT_INVENTORY_SLOT_CLICKED]: {slot: number},
    [EventBusEvent.CLIENT_INVENTORY_SYNC]: {container: PlayerInventoryContainer},
    [EventBusEvent.CLIENT_HOTBAR_SELECTION_CHANGED]: {index: number},
    [EventBusEvent.CLIENT_HANDHELD_ITEM_UPDATE]: {stack: ItemStack},
    [EventBusEvent.CLIENT_MULTIPLAYER_PLAYER_HANDHELD_UPDATE]: {itemName: string, username: string},

    // Common
    [EventBusEvent.SEND_PACKET]: {packet: IPacket},
    [EventBusEvent.SEND_PACKET_TO_CONNECTION]: {packet: IPacket, connection: WebSocket},
    [EventBusEvent.SEND_PACKET_TO_PLAYER]: {packet: IPacket, username: string},

    // Server
    [EventBusEvent.SERVER_LOAD_CHUNK]: {position: Vector3, connection: WebSocket},
    [EventBusEvent.SERVER_PLAYER_JOINED]: {username: string, ws: WebSocket},
    [EventBusEvent.SERVER_PLAYER_MOVED]: {username: string, position: Vector3},
    [EventBusEvent.SERVER_PLAYER_LEFT_WS]: {ws: WebSocket},
    [EventBusEvent.SERVER_PLAYER_LEFT]: {username: string},
    [EventBusEvent.FATAL_CRASH_STATE]: {},
    [EventBusEvent.SERVER_INVENTORY_UPDATE]: {slot: number, username: string},
    [EventBusEvent.SERVER_PLAYER_HOTBAR_SELECT_UPDATE]: {slot: number, username: string}
    
}