import { SimplexNoise } from "three/examples/jsm/Addons.js";
import { Vector3 } from "../Core/Vector3";
import { Chunk, CHUNK_SIZE } from "./Chunk";
import type { MaterialIndex } from "./ChunkData";

export class TerrainGenerator {
    private simplex: SimplexNoise = new SimplexNoise();

    constructor() {}

    private _fractalNoise3D(
        x: number,
        y: number,
        z: number,
        octaves = 5,
        persistence = 0.5,
        lacunarity = 2.0
    ) {
        let amplitude = 1;
        let frequency = 1;
        let noiseValue = 0;
        let maxAmplitude = 0;

        for (let i = 0; i < octaves; i++) {
            noiseValue +=
                this.simplex.noise3d(
                    x * frequency,
                    y * frequency,
                    z * frequency
                ) * amplitude;
            maxAmplitude += amplitude;

            amplitude *= persistence;
            frequency *= lacunarity;
        }

        return noiseValue / maxAmplitude; // normalized to ~ -1..1
    }

    private _fractalNoise2D(
        x: number,
        z: number,
        octaves = 5,
        persistence = 0.5,
        lacunarity = 2.0
    ) {
        let amplitude = 1;
        let frequency = 1;
        let noiseValue = 0;
        let maxAmplitude = 0;

        for (let i = 0; i < octaves; i++) {
            noiseValue +=
                this.simplex.noise(x * frequency, z * frequency) * amplitude;
            maxAmplitude += amplitude;

            amplitude *= persistence;
            frequency *= lacunarity;
        }

        return noiseValue / maxAmplitude; // normalized to ~ -1..1
    }

    private _generateNoiseGrid(
        chunkPosition: Vector3,
        scalar: Vector3,
        stepSize: number = 4,
        octaves = 5,
        persistence = 0.5,
        lacunarity = 2.0
    ) {
        const grid: { [key: string]: number } = {};

        for (let x = 0; x <= CHUNK_SIZE; x += stepSize) {
            for (let y = 0; y <= CHUNK_SIZE; y += stepSize) {
                for (let z = 0; z <= CHUNK_SIZE; z += stepSize) {
                    const v = new Vector3(
                        x + chunkPosition.x * CHUNK_SIZE,
                        y + chunkPosition.y * CHUNK_SIZE,
                        z + chunkPosition.z * CHUNK_SIZE
                    ).mul(scalar);

                    grid[`${x},${y},${z}`] = this._fractalNoise3D(
                        v.x,
                        v.y,
                        v.z,
                        octaves,
                        persistence,
                        lacunarity
                    );
                }
            }
        }

        return grid;
    }

    private _generateNoiseGrid2D(
        chunkPosition: Vector3,
        scalar: Vector3,
        stepSize: number = 4,
        octaves = 5,
        persistence = 0.5,
        lacunarity = 2.0
    ) {
        const grid: { [key: string]: number } = {};

        for (let x = 0; x <= CHUNK_SIZE; x += stepSize) {
            for (let z = 0; z <= CHUNK_SIZE; z += stepSize) {
                const v = new Vector3(
                    x + chunkPosition.x * CHUNK_SIZE,
                    0,
                    z + chunkPosition.z * CHUNK_SIZE
                ).mul(scalar);

                grid[`${x},${z}`] = this._fractalNoise2D(
                    v.x,
                    v.z,
                    octaves,
                    persistence,
                    lacunarity
                );
            }
        }

        return grid;
    }

    private _lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    private _trilinearInterpolation(
        grid: { [key: string]: number },
        x: number,
        y: number,
        z: number,
        step: number
    ) {
        const x0 = Math.floor(x / step) * step;
        const x1 = x0 + step;
        const y0 = Math.floor(y / step) * step;
        const y1 = y0 + step;
        const z0 = Math.floor(z / step) * step;
        const z1 = z0 + step;

        const xd = (x - x0) / step;
        const yd = (y - y0) / step;
        const zd = (z - z0) / step;

        // Fetch the 8 corners
        const c000 = grid[`${x0},${y0},${z0}`]!;
        const c100 = grid[`${x1},${y0},${z0}`]!;
        const c010 = grid[`${x0},${y1},${z0}`]!;
        const c110 = grid[`${x1},${y1},${z0}`]!;
        const c001 = grid[`${x0},${y0},${z1}`]!;
        const c101 = grid[`${x1},${y0},${z1}`]!;
        const c011 = grid[`${x0},${y1},${z1}`]!;
        const c111 = grid[`${x1},${y1},${z1}`]!;

        // Interpolate along x
        const c00 = this._lerp(c000, c100, xd);
        const c10 = this._lerp(c010, c110, xd);
        const c01 = this._lerp(c001, c101, xd);
        const c11 = this._lerp(c011, c111, xd);

        // Interpolate along y
        const c0 = this._lerp(c00, c10, yd);
        const c1 = this._lerp(c01, c11, yd);

        // Interpolate along z
        return this._lerp(c0, c1, zd);
    }

    private _bilinearInterpolation(
        grid: { [key: string]: number },
        x: number,
        y: number,
        step: number
    ) {
        // Find surrounding grid points
        const x0 = Math.floor(x / step) * step;
        const x1 = x0 + step;
        const y0 = Math.floor(y / step) * step;
        const y1 = y0 + step;

        // Interpolation weights
        const tx = (x - x0) / step;
        const ty = (y - y0) / step;

        // Fetch the 4 corners
        const c00 = grid[`${x0},${y0}`]!;
        const c10 = grid[`${x1},${y0}`]!;
        const c01 = grid[`${x0},${y1}`]!;
        const c11 = grid[`${x1},${y1}`]!;

        // Interpolate along x
        const c0 = c00 + (c10 - c00) * tx;
        const c1 = c01 + (c11 - c01) * tx;

        // Interpolate along y
        return c0 + (c1 - c0) * ty;
    }

