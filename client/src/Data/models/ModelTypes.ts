import type { Vector3 } from "three";

export enum ItemModelTypes {
    SPRITE,
    CUSTOM
}

interface SpriteData {
    type: ItemModelTypes.SPRITE,
    data: {
        icon: string;
    }
}

interface CustomModelData {
    type: ItemModelTypes.CUSTOM,
    data: {
        modelName: string;
        texture: string;
        transform: {
            thumbnail: {
                position: Vector3;
                scale: Vector3;
                rotation: Vector3;
            },
            hand: {
                offset: Vector3;
                scale: Vector3;
                rotation: Vector3;
            }
        }

    }
}

export type ItemModelData = SpriteData | CustomModelData;