import type { Vector3 } from "../Core/Vector3";
export type MaterialIndex = number & {
    readonly __brand: "MaterialIndex";
};
export type PaletteIndex = number & {
    readonly __brand: "PaletteIndex";
};
export type BlockData = {
    material: MaterialIndex;
    properties: Map<String, any>;
    hash: number;
};
export declare class ChunkData {
    private densitiesBuffer;
    private materialsBuffer;
    private densities;
    private materials;
    private queuedMaterials;
    private queuedMaterialsHashes;
    private queuedMaterialsSet;
    private palette;
    private paletteReverseMap;
    private frozenDensities;
    private frozenMaterials;
    private isFrozen;
    constructor();
    private _getIndexFromBlockPosition;
    densityAtIndex(i: number): number | undefined;
    freeze(): void;
    unfreeze(): void;
    isEmpty(): boolean;
    isFilled(): boolean;
    getIsFrozen(): boolean;
    private checkFrozen;
    flushPaletteChanges(): void;
    setBlockAt(position: Vector3, density: number, material: BlockData, flushChanges: boolean): void;
    getBlockAt(position: Vector3): PaletteIndex;
    getMaterialWithPaletteIndex(i: PaletteIndex): BlockData | undefined;
    getDensityAt(position: Vector3): number;
}
//# sourceMappingURL=ChunkData.d.ts.map