    private _evaluateCurve(points: Map<number, number>, t: number) {
        // Ensure t is in 0..1
        t = Math.min(Math.max(t, 0), 1);

        const keys = Array.from(points.keys()).sort((a, b) => a - b)!;

        // If t is outside the range, clamp
        if (t <= keys[0]!) return points.get(keys[0]!)!;
        if (t >= keys[keys.length - 1]!)
            return points.get(keys[keys.length - 1]!)!;

        // Find the segment t is in
        for (let i = 0; i < keys.length - 1; i++) {
            const k0 = keys[i]!;
            const k1 = keys[i + 1]!;

            if (t >= k0 && t <= k1) {
                const v0 = points.get(k0)!;
                const v1 = points.get(k1)!;
                const alpha = (t - k0) / (k1 - k0); // 0..1 between k0 and k1
                return v0 + (v1 - v0) * alpha;
            }
        }

        return 0; // fallback
    }

    generateTerrainOf(chunk: Chunk, chunkPosition: Vector3) {
        const surfaceThickness = 5;

        const plateauSpline = new Map([
            [0, 0],
            [0.1, 0.05],
            [0.3, 0.2],
            [0.45, 0.4],
            [0.5, 0.8],
            [0.8, 1.0],
            [1.0, 0.9],
        ]);

        const peaksAndValleysSpline = new Map([
            [0, 1.0],
            [0.3, 0.77],
            [0.5, 0.3],
            [0.6, 0],
            [0.7, 0.4],
            [0.75, 0.7],
            [0.8, 0.75],
            [1.0, 0.77],
        ]);

        const continentalNessSpline = new Map([
            [0, 0.0],
            [0.3, 0.2],
            [0.5, 0.7],
            [0.6, 0.9],
            [0.8, 0.95],
            [1.0, 1.0]
        ]);

        const erosionSpline = new Map([
            [0, 1.0],
            [0.3, 0.77],
            [0.5, 0.4],
            [0.6, 0.3],
            [0.7, 0.2],
            [0.75, 0.3],
            [0.8, 0.75],
            [1.0, 0.77]
        ]) 

        // const grid = this._generateNoiseGrid(chunkPosition, new Vector3(1 / 50, 1 / 50, 1 / 50), 2);

        const lowResGrid = this._generateNoiseGrid2D(
            chunkPosition,
            new Vector3(1 / 700, 1 / 700, 1 / 700),
            8,
            4
        );

        const lowResContinentalness = this._generateNoiseGrid2D(
            chunkPosition,
            new Vector3(1 / 2000, 1 / 2000, 1 / 2000),
            16,
            3
        );

        const ersionLowRes = this._generateNoiseGrid2D(
            chunkPosition,
            new Vector3(1 / 1500, 1 / 1500, 1 / 1500),
            16,
            3
        )
        

        for (let x = 0; x < CHUNK_SIZE; x++) {
            for (let z = 0; z < CHUNK_SIZE; z++) {
                const worldX = chunkPosition.x * CHUNK_SIZE + x;
                const worldZ = chunkPosition.z * CHUNK_SIZE + z;

                const baseHeightRaw =
                    (this._bilinearInterpolation(lowResGrid, x, z, 8) + 1) / 2;
                const baseHeight = this._evaluateCurve(
                    plateauSpline,
                    baseHeightRaw
                );
                const fineDetailRaw =
                    (this._fractalNoise2D(worldX / 300, worldZ / 300, 3) + 1) /
                    2;
                const fineDetail = this._evaluateCurve(
                    peaksAndValleysSpline,
                    fineDetailRaw
                );
                const continentalnessRaw = 
                (this._bilinearInterpolation(lowResContinentalness, x, z, 16) + 1) / 2;
                
                const continentalness = this._evaluateCurve(continentalNessSpline, continentalnessRaw);


                const erionRaw = (this._bilinearInterpolation(ersionLowRes, x, z, 16) + 1) / 2;
                const erosion = this._evaluateCurve(erosionSpline, erionRaw);

                const terrainHeight =
                    ((baseHeight * 0.6 + fineDetail * 0.4) * (continentalness * 0.6 + erosion * 0.4)) * 150;

                for (let y = 0; y < CHUNK_SIZE; y++) {
                    const worldY = chunkPosition.y * CHUNK_SIZE + y;

                    if (worldY < terrainHeight - 7) {
                        const density = 1.0
                        //const density = Math.random();

                        chunk.setDensityAndMaterialAt(
                            new Vector3(x, y, z),
                            density,
                            {
                                material: 3 as MaterialIndex,
                                properties: new Map(),
                                hash: 12938,
                            }
                        );
                    } else if (worldY < terrainHeight - 4) {
                        const density = 1.0
                        //const density = Math.random();

                        chunk.setDensityAndMaterialAt(
                            new Vector3(x, y, z),
                            density,
                            {
                                material: 2 as MaterialIndex,
                                properties: new Map(),
                                hash: 472918,
                            }
                        );
                    } else if (worldY < terrainHeight) {
                        const density = Math.max(
                            0,
                            ((terrainHeight) - worldY) / surfaceThickness
                        );
                        //const density = Math.random();

                        chunk.setDensityAndMaterialAt(
                            new Vector3(x, y, z),
                            density,
                            {
                                material: 1 as MaterialIndex,
                                properties: new Map(),
                                hash: 34432,
                            }
                        );
                    }
                }
            }
        }

        chunk.flushChanges();
    }
}
