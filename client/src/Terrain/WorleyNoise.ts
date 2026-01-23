export class WorleyNoise {
    private seed: number;

    constructor(seed: number = Math.random()) {
        this.seed = seed;
    }

    // 3D Hash function
    private getPointInCell3D(cx: number, cy: number, cz: number) {
        // Using bitwise-friendly primes for a more stable hash than Math.sin
        const n = (cx * 127 + cy * 311 + cz * 743 + this.seed * 1000) | 0;
        let x = Math.sin(n) * 43758.5453;
        let y = Math.sin(n + 1) * 43758.5453;
        let z = Math.sin(n + 2) * 43758.5453;
        return {
            x: x - Math.floor(x),
            y: y - Math.floor(y),
            z: z - Math.floor(z)
        };
    }

    /**
     * Returns a value between 0 and 1, where 0 is the "ridge" (edge)
     * and 1 is the center of a Voronoi cell.
     */
    public getEdgeValue(x: number, y: number, z: number, scale: number = 1): number {
        const px = x * scale;
        const py = y * scale;
        const pz = z * scale;

        const cellX = Math.floor(px);
        const cellY = Math.floor(py);
        const cellZ = Math.floor(pz);

        let d1 = Infinity;
        let d2 = Infinity;

        // Check 3x3x3 neighborhood
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {
                    const nx = cellX + i;
                    const ny = cellY + j;
                    const nz = cellZ + k;

                    const point = this.getPointInCell3D(nx, ny, nz);

                    const dx = (nx + point.x) - px;
                    const dy = (ny + point.y) - py;
                    const dz = (nz + point.z) - pz;

                    const distSq = dx * dx + dy * dy + dz * dz;

                    // Standard Worley distance sorting
                    if (distSq < d1) {
                        d2 = d1;
                        d1 = distSq;
                    } else if (distSq < d2) {
                        d2 = distSq;
                    }
                }
            }
        }

        d1 = Math.sqrt(d1);
        d2 = Math.sqrt(d2);

        // Distance to edge is (d2 - d1). 
        // We clamp it to 1.0 because in a grid, d2-d1 rarely exceeds 1.0
        const edgeDist = d2 - d1;
        
        return Math.min(1.0, edgeDist);
    }
}