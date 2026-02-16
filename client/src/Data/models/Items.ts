import { ItemTypes } from "../../../../common/data/ItemTypes";
import { ItemModelTypes, type ItemModelData } from "./ModelTypes";

import stickMeshTexture from "../../../assets/models/items/stick.png";
import diamondMeshTexture from "../../../assets/models/items/diamond.png";
import ironPickaxeMeshTexture from "../../../assets/models/items/iron_pickaxe.png";

import diamondMesh from "../../../assets/models/items/diamond.glb";
import stickMesh from "../../../assets/models/items/stick.glb";
import ironPickaxeMesh from "../../../assets/models/items/iron_pickaxe.glb";

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
    },
    [ItemTypes.IRON_PICKAXE]: {
        type: ItemModelTypes.CUSTOM,
        data: {
            transform: {
                thumbnail: {
                    position: new Vector3(0, -0.7, 0),
                    scale: new Vector3(0.2, 0.2, 0.2),
                    rotation: new Vector3(0, 0, 0)
                },
                hand: {
                    offset: new Vector3(defaultHandTransform.offset.x, defaultHandTransform.offset.y - 0.6, defaultHandTransform.offset.z),
                    scale: new Vector3(0.07, 0.07, 0.07),
                    rotation: new Vector3(0.7, -Math.PI / 2, Math.PI / 4)
                }
            },
            modelName: ironPickaxeMesh,
            texture: ironPickaxeMeshTexture
        }
    }
}