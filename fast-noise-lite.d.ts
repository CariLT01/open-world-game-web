declare module "fastnoise-lite" {
    type NoiseType = number;
    type FractalType = number;

    export default class FastNoiseLite {
        constructor();
        SetSeed(seed: number): void;
        SetNoiseType(type: NoiseType): void;
        SetFrequency(freq: number): void;
        SetFractalType(type: FractalType): void;
        SetFractalOctaves(octaves: number): void;
        SetFractalGain(gain: number): void;
        SetFractalLacunarity(lac: number): void;

        GetNoise2D(x: number, y: number): number;
        GetNoise3D(x: number, y: number, z: number): number;
    }

    export const NoiseType: Record<string, number>;
    export const FractalType: Record<string, number>;
}