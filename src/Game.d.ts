export declare class Game {
    private scene;
    private camera;
    private renderer;
    private testMesh;
    private controls;
    private worldChunks;
    private physicsWorld;
    private sky;
    constructor();
    asyncInit(): Promise<void>;
    initialize(): Promise<void>;
    private updateSkyPosition;
    private render;
    private tick;
    renderLoop(): void;
}
//# sourceMappingURL=Game.d.ts.map