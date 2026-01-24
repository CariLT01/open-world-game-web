import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace game. */
export namespace game {

    /** Properties of a Vec3f. */
    interface IVec3f {

        /** Vec3f x */
        x?: (number|null);

        /** Vec3f y */
        y?: (number|null);

        /** Vec3f z */
        z?: (number|null);
    }

    /** Represents a Vec3f. */
    class Vec3f implements IVec3f {

        /**
         * Constructs a new Vec3f.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IVec3f);

        /** Vec3f x. */
        public x: number;

        /** Vec3f y. */
        public y: number;

        /** Vec3f z. */
        public z: number;

        /**
         * Creates a new Vec3f instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vec3f instance
         */
        public static create(properties?: game.IVec3f): game.Vec3f;

        /**
         * Encodes the specified Vec3f message. Does not implicitly {@link game.Vec3f.verify|verify} messages.
         * @param message Vec3f message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IVec3f, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vec3f message, length delimited. Does not implicitly {@link game.Vec3f.verify|verify} messages.
         * @param message Vec3f message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IVec3f, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vec3f message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Vec3f
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Vec3f;

        /**
         * Decodes a Vec3f message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Vec3f
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Vec3f;

        /**
         * Verifies a Vec3f message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vec3f message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vec3f
         */
        public static fromObject(object: { [k: string]: any }): game.Vec3f;

        /**
         * Creates a plain object from a Vec3f message. Also converts values to other types if specified.
         * @param message Vec3f
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.Vec3f, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vec3f to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Vec3f
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Vec3i. */
    interface IVec3i {

        /** Vec3i x */
        x?: (number|null);

        /** Vec3i y */
        y?: (number|null);

        /** Vec3i z */
        z?: (number|null);
    }

    /** Represents a Vec3i. */
    class Vec3i implements IVec3i {

        /**
         * Constructs a new Vec3i.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IVec3i);

        /** Vec3i x. */
        public x: number;

        /** Vec3i y. */
        public y: number;

        /** Vec3i z. */
        public z: number;

        /**
         * Creates a new Vec3i instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vec3i instance
         */
        public static create(properties?: game.IVec3i): game.Vec3i;

        /**
         * Encodes the specified Vec3i message. Does not implicitly {@link game.Vec3i.verify|verify} messages.
         * @param message Vec3i message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IVec3i, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vec3i message, length delimited. Does not implicitly {@link game.Vec3i.verify|verify} messages.
         * @param message Vec3i message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IVec3i, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vec3i message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Vec3i
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.Vec3i;

        /**
         * Decodes a Vec3i message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Vec3i
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.Vec3i;

        /**
         * Verifies a Vec3i message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vec3i message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vec3i
         */
        public static fromObject(object: { [k: string]: any }): game.Vec3i;

        /**
         * Creates a plain object from a Vec3i message. Also converts values to other types if specified.
         * @param message Vec3i
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.Vec3i, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vec3i to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Vec3i
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PropertyData. */
    interface IPropertyData {

        /** PropertyData type */
        type?: (string|null);

        /** PropertyData value */
        value?: (string|null);
    }

    /** Represents a PropertyData. */
    class PropertyData implements IPropertyData {

        /**
         * Constructs a new PropertyData.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPropertyData);

        /** PropertyData type. */
        public type: string;

        /** PropertyData value. */
        public value: string;

        /**
         * Creates a new PropertyData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PropertyData instance
         */
        public static create(properties?: game.IPropertyData): game.PropertyData;

        /**
         * Encodes the specified PropertyData message. Does not implicitly {@link game.PropertyData.verify|verify} messages.
         * @param message PropertyData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPropertyData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PropertyData message, length delimited. Does not implicitly {@link game.PropertyData.verify|verify} messages.
         * @param message PropertyData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPropertyData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PropertyData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PropertyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PropertyData;

        /**
         * Decodes a PropertyData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PropertyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PropertyData;

        /**
         * Verifies a PropertyData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PropertyData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PropertyData
         */
        public static fromObject(object: { [k: string]: any }): game.PropertyData;

        /**
         * Creates a plain object from a PropertyData message. Also converts values to other types if specified.
         * @param message PropertyData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PropertyData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PropertyData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PropertyData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PaletteData. */
    interface IPaletteData {

