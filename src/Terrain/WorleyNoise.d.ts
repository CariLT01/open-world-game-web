export declare class WorleyNoise {
    private seed;
    constructor(seed?: number);
    private getPointInCell3D;
    /**
     * Returns a value between 0 and 1, where 0 is the "ridge" (edge)
     * and 1 is the center of a Voronoi cell.
     */
    getEdgeValue(x: number, y: number, z: number, scale?: number): number;
}
//# sourceMappingURL=WorleyNoise.d.ts.map