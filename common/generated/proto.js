/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.game = (function() {

    /**
     * Namespace game.
     * @exports game
     * @namespace
     */
    var game = {};

    game.Vec3f = (function() {

        /**
         * Properties of a Vec3f.
         * @memberof game
         * @interface IVec3f
         * @property {number|null} [x] Vec3f x
         * @property {number|null} [y] Vec3f y
         * @property {number|null} [z] Vec3f z
         */

        /**
         * Constructs a new Vec3f.
         * @memberof game
         * @classdesc Represents a Vec3f.
         * @implements IVec3f
         * @constructor
         * @param {game.IVec3f=} [properties] Properties to set
         */
        function Vec3f(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vec3f x.
         * @member {number} x
         * @memberof game.Vec3f
         * @instance
         */
        Vec3f.prototype.x = 0;

        /**
         * Vec3f y.
         * @member {number} y
         * @memberof game.Vec3f
         * @instance
         */
        Vec3f.prototype.y = 0;

        /**
         * Vec3f z.
         * @member {number} z
         * @memberof game.Vec3f
         * @instance
         */
        Vec3f.prototype.z = 0;

        /**
         * Creates a new Vec3f instance using the specified properties.
         * @function create
         * @memberof game.Vec3f
         * @static
         * @param {game.IVec3f=} [properties] Properties to set
         * @returns {game.Vec3f} Vec3f instance
         */
        Vec3f.create = function create(properties) {
            return new Vec3f(properties);
        };

        /**
         * Encodes the specified Vec3f message. Does not implicitly {@link game.Vec3f.verify|verify} messages.
         * @function encode
         * @memberof game.Vec3f
         * @static
         * @param {game.IVec3f} message Vec3f message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec3f.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            return writer;
        };

        /**
         * Encodes the specified Vec3f message, length delimited. Does not implicitly {@link game.Vec3f.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Vec3f
         * @static
         * @param {game.IVec3f} message Vec3f message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec3f.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vec3f message from the specified reader or buffer.
         * @function decode
         * @memberof game.Vec3f
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Vec3f} Vec3f
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec3f.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Vec3f();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.float();
                        break;
                    }
                case 2: {
                        message.y = reader.float();
                        break;
                    }
                case 3: {
                        message.z = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vec3f message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Vec3f
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Vec3f} Vec3f
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec3f.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vec3f message.
         * @function verify
         * @memberof game.Vec3f
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vec3f.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };

        /**
         * Creates a Vec3f message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Vec3f
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Vec3f} Vec3f
         */
        Vec3f.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Vec3f)
                return object;
            var message = new $root.game.Vec3f();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };

        /**
         * Creates a plain object from a Vec3f message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Vec3f
         * @static
         * @param {game.Vec3f} message Vec3f
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vec3f.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };

        /**
         * Converts this Vec3f to JSON.
         * @function toJSON
         * @memberof game.Vec3f
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vec3f.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Vec3f
         * @function getTypeUrl
         * @memberof game.Vec3f
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Vec3f.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.Vec3f";
        };

        return Vec3f;
    })();

    game.Vec3i = (function() {

        /**
         * Properties of a Vec3i.
         * @memberof game
         * @interface IVec3i
         * @property {number|null} [x] Vec3i x
         * @property {number|null} [y] Vec3i y
         * @property {number|null} [z] Vec3i z
         */

        /**
         * Constructs a new Vec3i.
         * @memberof game
         * @classdesc Represents a Vec3i.
         * @implements IVec3i
         * @constructor
         * @param {game.IVec3i=} [properties] Properties to set
         */
        function Vec3i(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vec3i x.
         * @member {number} x
         * @memberof game.Vec3i
         * @instance
         */
        Vec3i.prototype.x = 0;

        /**
         * Vec3i y.
         * @member {number} y
         * @memberof game.Vec3i
         * @instance
         */
        Vec3i.prototype.y = 0;

        /**
         * Vec3i z.
         * @member {number} z
         * @memberof game.Vec3i
         * @instance
         */
        Vec3i.prototype.z = 0;

        /**
         * Creates a new Vec3i instance using the specified properties.
         * @function create
         * @memberof game.Vec3i
         * @static
         * @param {game.IVec3i=} [properties] Properties to set
         * @returns {game.Vec3i} Vec3i instance
         */
        Vec3i.create = function create(properties) {
            return new Vec3i(properties);
        };

        /**
         * Encodes the specified Vec3i message. Does not implicitly {@link game.Vec3i.verify|verify} messages.
         * @function encode
         * @memberof game.Vec3i
         * @static
         * @param {game.IVec3i} message Vec3i message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec3i.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.z);
            return writer;
        };

        /**
         * Encodes the specified Vec3i message, length delimited. Does not implicitly {@link game.Vec3i.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.Vec3i
         * @static
         * @param {game.IVec3i} message Vec3i message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec3i.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vec3i message from the specified reader or buffer.
         * @function decode
         * @memberof game.Vec3i
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.Vec3i} Vec3i
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec3i.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.Vec3i();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.int32();
                        break;
                    }
                case 2: {
                        message.y = reader.int32();
                        break;
                    }
                case 3: {
                        message.z = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vec3i message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.Vec3i
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.Vec3i} Vec3i
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec3i.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vec3i message.
         * @function verify
         * @memberof game.Vec3i
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vec3i.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (!$util.isInteger(message.z))
                    return "z: integer expected";
            return null;
        };

        /**
         * Creates a Vec3i message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.Vec3i
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.Vec3i} Vec3i
         */
        Vec3i.fromObject = function fromObject(object) {
            if (object instanceof $root.game.Vec3i)
                return object;
            var message = new $root.game.Vec3i();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.z != null)
                message.z = object.z | 0;
            return message;
        };

        /**
         * Creates a plain object from a Vec3i message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.Vec3i
         * @static
         * @param {game.Vec3i} message Vec3i
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vec3i.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = message.z;
            return object;
        };

        /**
         * Converts this Vec3i to JSON.
         * @function toJSON
         * @memberof game.Vec3i
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vec3i.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Vec3i
         * @function getTypeUrl
         * @memberof game.Vec3i
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Vec3i.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.Vec3i";
        };

        return Vec3i;
    })();

    game.PropertyData = (function() {

        /**
         * Properties of a PropertyData.
         * @memberof game
         * @interface IPropertyData
         * @property {string|null} [type] PropertyData type
         * @property {string|null} [value] PropertyData value
         */

        /**
         * Constructs a new PropertyData.
         * @memberof game
         * @classdesc Represents a PropertyData.
         * @implements IPropertyData
         * @constructor
         * @param {game.IPropertyData=} [properties] Properties to set
         */
        function PropertyData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PropertyData type.
         * @member {string} type
         * @memberof game.PropertyData
         * @instance
         */
        PropertyData.prototype.type = "";

        /**
         * PropertyData value.
         * @member {string} value
         * @memberof game.PropertyData
         * @instance
         */
        PropertyData.prototype.value = "";

        /**
         * Creates a new PropertyData instance using the specified properties.
         * @function create
         * @memberof game.PropertyData
         * @static
         * @param {game.IPropertyData=} [properties] Properties to set
         * @returns {game.PropertyData} PropertyData instance
         */
        PropertyData.create = function create(properties) {
            return new PropertyData(properties);
        };

        /**
         * Encodes the specified PropertyData message. Does not implicitly {@link game.PropertyData.verify|verify} messages.
         * @function encode
         * @memberof game.PropertyData
         * @static
         * @param {game.IPropertyData} message PropertyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PropertyData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified PropertyData message, length delimited. Does not implicitly {@link game.PropertyData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PropertyData
         * @static
         * @param {game.IPropertyData} message PropertyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PropertyData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PropertyData message from the specified reader or buffer.
         * @function decode
         * @memberof game.PropertyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PropertyData} PropertyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PropertyData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PropertyData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.string();
                        break;
                    }
                case 2: {
                        message.value = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PropertyData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PropertyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PropertyData} PropertyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PropertyData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PropertyData message.
         * @function verify
         * @memberof game.PropertyData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PropertyData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a PropertyData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PropertyData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PropertyData} PropertyData
         */
        PropertyData.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PropertyData)
                return object;
            var message = new $root.game.PropertyData();
            if (object.type != null)
                message.type = String(object.type);
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a PropertyData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PropertyData
         * @static
         * @param {game.PropertyData} message PropertyData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PropertyData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = "";
                object.value = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this PropertyData to JSON.
         * @function toJSON
         * @memberof game.PropertyData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PropertyData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PropertyData
         * @function getTypeUrl
         * @memberof game.PropertyData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PropertyData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PropertyData";
        };

        return PropertyData;
    })();

    game.PaletteData = (function() {

        /**
         * Properties of a PaletteData.
         * @memberof game
         * @interface IPaletteData
         * @property {Object.<string,game.IPropertyData>|null} [attributes] PaletteData attributes
         * @property {number|null} [materialIndex] PaletteData materialIndex
         */

        /**
         * Constructs a new PaletteData.
         * @memberof game
         * @classdesc Represents a PaletteData.
         * @implements IPaletteData
         * @constructor
         * @param {game.IPaletteData=} [properties] Properties to set
         */
        function PaletteData(properties) {
            this.attributes = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PaletteData attributes.
         * @member {Object.<string,game.IPropertyData>} attributes
         * @memberof game.PaletteData
         * @instance
         */
        PaletteData.prototype.attributes = $util.emptyObject;

        /**
         * PaletteData materialIndex.
         * @member {number} materialIndex
         * @memberof game.PaletteData
         * @instance
         */
        PaletteData.prototype.materialIndex = 0;

        /**
         * Creates a new PaletteData instance using the specified properties.
         * @function create
         * @memberof game.PaletteData
         * @static
         * @param {game.IPaletteData=} [properties] Properties to set
         * @returns {game.PaletteData} PaletteData instance
         */
        PaletteData.create = function create(properties) {
            return new PaletteData(properties);
        };

        /**
         * Encodes the specified PaletteData message. Does not implicitly {@link game.PaletteData.verify|verify} messages.
         * @function encode
         * @memberof game.PaletteData
         * @static
         * @param {game.IPaletteData} message PaletteData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PaletteData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.attributes != null && Object.hasOwnProperty.call(message, "attributes"))
                for (var keys = Object.keys(message.attributes), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.game.PropertyData.encode(message.attributes[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.materialIndex != null && Object.hasOwnProperty.call(message, "materialIndex"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.materialIndex);
            return writer;
        };

        /**
         * Encodes the specified PaletteData message, length delimited. Does not implicitly {@link game.PaletteData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PaletteData
         * @static
         * @param {game.IPaletteData} message PaletteData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PaletteData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PaletteData message from the specified reader or buffer.
         * @function decode
         * @memberof game.PaletteData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PaletteData} PaletteData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PaletteData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PaletteData(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (message.attributes === $util.emptyObject)
                            message.attributes = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = $root.game.PropertyData.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.attributes[key] = value;
                        break;
                    }
                case 2: {
                        message.materialIndex = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PaletteData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PaletteData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PaletteData} PaletteData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PaletteData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PaletteData message.
         * @function verify
         * @memberof game.PaletteData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PaletteData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.attributes != null && message.hasOwnProperty("attributes")) {
                if (!$util.isObject(message.attributes))
                    return "attributes: object expected";
                var key = Object.keys(message.attributes);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.game.PropertyData.verify(message.attributes[key[i]]);
                    if (error)
                        return "attributes." + error;
                }
            }
            if (message.materialIndex != null && message.hasOwnProperty("materialIndex"))
                if (!$util.isInteger(message.materialIndex))
                    return "materialIndex: integer expected";
            return null;
        };

        /**
         * Creates a PaletteData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PaletteData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PaletteData} PaletteData
         */
        PaletteData.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PaletteData)
                return object;
            var message = new $root.game.PaletteData();
            if (object.attributes) {
                if (typeof object.attributes !== "object")
                    throw TypeError(".game.PaletteData.attributes: object expected");
                message.attributes = {};
                for (var keys = Object.keys(object.attributes), i = 0; i < keys.length; ++i) {
                    if (typeof object.attributes[keys[i]] !== "object")
                        throw TypeError(".game.PaletteData.attributes: object expected");
                    message.attributes[keys[i]] = $root.game.PropertyData.fromObject(object.attributes[keys[i]]);
                }
            }
            if (object.materialIndex != null)
                message.materialIndex = object.materialIndex | 0;
            return message;
        };

        /**
         * Creates a plain object from a PaletteData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PaletteData
         * @static
         * @param {game.PaletteData} message PaletteData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PaletteData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.attributes = {};
            if (options.defaults)
                object.materialIndex = 0;
            var keys2;
            if (message.attributes && (keys2 = Object.keys(message.attributes)).length) {
                object.attributes = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.attributes[keys2[j]] = $root.game.PropertyData.toObject(message.attributes[keys2[j]], options);
            }
            if (message.materialIndex != null && message.hasOwnProperty("materialIndex"))
                object.materialIndex = message.materialIndex;
            return object;
        };

        /**
         * Converts this PaletteData to JSON.
         * @function toJSON
         * @memberof game.PaletteData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PaletteData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PaletteData
         * @function getTypeUrl
         * @memberof game.PaletteData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PaletteData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PaletteData";
        };

        return PaletteData;
    })();

    game.ChunkData = (function() {

        /**
         * Properties of a ChunkData.
         * @memberof game
         * @interface IChunkData
         * @property {Array.<game.IPaletteData>|null} [palette] ChunkData palette
         * @property {Array.<number>|null} [chunkData] ChunkData chunkData
         */

        /**
         * Constructs a new ChunkData.
         * @memberof game
         * @classdesc Represents a ChunkData.
         * @implements IChunkData
         * @constructor
         * @param {game.IChunkData=} [properties] Properties to set
         */
        function ChunkData(properties) {
            this.palette = [];
            this.chunkData = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChunkData palette.
         * @member {Array.<game.IPaletteData>} palette
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.palette = $util.emptyArray;

        /**
         * ChunkData chunkData.
         * @member {Array.<number>} chunkData
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.chunkData = $util.emptyArray;

        /**
         * Creates a new ChunkData instance using the specified properties.
         * @function create
         * @memberof game.ChunkData
         * @static
         * @param {game.IChunkData=} [properties] Properties to set
         * @returns {game.ChunkData} ChunkData instance
         */
        ChunkData.create = function create(properties) {
            return new ChunkData(properties);
        };

        /**
         * Encodes the specified ChunkData message. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @function encode
         * @memberof game.ChunkData
         * @static
         * @param {game.IChunkData} message ChunkData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChunkData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.palette != null && message.palette.length)
                for (var i = 0; i < message.palette.length; ++i)
                    $root.game.PaletteData.encode(message.palette[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.chunkData != null && message.chunkData.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.chunkData.length; ++i)
                    writer.uint32(message.chunkData[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified ChunkData message, length delimited. Does not implicitly {@link game.ChunkData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.ChunkData
         * @static
         * @param {game.IChunkData} message ChunkData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChunkData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChunkData message from the specified reader or buffer.
         * @function decode
         * @memberof game.ChunkData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.ChunkData} ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChunkData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ChunkData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.palette && message.palette.length))
                            message.palette = [];
                        message.palette.push($root.game.PaletteData.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        if (!(message.chunkData && message.chunkData.length))
                            message.chunkData = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.chunkData.push(reader.uint32());
                        } else
                            message.chunkData.push(reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChunkData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.ChunkData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.ChunkData} ChunkData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChunkData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChunkData message.
         * @function verify
         * @memberof game.ChunkData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChunkData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.palette != null && message.hasOwnProperty("palette")) {
                if (!Array.isArray(message.palette))
                    return "palette: array expected";
                for (var i = 0; i < message.palette.length; ++i) {
                    var error = $root.game.PaletteData.verify(message.palette[i]);
                    if (error)
                        return "palette." + error;
                }
            }
            if (message.chunkData != null && message.hasOwnProperty("chunkData")) {
                if (!Array.isArray(message.chunkData))
                    return "chunkData: array expected";
                for (var i = 0; i < message.chunkData.length; ++i)
                    if (!$util.isInteger(message.chunkData[i]))
                        return "chunkData: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a ChunkData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.ChunkData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.ChunkData} ChunkData
         */
        ChunkData.fromObject = function fromObject(object) {
            if (object instanceof $root.game.ChunkData)
                return object;
            var message = new $root.game.ChunkData();
            if (object.palette) {
                if (!Array.isArray(object.palette))
                    throw TypeError(".game.ChunkData.palette: array expected");
                message.palette = [];
                for (var i = 0; i < object.palette.length; ++i) {
                    if (typeof object.palette[i] !== "object")
                        throw TypeError(".game.ChunkData.palette: object expected");
                    message.palette[i] = $root.game.PaletteData.fromObject(object.palette[i]);
                }
            }
            if (object.chunkData) {
                if (!Array.isArray(object.chunkData))
                    throw TypeError(".game.ChunkData.chunkData: array expected");
                message.chunkData = [];
                for (var i = 0; i < object.chunkData.length; ++i)
                    message.chunkData[i] = object.chunkData[i] >>> 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a ChunkData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.ChunkData
         * @static
         * @param {game.ChunkData} message ChunkData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChunkData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.palette = [];
                object.chunkData = [];
            }
            if (message.palette && message.palette.length) {
                object.palette = [];
                for (var j = 0; j < message.palette.length; ++j)
                    object.palette[j] = $root.game.PaletteData.toObject(message.palette[j], options);
            }
            if (message.chunkData && message.chunkData.length) {
                object.chunkData = [];
                for (var j = 0; j < message.chunkData.length; ++j)
                    object.chunkData[j] = message.chunkData[j];
            }
            return object;
        };

        /**
         * Converts this ChunkData to JSON.
         * @function toJSON
         * @memberof game.ChunkData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChunkData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ChunkData
         * @function getTypeUrl
         * @memberof game.ChunkData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ChunkData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.ChunkData";
        };

        return ChunkData;
    })();

    game.PlayerMoveData = (function() {

        /**
         * Properties of a PlayerMoveData.
         * @memberof game
         * @interface IPlayerMoveData
         * @property {game.IVec3f|null} [position] PlayerMoveData position
         * @property {string|null} [name] PlayerMoveData name
         */

        /**
         * Constructs a new PlayerMoveData.
         * @memberof game
         * @classdesc Represents a PlayerMoveData.
         * @implements IPlayerMoveData
         * @constructor
         * @param {game.IPlayerMoveData=} [properties] Properties to set
         */
        function PlayerMoveData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerMoveData position.
         * @member {game.IVec3f|null|undefined} position
         * @memberof game.PlayerMoveData
         * @instance
         */
        PlayerMoveData.prototype.position = null;

        /**
         * PlayerMoveData name.
         * @member {string} name
         * @memberof game.PlayerMoveData
         * @instance
         */
        PlayerMoveData.prototype.name = "";

        /**
         * Creates a new PlayerMoveData instance using the specified properties.
         * @function create
         * @memberof game.PlayerMoveData
         * @static
         * @param {game.IPlayerMoveData=} [properties] Properties to set
         * @returns {game.PlayerMoveData} PlayerMoveData instance
         */
        PlayerMoveData.create = function create(properties) {
            return new PlayerMoveData(properties);
        };

        /**
         * Encodes the specified PlayerMoveData message. Does not implicitly {@link game.PlayerMoveData.verify|verify} messages.
         * @function encode
         * @memberof game.PlayerMoveData
         * @static
         * @param {game.IPlayerMoveData} message PlayerMoveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerMoveData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.game.Vec3f.encode(message.position, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified PlayerMoveData message, length delimited. Does not implicitly {@link game.PlayerMoveData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PlayerMoveData
         * @static
         * @param {game.IPlayerMoveData} message PlayerMoveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerMoveData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer.
         * @function decode
         * @memberof game.PlayerMoveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PlayerMoveData} PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerMoveData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PlayerMoveData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.position = $root.game.Vec3f.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PlayerMoveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PlayerMoveData} PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerMoveData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerMoveData message.
         * @function verify
         * @memberof game.PlayerMoveData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerMoveData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                var error = $root.game.Vec3f.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a PlayerMoveData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PlayerMoveData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PlayerMoveData} PlayerMoveData
         */
        PlayerMoveData.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PlayerMoveData)
                return object;
            var message = new $root.game.PlayerMoveData();
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".game.PlayerMoveData.position: object expected");
                message.position = $root.game.Vec3f.fromObject(object.position);
            }
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a PlayerMoveData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PlayerMoveData
         * @static
         * @param {game.PlayerMoveData} message PlayerMoveData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerMoveData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.position = null;
                object.name = "";
            }
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.game.Vec3f.toObject(message.position, options);
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this PlayerMoveData to JSON.
         * @function toJSON
         * @memberof game.PlayerMoveData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerMoveData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerMoveData
         * @function getTypeUrl
         * @memberof game.PlayerMoveData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerMoveData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PlayerMoveData";
        };

        return PlayerMoveData;
    })();

    game.PlayerJoin = (function() {

        /**
         * Properties of a PlayerJoin.
         * @memberof game
         * @interface IPlayerJoin
         * @property {string|null} [name] PlayerJoin name
         */

        /**
         * Constructs a new PlayerJoin.
         * @memberof game
         * @classdesc Represents a PlayerJoin.
         * @implements IPlayerJoin
         * @constructor
         * @param {game.IPlayerJoin=} [properties] Properties to set
         */
        function PlayerJoin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerJoin name.
         * @member {string} name
         * @memberof game.PlayerJoin
         * @instance
         */
        PlayerJoin.prototype.name = "";

        /**
         * Creates a new PlayerJoin instance using the specified properties.
         * @function create
         * @memberof game.PlayerJoin
         * @static
         * @param {game.IPlayerJoin=} [properties] Properties to set
         * @returns {game.PlayerJoin} PlayerJoin instance
         */
        PlayerJoin.create = function create(properties) {
            return new PlayerJoin(properties);
        };

        /**
         * Encodes the specified PlayerJoin message. Does not implicitly {@link game.PlayerJoin.verify|verify} messages.
         * @function encode
         * @memberof game.PlayerJoin
         * @static
         * @param {game.IPlayerJoin} message PlayerJoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerJoin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified PlayerJoin message, length delimited. Does not implicitly {@link game.PlayerJoin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PlayerJoin
         * @static
         * @param {game.IPlayerJoin} message PlayerJoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerJoin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerJoin message from the specified reader or buffer.
         * @function decode
         * @memberof game.PlayerJoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PlayerJoin} PlayerJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerJoin.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PlayerJoin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerJoin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PlayerJoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PlayerJoin} PlayerJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerJoin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerJoin message.
         * @function verify
         * @memberof game.PlayerJoin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerJoin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a PlayerJoin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PlayerJoin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PlayerJoin} PlayerJoin
         */
        PlayerJoin.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PlayerJoin)
                return object;
            var message = new $root.game.PlayerJoin();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a PlayerJoin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PlayerJoin
         * @static
         * @param {game.PlayerJoin} message PlayerJoin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerJoin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this PlayerJoin to JSON.
         * @function toJSON
         * @memberof game.PlayerJoin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerJoin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerJoin
         * @function getTypeUrl
         * @memberof game.PlayerJoin
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerJoin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PlayerJoin";
        };

        return PlayerJoin;
    })();

    return game;
})();

module.exports = $root;
