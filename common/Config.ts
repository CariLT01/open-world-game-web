export const CHUNK_SIZE = 32;
export const CHUNK_AREA = CHUNK_SIZE * CHUNK_SIZE;
export const CHUNK_VOLUME = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE;
export const ISOLEVEL: number = 0.5;

export enum Face {
    TOP,
    BOTTOM,
    FRONT,
    BACK,
    LEFT,
    RIGHT,
}