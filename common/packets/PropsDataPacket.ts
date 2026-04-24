import { Vector3 } from "../Core/Vector3";
import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

export type WorldProp = {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    modelName: string;
    id: number;
}

export class PropsDataPacket implements IPacket {
    packetType: PacketTypes = PacketTypes.PROPS_DATA_PACKET;

    props?: WorldProp[]
    chunkPosition?: Vector3;

    serialize(): Uint8Array {
        if (!this.props) {
            throw new Error("No props");
        }

        if (!this.chunkPosition) {
            throw new Error("No chunk position!");
        }

        const propPackets: game.WorldProp[] = [];
        for (const prop of this.props) {

            const propPacket = game.WorldProp.create({
                "id": prop.id,
                "model": prop.modelName,
                "position": prop.position,
                "rotation": prop.rotation,
                "scale": prop.scale
            });

            propPackets.push(propPacket);
        }

        const finalPropDataPacket = game.PropsData.encode({
            "chunkPosition": this.chunkPosition,
            "props": propPackets
        }).finish();
        return finalPropDataPacket;
    }

    deserialize(data: Uint8Array): void {
        const decodedPacket = game.PropsData.decode(data);

        if (!decodedPacket.props) {
            throw new Error("No props in packet");
        }

        this.props = [];

        for (const propPacket of decodedPacket.props) {

            if (!propPacket.position) {
                continue;
            }
            if (!propPacket.rotation) {
                continue;
            }
            if (!propPacket.scale) {
                continue;
            }

            this.props.push({
                "id": propPacket.id ?? -1,
                "modelName": propPacket.model ?? "",
                "position": new Vector3(
                    propPacket.position.x ?? 0,
                    propPacket.position.y ?? 0,
                    propPacket.position.z ?? 0
                ),
                "rotation": new Vector3(
                    propPacket.rotation.x ?? 0,
                    propPacket.rotation.y ?? 0,
                    propPacket.rotation.z ?? 0
                ),
                "scale": new Vector3(
                    propPacket.scale.x ?? 0,
                    propPacket.scale.y ?? 0,
                    propPacket.scale.z ?? 0
                )
            });
        }
        
        if (!decodedPacket.chunkPosition) {
            throw new Error("no chunk pos");
        }

        this.chunkPosition = new Vector3(
            decodedPacket.chunkPosition.x ?? 0,
            decodedPacket.chunkPosition.y ?? 0,
            decodedPacket.chunkPosition.z ?? 0
        );
    }
}