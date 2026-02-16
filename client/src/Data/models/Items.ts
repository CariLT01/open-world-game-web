import { ItemTypes } from "../../../../common/data/ItemTypes";
import { ItemModelTypes, type ItemModelData } from "./ModelTypes";

import stickMeshTexture from "../../../assets/models/items/stick.png"
import diamondMeshTexture from "../../../assets/models/items/diamond.png"

import diamondMesh from "../../../assets/models/items/diamond.glb";
import stickMesh from "../../../assets/models/items/stick.glb"

import { Vector3 } from "three";

type ItemModelEntry = {
    type: ItemModelTypes,
    data?: any
}

const defaultHandTransform = {
    // X: Right, Y: Down, Z: Forward (Into the screen)
    offset: new Vector3(0.4, -0.4, -0.8),

    scale: new Vector3(0.2, 0.2, 0.2),

    // Euler angles in degrees (Converted to Radians in your Loader)
    // Pitch: 5, Yaw: -10, Roll: -5
    rotation: new Vector3(0.087, -0.174, -0.087)
}

export const ItemModels: { [key: string]: ItemModelData } = {
    [ItemTypes.STICK]: {
        type: ItemModelTypes.CUSTOM,
        data: {
            transform: {
                thumbnail: {
                    position: new Vector3(0, 0, 0),
                    scale: new Vector3(1, 1, 1),
                    rotation: new Vector3(0, 0, 0)
                },
                hand: defaultHandTransform
            },
            modelName: stickMesh,
            texture: stickMeshTexture
        }
    },
    [ItemTypes.DIAMOND]: {
        type: ItemModelTypes.CUSTOM,
        data: {
            transform: {
                thumbnail: {
                    position: new Vector3(0, 0, 0),
                    scale: new Vector3(1, 1, 1),
                    rotation: new Vector3(0, 0, 0)
                },
                hand: defaultHandTransform
            },
            modelName: diamondMesh,
            texture: diamondMeshTexture
        }
    }
}