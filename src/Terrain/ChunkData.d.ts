import type { Vector3 } from "../Core/Vector3";
export type MaterialIndex = number & {
    readonly __brand: "MaterialIndex";
};
export type BlockData = {
    material: MaterialIndex;
    properties: Map<String, any>;
    hash: number;
};
export declare class ChunkData {
    private densities;
    private materials;
    private queuedMaterials;
    private queuedMaterialsSet;
    private palette;
    private paletteReverseMap;
    constructor();
    private _getIndexFromBlockPosition;
    flushPaletteChanges(): void;
    setBlockAt(position: Vector3, density: number, material: BlockData, flushChanges: boolean): void;
    getBlockAt(position: Vector3): number;
    getDensityAt(position: Vector3): number;
}
//# sourceMappingURL=ChunkData.d.ts.map