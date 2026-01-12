import { Vector3 } from "../Core/Vector3";
import { Chunk } from "./Chunk";
export declare class TerrainGenerator {
    private simplex;
    constructor();
    private _fractalNoise3D;
    private _fractalNoise2D;
    private _generateNoiseGrid;
    private _generateNoiseGrid2D;
    private _lerp;
    private _trilinearInterpolation;
    private _bilinearInterpolation;
    private _evaluateCurve;
    generateTerrainOf(chunk: Chunk, chunkPosition: Vector3): void;
}
//# sourceMappingURL=TerrainGenerator.d.ts.map