        /** PaletteData attributes */
        attributes?: ({ [k: string]: game.IPropertyData }|null);

        /** PaletteData materialIndex */
        materialIndex?: (number|null);

        /** PaletteData hash */
        hash?: (number|null);
    }

    /** Represents a PaletteData. */
    class PaletteData implements IPaletteData {

        /**
         * Constructs a new PaletteData.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPaletteData);

        /** PaletteData attributes. */
        public attributes: { [k: string]: game.IPropertyData };

        /** PaletteData materialIndex. */
        public materialIndex: number;

        /** PaletteData hash. */
        public hash: number;

        /**
         * Creates a new PaletteData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PaletteData instance
         */
        public static create(properties?: game.IPaletteData): game.PaletteData;

        /**
         * Encodes the specified PaletteData message. Does not implicitly {@link game.PaletteData.verify|verify} messages.
         * @param message PaletteData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPaletteData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PaletteData message, length delimited. Does not implicitly {@link game.PaletteData.verify|verify} messages.
         * @param message PaletteData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPaletteData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PaletteData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PaletteData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PaletteData;

        /**
         * Decodes a PaletteData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PaletteData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PaletteData;

        /**
         * Verifies a PaletteData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PaletteData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PaletteData
         */
        public static fromObject(object: { [k: string]: any }): game.PaletteData;

        /**
         * Creates a plain object from a PaletteData message. Also converts values to other types if specified.
         * @param message PaletteData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PaletteData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PaletteData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PaletteData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ChunkData. */
    interface IChunkData {

        /** ChunkData palette */
        palette?: (game.IPaletteData[]|null);

        /** ChunkData materialsData */
        materialsData?: (number[]|null);

        /** ChunkData densitiesData */
        densitiesData?: (number[]|null);

        /** ChunkData chunkPosition */
        chunkPosition?: (game.IVec3i|null);
    }

    /** Represents a ChunkData. */
    class ChunkData implements IChunkData {

        /**
         * Constructs a new ChunkData.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IChunkData);

        /** ChunkData palette. */
        public palette: game.IPaletteData[];

        /** ChunkData materialsData. */
        public materialsData: number[];

        /** ChunkData densitiesData. */
        public densitiesData: number[];

        /** ChunkData chunkPosition. */
        public chunkPosition?: (game.IVec3i|null);

        /**
         * Creates a new ChunkData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChunkData instance
         */
        public static create(properties?: game.IChunkData): game.ChunkData;

        /**
         * Encodes the specified ChunkData message. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @param message ChunkData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IChunkData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChunkData message, length delimited. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @param message ChunkData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IChunkData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChunkData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ChunkData;

        /**
         * Decodes a ChunkData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ChunkData;

        /**
         * Verifies a ChunkData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChunkData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChunkData
         */
        public static fromObject(object: { [k: string]: any }): game.ChunkData;

        /**
         * Creates a plain object from a ChunkData message. Also converts values to other types if specified.
         * @param message ChunkData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.ChunkData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChunkData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ChunkData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LoadChunkRequest. */
    interface ILoadChunkRequest {

        /** LoadChunkRequest chunkPosition */
        chunkPosition?: (game.IVec3i|null);
    }

    /** Represents a LoadChunkRequest. */
    class LoadChunkRequest implements ILoadChunkRequest {

        /**
         * Constructs a new LoadChunkRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.ILoadChunkRequest);

        /** LoadChunkRequest chunkPosition. */
        public chunkPosition?: (game.IVec3i|null);

        /**
         * Creates a new LoadChunkRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoadChunkRequest instance
         */
        public static create(properties?: game.ILoadChunkRequest): game.LoadChunkRequest;

        /**
         * Encodes the specified LoadChunkRequest message. Does not implicitly {@link game.LoadChunkRequest.verify|verify} messages.
         * @param message LoadChunkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.ILoadChunkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoadChunkRequest message, length delimited. Does not implicitly {@link game.LoadChunkRequest.verify|verify} messages.
         * @param message LoadChunkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.ILoadChunkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoadChunkRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoadChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.LoadChunkRequest;

        /**
         * Decodes a LoadChunkRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoadChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.LoadChunkRequest;

        /**
         * Verifies a LoadChunkRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoadChunkRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoadChunkRequest
         */
        public static fromObject(object: { [k: string]: any }): game.LoadChunkRequest;

