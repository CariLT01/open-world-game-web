import { CHUNK_SIZE } from "./Chunk";

type TypedArray = 
    | Float32Array | Float64Array 
    | Uint8Array   | Uint16Array | Uint32Array 
    | Int8Array    | Int16Array  | Int32Array;

type TypedArrayConstructor<T extends TypedArray> = {
    new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): T;
    BYTES_PER_ELEMENT: number;
};

export class FrozenChunkData<T extends TypedArray> {

    private valuesBuffer: ArrayBuffer;
    private valuesTypedArray: TypedArray;
    private indexesBuffer: ArrayBuffer = new ArrayBuffer(0, { maxByteLength: CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE * 2 });
    private indexesUint16: Uint16Array = new Uint16Array(this.indexesBuffer);

    private active: boolean = false;

    private bytesPerBlock: number;

    constructor(numBytesPerBlock: number, private typeConstructor: TypedArrayConstructor<T>) {
        this.bytesPerBlock = numBytesPerBlock;
        this.valuesBuffer = new ArrayBuffer(0, { maxByteLength: CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE * this.bytesPerBlock })
        this.valuesTypedArray = new typeConstructor(this.valuesBuffer);
    
        if (!this.valuesBuffer.resizable) {
            throw new Error("ArrayBuffer values is not resizable");
        }
        if (!this.indexesBuffer.resizable) {
            throw new Error("ArrayBuffer indexes is not resizable");
        } 
    }

    freeze(dataFloat32: T) {

        // Count number of indexes needed

        let indexes = 0;
        let previousNumber = -1;

        for (let i = 0; i < dataFloat32.length; i++) {

            const v = dataFloat32[i]!;

            if (v !== previousNumber) {
                indexes++;
                previousNumber = v;
            }
        }

        // Resize accordingly

        this.valuesBuffer.resize(indexes * this.bytesPerBlock);
        this.indexesBuffer.resize(indexes * 2);

        // Write data

        indexes = 0;
        previousNumber = -1;

        for (let i = 0; i < dataFloat32.length; i++) {
            const v = dataFloat32[i]!;


            if (v !== previousNumber) {
                this.valuesTypedArray[indexes] = v;
                this.indexesUint16[indexes] = i;
                indexes++;
                previousNumber = v;
            }
        }

        this.active = true;
    }

    unfreeze(bufferToWrite: T) {

        if (!this.active) {
            throw new Error("Cannot unfreeze when data is not frozen");
        }


        const values = this.valuesTypedArray;
        const starts = this.indexesUint16;
        const runCount = values.length;

        for (let b = 0; b < runCount; b++) {
            const start = starts[b];
            const end = (b + 1 < runCount) ? starts[b + 1] : bufferToWrite.length;
            const value = values[b]!;

            bufferToWrite.fill(value, start, end);
        }

        this.valuesBuffer.resize(0);
        this.indexesBuffer.resize(0);

        this.active = false;

        console.log("Unfreeze length of: ", bufferToWrite.length);

        return bufferToWrite;

    }

    getSpaceTaken() {
        return this.indexesBuffer.byteLength + this.valuesBuffer.byteLength;
    }
}