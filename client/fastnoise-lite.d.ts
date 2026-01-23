declare module 'fastnoise-lite' {
  export enum NoiseType {
    OpenSimplex2,
    OpenSimplex2S,
    Cellular,
    Perlin,
    ValueCubic,
    Value
  }

  export enum FractalType {
    None,
    FBm,
    Ridged,
    PingPong,
    DomainWarpProgressive,
    DomainWarpIndependent
  }

  export default class FastNoiseLite {
    constructor(seed?: number);
    setSeed(seed: number): void;
    setFrequency(freq: number): void;
    setNoiseType(type: NoiseType): void;
    setFractalType(type: FractalType): void;
    setFractalOctaves(octaves: number): void;
    setFractalLacunarity(lacunarity: number): void;
    setFractalGain(gain: number): void;
    getNoise(x: number, y: number, z?: number): number;
  }
}