import type { Object3D } from "three";
import { EventType } from "./EventTypes";
import { EventBus } from "./EventBus";
import { Vector3 } from "./Core/Vector3";
import type { IPacket } from "./packets/IPacket";
import type WebSocket from "ws";
import type { ChunkData } from "./ChunkData";
import type { PlayerInventoryContainer } from "./PlayerInventoryContainer";
import type { ItemStack } from "./ItemStack";

export interface EventTypePayloads {
    // Client
    [EventType.CLIENT_ADD_TO_SCENE]: {object: Object3D},
    [EventType.CLIENT_REMOVE_FROM_SCENE]: {object: Object3D},
    [EventType.CLIENT_PLAYER_JOINED]: {name: string},
    [EventType.CLIENT_PLAYER_MOVED]: {name: string, position: Vector3},
    [EventType.CLIENT_SOCKET_CONNECTED]: {},
    [EventType.CLIENT_CHUNK_RECEIVED]: {position: Vector3, data: ChunkData},
    [EventType.CLIENT_TOGGLE_POINTER_LOCK]: {lockPointer: boolean},
    [EventType.CLIENT_INVENTORY_SLOT_CLICKED]: {slot: number},
    [EventType.CLIENT_INVENTORY_SYNC]: {container: PlayerInventoryContainer},
    [EventType.CLIENT_HOTBAR_SELECTION_CHANGED]: {index: number},
    [EventType.CLIENT_HANDHELD_ITEM_UPDATE]: {stack: ItemStack},
    [EventType.CLIENT_MULTIPLAYER_PLAYER_HANDHELD_UPDATE]: {itemName: string, username: string},
    [EventType.CLIENT_ATTACK]: {},
    [EventType.CLIENT_UNLOAD_CHUNK]: {position: Vector3},

    // Common
    [EventType.SEND_PACKET]: {packet: IPacket},
    [EventType.SEND_PACKET_TO_CONNECTION]: {packet: IPacket, connection: WebSocket},
    [EventType.SEND_PACKET_TO_PLAYER]: {packet: IPacket, username: string},

    // Server
    [EventType.SERVER_LOAD_CHUNK]: {position: Vector3, connection: WebSocket},
    [EventType.SERVER_PLAYER_JOINED]: {username: string, ws: WebSocket},
    [EventType.SERVER_PLAYER_MOVED]: {username: string, position: Vector3},
    [EventType.SERVER_PLAYER_LEFT_WS]: {ws: WebSocket},
    [EventType.SERVER_PLAYER_LEFT]: {username: string},
    [EventType.FATAL_CRASH_STATE]: {},
    [EventType.SERVER_INVENTORY_UPDATE]: {slot: number, username: string},
    [EventType.SERVER_PLAYER_HOTBAR_SELECT_UPDATE]: {slot: number, username: string}
    
}