import { CHUNK_VOLUME, Face, ISOLEVEL } from "../Config";
import { Vector3, type Vec3Fast } from "../Core/Vector3";
import { Queue } from "../Queue";
import { ChunkData, type BlockData, type PaletteIndex } from "./ChunkData";

export const CHUNK_SIZE = 32;



type VisibilityMask = Map<Face, Set<Face>>;

const visibilityFaceBlocks: Map<Face, Set<number>> = new Map([
    [Face.TOP, new Set()],
    [Face.BOTTOM, new Set()],
    [Face.FRONT, new Set()],
    [Face.BACK, new Set()],
    [Face.LEFT, new Set()],
    [Face.RIGHT, new Set()],
]);

const faces = [
    Face.TOP,
    Face.BOTTOM,
    Face.LEFT,
    Face.RIGHT,
    Face.FRONT,
    Face.BACK,
];

const FULLY_VISIBLE_MASK: Map<Face, Set<Face>> = new Map([
    [
        Face.TOP,
        new Set([
            Face.TOP,
            Face.BOTTOM,
            Face.LEFT,
            Face.RIGHT,
            Face.FRONT,
            Face.BACK,
        ]),
    ],
    [
        Face.BOTTOM,
        new Set([
            Face.TOP,
            Face.BOTTOM,
            Face.LEFT,
            Face.RIGHT,
            Face.FRONT,
            Face.BACK,
        ]),
    ],
    [
        Face.LEFT,
        new Set([
            Face.TOP,
            Face.BOTTOM,
            Face.LEFT,
            Face.RIGHT,
            Face.FRONT,
            Face.BACK,
        ]),
    ],
    [
        Face.RIGHT,
        new Set([
            Face.TOP,
            Face.BOTTOM,
            Face.LEFT,
            Face.RIGHT,
            Face.FRONT,
            Face.BACK,
        ]),
    ],
    [
        Face.FRONT,
        new Set([
            Face.TOP,
            Face.BOTTOM,
            Face.LEFT,
            Face.RIGHT,
            Face.FRONT,
            Face.BACK,
        ]),
    ],
    [
        Face.BACK,
        new Set([
            Face.TOP,
            Face.BOTTOM,
            Face.LEFT,
            Face.RIGHT,
            Face.FRONT,
            Face.BACK,
        ]),
    ],
]);

for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let y = 0; y < CHUNK_SIZE; y++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
            if (z == CHUNK_SIZE - 1)
                visibilityFaceBlocks
                    .get(Face.FRONT)!
                    .add(new Vector3(x, y, z).toChunkIndex());
            if (z == 0)
                visibilityFaceBlocks
                    .get(Face.BACK)!
                    .add(new Vector3(x, y, z).toChunkIndex());
            if (x == CHUNK_SIZE - 1)
                visibilityFaceBlocks
                    .get(Face.RIGHT)!
                    .add(new Vector3(x, y, z).toChunkIndex());
            if (x == 0)
                visibilityFaceBlocks
                    .get(Face.LEFT)!
                    .add(new Vector3(x, y, z).toChunkIndex());
            if (y == CHUNK_SIZE - 1)
                visibilityFaceBlocks
                    .get(Face.TOP)!
                    .add(new Vector3(x, y, z).toChunkIndex());
            if (y == 0)
                visibilityFaceBlocks
                    .get(Face.BOTTOM)!
                    .add(new Vector3(x, y, z).toChunkIndex());
        }
    }
}

export class Chunk {
    public chunkData: ChunkData;
    public visibility: VisibilityMask = new Map();

    private visited: Uint16Array = new Uint16Array(CHUNK_VOLUME);
    private queue: Uint16Array = new Uint16Array(CHUNK_VOLUME);

    constructor() {
        this.chunkData = new ChunkData();

        this.generateVoidData();
    }

    private generateVoidData() {
        console.log("-- Gen void data");

        console.log("Void data gen complete");
    }

    calculateIndexAt(p: Vector3) {
        return p.x * CHUNK_SIZE * CHUNK_SIZE + p.y * CHUNK_SIZE + p.z;
    }
    calculateIndexAtFast(p: Vec3Fast) {
        return p[0] * CHUNK_SIZE * CHUNK_SIZE + p[1] * CHUNK_SIZE + p[2];
    }

