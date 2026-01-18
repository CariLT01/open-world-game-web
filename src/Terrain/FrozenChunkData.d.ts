type TypedArray = Float32Array | Float64Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;
type TypedArrayConstructor<T extends TypedArray> = {
    new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): T;
    BYTES_PER_ELEMENT: number;
};
export declare class FrozenChunkData<T extends TypedArray> {
    private typeConstructor;
    private valuesBuffer;
    private valuesTypedArray;
    private indexesBuffer;
    private indexesUint16;
    private active;
    private bytesPerBlock;
    constructor(numBytesPerBlock: number, typeConstructor: TypedArrayConstructor<T>);
    freeze(dataFloat32: T): void;
    unfreeze(bufferToWrite: T): T;
    getSpaceTaken(): number;
}
export {};
//# sourceMappingURL=FrozenChunkData.d.ts.map