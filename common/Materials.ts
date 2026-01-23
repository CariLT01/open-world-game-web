import type { Vec3Fast } from "./Core/Vector3"

export type MaterialData = {
    color: Vec3Fast
}

export const Materials: Map<Number, MaterialData> = new Map(
    [
        [0, {
            color: [0, 0, 0]
        }],
        [1, {
            color: [52, 207, 93]
        }],
        [2, {
            color: [102, 71, 49]
        }],
        [3, {
            color: [61, 61, 61]
        }],
        [255, {
            color: [255, 0, 255]
        }]
    ]
)