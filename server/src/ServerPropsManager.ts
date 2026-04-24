import { toChunkCoord } from "../../common/Core/CoordUtils";
import type { Vector3 } from "../../common/Core/Vector3"
import { EventType } from "../../common/EventTypes";
import { PropsDataPacket, type WorldProp } from "../../common/packets/PropsDataPacket";
import { ServerEventBus } from "./ServerEventBus";

export interface StatelessProp {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    modelName: string;
}


export interface Prop extends StatelessProp {

    id: number;
}


export class ServerPropsManager {

    private worldProps: Map<number, Prop> = new Map();
    private propsChunksTracker: Map<number, Vector3> = new Map();
    private chunksPropTracker: Map<string, Set<number>> = new Map();

    private propCounter: number = 0;

    constructor() {

    }

    private _retrackProp(propId: number) {
        const propInstance = this.worldProps.get(propId);
        if (!propInstance) {
            throw new Error("Prop not found");
        }

        if (this.propsChunksTracker.has(propId)) {
            const propPosition = toChunkCoord(propInstance.position);

            if (!this.chunksPropTracker.has(propPosition.toKey())) {
                this.chunksPropTracker.set(propPosition.toKey(), new Set());
            }

            const originalPosition = this.propsChunksTracker.get(propId)!;

            if (originalPosition == propPosition) {
                // nothing to do, up-to-date
                return;
            }
            const oldPropList= this.chunksPropTracker.get(originalPosition.toKey());
            if (oldPropList) {
                oldPropList?.delete(propId);
            }
            const newPropList = this.chunksPropTracker.get(propPosition.toKey())!;
            newPropList.add(propId);

            // set itself
            this.propsChunksTracker.set(propId, propPosition);
        } else {
            // create
            const propPosition = toChunkCoord(propInstance.position);

            if (!this.chunksPropTracker.has(propPosition.toKey())) {
                this.chunksPropTracker.set(propPosition.toKey(), new Set());
            }

            const propList = this.chunksPropTracker.get(propPosition.toKey())!;
            propList.add(propId);

            this.propsChunksTracker.set(propId, propPosition);

            // console.log("created prop id: ", propId, " insert in: ", propList.size, " list at: ", propPosition.toKey(), " originally at: ", propInstance.position);
        }


    }

    ensureChunkExists(position: Vector3) : boolean {

        // console.log("ensure: ", position.toKey());
        
        if (!this.chunksPropTracker.has(position.toKey())) {
            this.chunksPropTracker.set(position.toKey(), new Set());
            return true;
        }
        return false;
    }

    createPropFromStateless(prop: StatelessProp) {
        this.createProp(prop.position, prop.rotation, prop.scale, prop.modelName);
    }

    createProp(position: Vector3, rotation: Vector3, scale: Vector3, modelName: string): number {
        const newPropId = this.propCounter;
        this.propCounter++;

        this.worldProps.set(newPropId, {
            "id": newPropId,
            "modelName": modelName,
            "position": position,
            "rotation": rotation,
            "scale": scale
        });

        this._retrackProp(newPropId);


        return newPropId;
    }

    sendPropsToClient(position: Vector3, playerName: string) {

        const props: WorldProp[] = [];

        if (!this.chunksPropTracker.has(position.toKey())) {
            throw new Error("position is not known");
        }

        // console.log("request at: ", position.toKey());

        for (const propId of this.chunksPropTracker.get(position.toKey())!) {
            const realProp = this.worldProps.get(propId);
            if (!realProp) {
                console.warn("unable to find prop id:", propId);
                continue;
            }

            props.push(realProp);
        }

        const packet = new PropsDataPacket();
        packet.chunkPosition = position;
        packet.props = props;

        // console.log("pre-serialized to: ", props.length, " props")

        ServerEventBus.invokeEvent(EventType.SEND_PACKET_TO_PLAYER, {
            "packet": packet,
            "username": playerName
        });
    }


}