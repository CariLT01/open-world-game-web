import { CHUNK_SIZE } from "../Config";
import { Vector3 } from "./Vector3";

export function toChunkCoord(v: Vector3): Vector3 {
    const toChunkPos = new Vector3(
        Math.floor(v.x / CHUNK_SIZE),
        Math.floor(v.y / CHUNK_SIZE),
        Math.floor(v.z / CHUNK_SIZE)
    );

    return toChunkPos;
}