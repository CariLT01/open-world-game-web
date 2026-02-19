type Point = { x: number; y: number };

export class QuadraticSpline {
    private xs: number[];
    private a: number[] = []; // constant term
    private b: number[] = []; // linear term
    private c: number[] = []; // quadratic term

    constructor(points: Point[]) {
        if (points.length < 2) {
            throw new Error("Need at least two points");
        }

        this.xs = points.map(p => p.x);
        const ys = points.map(p => p.y);

        const n = points.length - 1;

        // Slopes between points
        const m: number[] = [];
        for (let i = 0; i < n; i++) {
            m[i] = (ys[i + 1]! - ys[i]!) / (this.xs[i + 1]! - this.xs[i]!);
        }

        // First derivative at knots (simple approach)
        const d: number[] = [];
        d[0] = m[0]!;
        for (let i = 1; i < n; i++) {
            d[i] = 0.5 * (m[i - 1]! + m[i]!);
        }
        d[n] = m[n - 1]!;

        // Build quadratic pieces
        for (let i = 0; i < n; i++) {
            const dx = this.xs[i + 1]! - this.xs[i]!;

            this.a[i] = ys[i]!;
            this.b[i] = d[i]!;
            this.c[i] = (ys[i + 1]! - ys[i]! - d[i]! * dx) / (dx * dx);
        }
    }

    evaluate(x: number): number {
        // Find segment
        let i = this.xs.length - 2;
        for (let j = 0; j < this.xs.length - 1; j++) {
            if (x >= this.xs[j]! && x <= this.xs[j + 1]!) {
                i = j;
                break;
            }
        }

        const t = x - this.xs[i]!;
        return this.a[i]! + this.b[i]! * t + this.c[i]! * t * t;
    }
}