        /**
         * Creates a plain object from a LoadChunkRequest message. Also converts values to other types if specified.
         * @param message LoadChunkRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.LoadChunkRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoadChunkRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LoadChunkRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerMoveData. */
    interface IPlayerMoveData {

        /** PlayerMoveData position */
        position?: (game.IVec3f|null);

        /** PlayerMoveData name */
        name?: (string|null);
    }

    /** Represents a PlayerMoveData. */
    class PlayerMoveData implements IPlayerMoveData {

        /**
         * Constructs a new PlayerMoveData.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPlayerMoveData);

        /** PlayerMoveData position. */
        public position?: (game.IVec3f|null);

        /** PlayerMoveData name. */
        public name: string;

        /**
         * Creates a new PlayerMoveData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerMoveData instance
         */
        public static create(properties?: game.IPlayerMoveData): game.PlayerMoveData;

        /**
         * Encodes the specified PlayerMoveData message. Does not implicitly {@link game.PlayerMoveData.verify|verify} messages.
         * @param message PlayerMoveData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPlayerMoveData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerMoveData message, length delimited. Does not implicitly {@link game.PlayerMoveData.verify|verify} messages.
         * @param message PlayerMoveData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPlayerMoveData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PlayerMoveData;

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PlayerMoveData;

        /**
         * Verifies a PlayerMoveData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerMoveData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerMoveData
         */
        public static fromObject(object: { [k: string]: any }): game.PlayerMoveData;

        /**
         * Creates a plain object from a PlayerMoveData message. Also converts values to other types if specified.
         * @param message PlayerMoveData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PlayerMoveData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerMoveData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerMoveData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerJoin. */
    interface IPlayerJoin {

        /** PlayerJoin name */
        name?: (string|null);
    }

    /** Represents a PlayerJoin. */
    class PlayerJoin implements IPlayerJoin {

        /**
         * Constructs a new PlayerJoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPlayerJoin);

        /** PlayerJoin name. */
        public name: string;

        /**
         * Creates a new PlayerJoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerJoin instance
         */
        public static create(properties?: game.IPlayerJoin): game.PlayerJoin;

        /**
         * Encodes the specified PlayerJoin message. Does not implicitly {@link game.PlayerJoin.verify|verify} messages.
         * @param message PlayerJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPlayerJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerJoin message, length delimited. Does not implicitly {@link game.PlayerJoin.verify|verify} messages.
         * @param message PlayerJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPlayerJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerJoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PlayerJoin;

        /**
         * Decodes a PlayerJoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PlayerJoin;

        /**
         * Verifies a PlayerJoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerJoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerJoin
         */
        public static fromObject(object: { [k: string]: any }): game.PlayerJoin;

        /**
         * Creates a plain object from a PlayerJoin message. Also converts values to other types if specified.
         * @param message PlayerJoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PlayerJoin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerJoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerJoin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerLeave. */
    interface IPlayerLeave {

        /** PlayerLeave name */
        name?: (string|null);
    }

    /** Represents a PlayerLeave. */
    class PlayerLeave implements IPlayerLeave {

        /**
         * Constructs a new PlayerLeave.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IPlayerLeave);

        /** PlayerLeave name. */
        public name: string;

        /**
         * Creates a new PlayerLeave instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerLeave instance
         */
        public static create(properties?: game.IPlayerLeave): game.PlayerLeave;

        /**
         * Encodes the specified PlayerLeave message. Does not implicitly {@link game.PlayerLeave.verify|verify} messages.
         * @param message PlayerLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IPlayerLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerLeave message, length delimited. Does not implicitly {@link game.PlayerLeave.verify|verify} messages.
         * @param message PlayerLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IPlayerLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerLeave message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.PlayerLeave;

        /**
         * Decodes a PlayerLeave message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.PlayerLeave;

        /**
         * Verifies a PlayerLeave message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerLeave message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerLeave
         */
        public static fromObject(object: { [k: string]: any }): game.PlayerLeave;

        /**
         * Creates a plain object from a PlayerLeave message. Also converts values to other types if specified.
         * @param message PlayerLeave
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.PlayerLeave, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerLeave to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerLeave
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ItemStack. */
    interface IItemStack {

