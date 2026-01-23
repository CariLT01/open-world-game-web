import type { PacketTypes } from "./PacketTypes";

export interface IPacket {

    packetType: PacketTypes;

    serialize(): Uint8Array;
    deserialize(data: Uint8Array): void;
}