    getDensityAt(p: Vector3) {
        return this.chunkData.getDensityAt(p);
    }
    getMaterialAt(p: Vector3) {
        return this.chunkData.getBlockAt(p);
    }
    setDensityAndMaterialAt(p: Vector3, density: number, material: BlockData) {
        return this.chunkData.setBlockAt(p, density, material, false);
    }
    getDensityAtFast(p: Vec3Fast) {
        return this.chunkData.getDensityAt(new Vector3(p[0], p[1], p[2]));
    }
    getMaterialAtFast(p: Vec3Fast) {
        return this.chunkData.getBlockAt(new Vector3(p[0], p[1], p[2]));
    }
    getMaterialWithPaletteIndex(i: PaletteIndex) {
        return this.chunkData.getMaterialWithPaletteIndex(i);
    }

    computeVisibilityMask() {
        const VISITED = new Uint8Array(CHUNK_VOLUME);
        const STACK = new Uint16Array(CHUNK_VOLUME);

        this.visibility.clear();

        if (this.chunkData.isEmpty()) {
            this.visibility = FULLY_VISIBLE_MASK;
            return;
        }
        if (this.chunkData.isFilled()) {
            this.visibility.clear();
            return;
        }

        for (const face of faces) {
            VISITED.fill(0);
            STACK.fill(0);

            let stackPtr = 0;

            // Start floodfilling!

            // First, add all blocks available in the queue

            const faceBlocks = visibilityFaceBlocks.get(face)!;

            for (const block of faceBlocks) {
                const density = this.chunkData.densityAtIndex(block);
                if (!density) continue;
                if (density < ISOLEVEL) {
                    STACK[stackPtr++] = block;
                    VISITED[block] = 1;
                }
            }
            // Loop through until we know all exposed faces, then create pairs
            const exposedFaces: Set<Face> = new Set();

            // Floodfill
            while (stackPtr > 0) {
                const idx = STACK[--stackPtr]!;

                const x = (idx / 1024) | 0;
                const y = (idx >> 5) & 31; // Fast bitwise version of (idx/32)%32
                const z = idx & 31; // Fast bitwise version of idx%32

                if (x == 0) exposedFaces.add(Face.LEFT);
                if (x == CHUNK_SIZE - 1) exposedFaces.add(Face.RIGHT);
                if (y == 0) exposedFaces.add(Face.BOTTOM);
                if (y == CHUNK_SIZE - 1) exposedFaces.add(Face.TOP);
                if (z == 0) exposedFaces.add(Face.BACK);
                if (z == CHUNK_SIZE - 1) exposedFaces.add(Face.FRONT);

                if (x < 31) {
                    const n = idx + 1024;
                    if (
                        !VISITED[n] &&
                        this.chunkData.densityAtIndex(n)! < ISOLEVEL
                    ) {
                        VISITED[n] = 1;
                        STACK[stackPtr++] = n;
                    }
                }
                if (x > 0) {
                    const n = idx - 1024;
                    if (
                        !VISITED[n] &&
                        this.chunkData.densityAtIndex(n)! < ISOLEVEL
                    ) {
                        VISITED[n] = 1;
                        STACK[stackPtr++] = n;
                    }
                }
                // Y neighbors (+/- 32)
                if (y < 31) {
                    const n = idx + 32;
                    if (
                        !VISITED[n] &&
                        this.chunkData.densityAtIndex(n)! < ISOLEVEL
                    ) {
                        VISITED[n] = 1;
                        STACK[stackPtr++] = n;
                    }
                }
                if (y > 0) {
                    const n = idx - 32;
                    if (
                        !VISITED[n] &&
                        this.chunkData.densityAtIndex(n)! < ISOLEVEL
                    ) {
                        VISITED[n] = 1;
                        STACK[stackPtr++] = n;
                    }
                }
                // Z neighbors (+/- 1)
                if (z < 31) {
                    const n = idx + 1;
                    if (
                        !VISITED[n] &&
                        this.chunkData.densityAtIndex(n)! < ISOLEVEL
                    ) {
                        VISITED[n] = 1;
                        STACK[stackPtr++] = n;
                    }
                }
                if (z > 0) {
                    const n = idx - 1;
                    if (
                        !VISITED[n] &&
                        this.chunkData.densityAtIndex(n)! < ISOLEVEL
                    ) {
                        VISITED[n] = 1;
                        STACK[stackPtr++] = n;
                    }
                }
            }

            // Create pairs

            for (const face1 of exposedFaces) {
                for (const face2 of exposedFaces) {
                    if (face1 != face2) {
                        if (!this.visibility.has(face1)) {
                            this.visibility.set(face1, new Set());
                        }
                        this.visibility.get(face1)!.add(face2);
                    }
                }
            }
        }
    }

    getVisibilityMap() {
        return this.visibility;
    }

    flushChanges() {
        this.chunkData.flushPaletteChanges();
        this.computeVisibilityMask();
    }
}