        /** ItemStack name */
        name?: (string|null);

        /** ItemStack count */
        count?: (number|null);

        /** ItemStack attributes */
        attributes?: ({ [k: string]: game.IPropertyData }|null);
    }

    /** Represents an ItemStack. */
    class ItemStack implements IItemStack {

        /**
         * Constructs a new ItemStack.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IItemStack);

        /** ItemStack name. */
        public name: string;

        /** ItemStack count. */
        public count: number;

        /** ItemStack attributes. */
        public attributes: { [k: string]: game.IPropertyData };

        /**
         * Creates a new ItemStack instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemStack instance
         */
        public static create(properties?: game.IItemStack): game.ItemStack;

        /**
         * Encodes the specified ItemStack message. Does not implicitly {@link game.ItemStack.verify|verify} messages.
         * @param message ItemStack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IItemStack, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ItemStack message, length delimited. Does not implicitly {@link game.ItemStack.verify|verify} messages.
         * @param message ItemStack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IItemStack, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ItemStack message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemStack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.ItemStack;

        /**
         * Decodes an ItemStack message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemStack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.ItemStack;

        /**
         * Verifies an ItemStack message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemStack message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemStack
         */
        public static fromObject(object: { [k: string]: any }): game.ItemStack;

        /**
         * Creates a plain object from an ItemStack message. Also converts values to other types if specified.
         * @param message ItemStack
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.ItemStack, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemStack to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ItemStack
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an InventorySync. */
    interface IInventorySync {

        /** InventorySync items */
        items?: (game.IItemStack[]|null);

        /** InventorySync holding */
        holding?: (game.IItemStack|null);
    }

    /** Represents an InventorySync. */
    class InventorySync implements IInventorySync {

        /**
         * Constructs a new InventorySync.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IInventorySync);

        /** InventorySync items. */
        public items: game.IItemStack[];

        /** InventorySync holding. */
        public holding?: (game.IItemStack|null);

        /**
         * Creates a new InventorySync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InventorySync instance
         */
        public static create(properties?: game.IInventorySync): game.InventorySync;

        /**
         * Encodes the specified InventorySync message. Does not implicitly {@link game.InventorySync.verify|verify} messages.
         * @param message InventorySync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IInventorySync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InventorySync message, length delimited. Does not implicitly {@link game.InventorySync.verify|verify} messages.
         * @param message InventorySync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IInventorySync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InventorySync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InventorySync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.InventorySync;

        /**
         * Decodes an InventorySync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InventorySync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.InventorySync;

        /**
         * Verifies an InventorySync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InventorySync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InventorySync
         */
        public static fromObject(object: { [k: string]: any }): game.InventorySync;

        /**
         * Creates a plain object from an InventorySync message. Also converts values to other types if specified.
         * @param message InventorySync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.InventorySync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InventorySync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for InventorySync
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an InventoryUpdate. */
    interface IInventoryUpdate {

        /** InventoryUpdate slot */
        slot?: (number|null);
    }

    /** Represents an InventoryUpdate. */
    class InventoryUpdate implements IInventoryUpdate {

        /**
         * Constructs a new InventoryUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IInventoryUpdate);

        /** InventoryUpdate slot. */
        public slot: number;

        /**
         * Creates a new InventoryUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InventoryUpdate instance
         */
        public static create(properties?: game.IInventoryUpdate): game.InventoryUpdate;

        /**
         * Encodes the specified InventoryUpdate message. Does not implicitly {@link game.InventoryUpdate.verify|verify} messages.
         * @param message InventoryUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IInventoryUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InventoryUpdate message, length delimited. Does not implicitly {@link game.InventoryUpdate.verify|verify} messages.
         * @param message InventoryUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IInventoryUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InventoryUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InventoryUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.InventoryUpdate;

        /**
         * Decodes an InventoryUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InventoryUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.InventoryUpdate;

        /**
         * Verifies an InventoryUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InventoryUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InventoryUpdate
         */
        public static fromObject(object: { [k: string]: any }): game.InventoryUpdate;

        /**
         * Creates a plain object from an InventoryUpdate message. Also converts values to other types if specified.
         * @param message InventoryUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.InventoryUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InventoryUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for InventoryUpdate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
