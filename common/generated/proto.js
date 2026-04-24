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
                writer.uint32(/* id 1, wireType 0 =*/8).sint32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).sint32(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.z);
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
                        message.x = reader.sint32();
                        break;
                    }
                case 2: {
                        message.y = reader.sint32();
                        break;
                    }
                case 3: {
                        message.z = reader.sint32();
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
         * @property {number|null} [hash] PaletteData hash
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
         * PaletteData hash.
         * @member {number} hash
         * @memberof game.PaletteData
         * @instance
         */
        PaletteData.prototype.hash = 0;

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
            if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.hash);
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
                case 3: {
                        message.hash = reader.int32();
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
            if (message.hash != null && message.hasOwnProperty("hash"))
                if (!$util.isInteger(message.hash))
                    return "hash: integer expected";
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
            if (object.hash != null)
                message.hash = object.hash | 0;
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
            if (options.defaults) {
                object.materialIndex = 0;
                object.hash = 0;
            }
            var keys2;
            if (message.attributes && (keys2 = Object.keys(message.attributes)).length) {
                object.attributes = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.attributes[keys2[j]] = $root.game.PropertyData.toObject(message.attributes[keys2[j]], options);
            }
            if (message.materialIndex != null && message.hasOwnProperty("materialIndex"))
                object.materialIndex = message.materialIndex;
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = message.hash;
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
         * @property {Array.<number>|null} [materialsData] ChunkData materialsData
         * @property {Array.<number>|null} [densitiesData] ChunkData densitiesData
         * @property {game.IVec3i|null} [chunkPosition] ChunkData chunkPosition
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
            this.materialsData = [];
            this.densitiesData = [];
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
         * ChunkData materialsData.
         * @member {Array.<number>} materialsData
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.materialsData = $util.emptyArray;

        /**
         * ChunkData densitiesData.
         * @member {Array.<number>} densitiesData
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.densitiesData = $util.emptyArray;

        /**
         * ChunkData chunkPosition.
         * @member {game.IVec3i|null|undefined} chunkPosition
         * @memberof game.ChunkData
         * @instance
         */
        ChunkData.prototype.chunkPosition = null;

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
            if (message.materialsData != null && message.materialsData.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.materialsData.length; ++i)
                    writer.uint32(message.materialsData[i]);
                writer.ldelim();
            }
            if (message.densitiesData != null && message.densitiesData.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (var i = 0; i < message.densitiesData.length; ++i)
                    writer.float(message.densitiesData[i]);
                writer.ldelim();
            }
            if (message.chunkPosition != null && Object.hasOwnProperty.call(message, "chunkPosition"))
                $root.game.Vec3i.encode(message.chunkPosition, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
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
                        if (!(message.materialsData && message.materialsData.length))
                            message.materialsData = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.materialsData.push(reader.uint32());
                        } else
                            message.materialsData.push(reader.uint32());
                        break;
                    }
                case 3: {
                        if (!(message.densitiesData && message.densitiesData.length))
                            message.densitiesData = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.densitiesData.push(reader.float());
                        } else
                            message.densitiesData.push(reader.float());
                        break;
                    }
                case 4: {
                        message.chunkPosition = $root.game.Vec3i.decode(reader, reader.uint32());
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
            if (message.materialsData != null && message.hasOwnProperty("materialsData")) {
                if (!Array.isArray(message.materialsData))
                    return "materialsData: array expected";
                for (var i = 0; i < message.materialsData.length; ++i)
                    if (!$util.isInteger(message.materialsData[i]))
                        return "materialsData: integer[] expected";
            }
            if (message.densitiesData != null && message.hasOwnProperty("densitiesData")) {
                if (!Array.isArray(message.densitiesData))
                    return "densitiesData: array expected";
                for (var i = 0; i < message.densitiesData.length; ++i)
                    if (typeof message.densitiesData[i] !== "number")
                        return "densitiesData: number[] expected";
            }
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition")) {
                var error = $root.game.Vec3i.verify(message.chunkPosition);
                if (error)
                    return "chunkPosition." + error;
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
            if (object.materialsData) {
                if (!Array.isArray(object.materialsData))
                    throw TypeError(".game.ChunkData.materialsData: array expected");
                message.materialsData = [];
                for (var i = 0; i < object.materialsData.length; ++i)
                    message.materialsData[i] = object.materialsData[i] >>> 0;
            }
            if (object.densitiesData) {
                if (!Array.isArray(object.densitiesData))
                    throw TypeError(".game.ChunkData.densitiesData: array expected");
                message.densitiesData = [];
                for (var i = 0; i < object.densitiesData.length; ++i)
                    message.densitiesData[i] = Number(object.densitiesData[i]);
            }
            if (object.chunkPosition != null) {
                if (typeof object.chunkPosition !== "object")
                    throw TypeError(".game.ChunkData.chunkPosition: object expected");
                message.chunkPosition = $root.game.Vec3i.fromObject(object.chunkPosition);
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
                object.materialsData = [];
                object.densitiesData = [];
            }
            if (options.defaults)
                object.chunkPosition = null;
            if (message.palette && message.palette.length) {
                object.palette = [];
                for (var j = 0; j < message.palette.length; ++j)
                    object.palette[j] = $root.game.PaletteData.toObject(message.palette[j], options);
            }
            if (message.materialsData && message.materialsData.length) {
                object.materialsData = [];
                for (var j = 0; j < message.materialsData.length; ++j)
                    object.materialsData[j] = message.materialsData[j];
            }
            if (message.densitiesData && message.densitiesData.length) {
                object.densitiesData = [];
                for (var j = 0; j < message.densitiesData.length; ++j)
                    object.densitiesData[j] = options.json && !isFinite(message.densitiesData[j]) ? String(message.densitiesData[j]) : message.densitiesData[j];
            }
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition"))
                object.chunkPosition = $root.game.Vec3i.toObject(message.chunkPosition, options);
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

    game.WorldProp = (function() {

        /**
         * Properties of a WorldProp.
         * @memberof game
         * @interface IWorldProp
         * @property {game.IVec3f|null} [position] WorldProp position
         * @property {game.IVec3f|null} [scale] WorldProp scale
         * @property {game.IVec3f|null} [rotation] WorldProp rotation
         * @property {string|null} [model] WorldProp model
         * @property {number|null} [id] WorldProp id
         */

        /**
         * Constructs a new WorldProp.
         * @memberof game
         * @classdesc Represents a WorldProp.
         * @implements IWorldProp
         * @constructor
         * @param {game.IWorldProp=} [properties] Properties to set
         */
        function WorldProp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorldProp position.
         * @member {game.IVec3f|null|undefined} position
         * @memberof game.WorldProp
         * @instance
         */
        WorldProp.prototype.position = null;

        /**
         * WorldProp scale.
         * @member {game.IVec3f|null|undefined} scale
         * @memberof game.WorldProp
         * @instance
         */
        WorldProp.prototype.scale = null;

        /**
         * WorldProp rotation.
         * @member {game.IVec3f|null|undefined} rotation
         * @memberof game.WorldProp
         * @instance
         */
        WorldProp.prototype.rotation = null;

        /**
         * WorldProp model.
         * @member {string} model
         * @memberof game.WorldProp
         * @instance
         */
        WorldProp.prototype.model = "";

        /**
         * WorldProp id.
         * @member {number} id
         * @memberof game.WorldProp
         * @instance
         */
        WorldProp.prototype.id = 0;

        /**
         * Creates a new WorldProp instance using the specified properties.
         * @function create
         * @memberof game.WorldProp
         * @static
         * @param {game.IWorldProp=} [properties] Properties to set
         * @returns {game.WorldProp} WorldProp instance
         */
        WorldProp.create = function create(properties) {
            return new WorldProp(properties);
        };

        /**
         * Encodes the specified WorldProp message. Does not implicitly {@link game.WorldProp.verify|verify} messages.
         * @function encode
         * @memberof game.WorldProp
         * @static
         * @param {game.IWorldProp} message WorldProp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorldProp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.game.Vec3f.encode(message.position, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.scale != null && Object.hasOwnProperty.call(message, "scale"))
                $root.game.Vec3f.encode(message.scale, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                $root.game.Vec3f.encode(message.rotation, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.model != null && Object.hasOwnProperty.call(message, "model"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.model);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.id);
            return writer;
        };

        /**
         * Encodes the specified WorldProp message, length delimited. Does not implicitly {@link game.WorldProp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.WorldProp
         * @static
         * @param {game.IWorldProp} message WorldProp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorldProp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WorldProp message from the specified reader or buffer.
         * @function decode
         * @memberof game.WorldProp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.WorldProp} WorldProp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorldProp.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.WorldProp();
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
                        message.scale = $root.game.Vec3f.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.rotation = $root.game.Vec3f.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.model = reader.string();
                        break;
                    }
                case 5: {
                        message.id = reader.int32();
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
         * Decodes a WorldProp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.WorldProp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.WorldProp} WorldProp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorldProp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WorldProp message.
         * @function verify
         * @memberof game.WorldProp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WorldProp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                var error = $root.game.Vec3f.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.scale != null && message.hasOwnProperty("scale")) {
                var error = $root.game.Vec3f.verify(message.scale);
                if (error)
                    return "scale." + error;
            }
            if (message.rotation != null && message.hasOwnProperty("rotation")) {
                var error = $root.game.Vec3f.verify(message.rotation);
                if (error)
                    return "rotation." + error;
            }
            if (message.model != null && message.hasOwnProperty("model"))
                if (!$util.isString(message.model))
                    return "model: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            return null;
        };

        /**
         * Creates a WorldProp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.WorldProp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.WorldProp} WorldProp
         */
        WorldProp.fromObject = function fromObject(object) {
            if (object instanceof $root.game.WorldProp)
                return object;
            var message = new $root.game.WorldProp();
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".game.WorldProp.position: object expected");
                message.position = $root.game.Vec3f.fromObject(object.position);
            }
            if (object.scale != null) {
                if (typeof object.scale !== "object")
                    throw TypeError(".game.WorldProp.scale: object expected");
                message.scale = $root.game.Vec3f.fromObject(object.scale);
            }
            if (object.rotation != null) {
                if (typeof object.rotation !== "object")
                    throw TypeError(".game.WorldProp.rotation: object expected");
                message.rotation = $root.game.Vec3f.fromObject(object.rotation);
            }
            if (object.model != null)
                message.model = String(object.model);
            if (object.id != null)
                message.id = object.id | 0;
            return message;
        };

        /**
         * Creates a plain object from a WorldProp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.WorldProp
         * @static
         * @param {game.WorldProp} message WorldProp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorldProp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.position = null;
                object.scale = null;
                object.rotation = null;
                object.model = "";
                object.id = 0;
            }
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.game.Vec3f.toObject(message.position, options);
            if (message.scale != null && message.hasOwnProperty("scale"))
                object.scale = $root.game.Vec3f.toObject(message.scale, options);
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = $root.game.Vec3f.toObject(message.rotation, options);
            if (message.model != null && message.hasOwnProperty("model"))
                object.model = message.model;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this WorldProp to JSON.
         * @function toJSON
         * @memberof game.WorldProp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorldProp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorldProp
         * @function getTypeUrl
         * @memberof game.WorldProp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorldProp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.WorldProp";
        };

        return WorldProp;
    })();

    game.PropsData = (function() {

        /**
         * Properties of a PropsData.
         * @memberof game
         * @interface IPropsData
         * @property {game.IVec3i|null} [chunkPosition] PropsData chunkPosition
         * @property {Array.<game.IWorldProp>|null} [props] PropsData props
         */

        /**
         * Constructs a new PropsData.
         * @memberof game
         * @classdesc Represents a PropsData.
         * @implements IPropsData
         * @constructor
         * @param {game.IPropsData=} [properties] Properties to set
         */
        function PropsData(properties) {
            this.props = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PropsData chunkPosition.
         * @member {game.IVec3i|null|undefined} chunkPosition
         * @memberof game.PropsData
         * @instance
         */
        PropsData.prototype.chunkPosition = null;

        /**
         * PropsData props.
         * @member {Array.<game.IWorldProp>} props
         * @memberof game.PropsData
         * @instance
         */
        PropsData.prototype.props = $util.emptyArray;

        /**
         * Creates a new PropsData instance using the specified properties.
         * @function create
         * @memberof game.PropsData
         * @static
         * @param {game.IPropsData=} [properties] Properties to set
         * @returns {game.PropsData} PropsData instance
         */
        PropsData.create = function create(properties) {
            return new PropsData(properties);
        };

        /**
         * Encodes the specified PropsData message. Does not implicitly {@link game.PropsData.verify|verify} messages.
         * @function encode
         * @memberof game.PropsData
         * @static
         * @param {game.IPropsData} message PropsData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PropsData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chunkPosition != null && Object.hasOwnProperty.call(message, "chunkPosition"))
                $root.game.Vec3i.encode(message.chunkPosition, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.props != null && message.props.length)
                for (var i = 0; i < message.props.length; ++i)
                    $root.game.WorldProp.encode(message.props[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PropsData message, length delimited. Does not implicitly {@link game.PropsData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PropsData
         * @static
         * @param {game.IPropsData} message PropsData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PropsData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PropsData message from the specified reader or buffer.
         * @function decode
         * @memberof game.PropsData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PropsData} PropsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PropsData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PropsData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.chunkPosition = $root.game.Vec3i.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        if (!(message.props && message.props.length))
                            message.props = [];
                        message.props.push($root.game.WorldProp.decode(reader, reader.uint32()));
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
         * Decodes a PropsData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PropsData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PropsData} PropsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PropsData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PropsData message.
         * @function verify
         * @memberof game.PropsData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PropsData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition")) {
                var error = $root.game.Vec3i.verify(message.chunkPosition);
                if (error)
                    return "chunkPosition." + error;
            }
            if (message.props != null && message.hasOwnProperty("props")) {
                if (!Array.isArray(message.props))
                    return "props: array expected";
                for (var i = 0; i < message.props.length; ++i) {
                    var error = $root.game.WorldProp.verify(message.props[i]);
                    if (error)
                        return "props." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PropsData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PropsData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PropsData} PropsData
         */
        PropsData.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PropsData)
                return object;
            var message = new $root.game.PropsData();
            if (object.chunkPosition != null) {
                if (typeof object.chunkPosition !== "object")
                    throw TypeError(".game.PropsData.chunkPosition: object expected");
                message.chunkPosition = $root.game.Vec3i.fromObject(object.chunkPosition);
            }
            if (object.props) {
                if (!Array.isArray(object.props))
                    throw TypeError(".game.PropsData.props: array expected");
                message.props = [];
                for (var i = 0; i < object.props.length; ++i) {
                    if (typeof object.props[i] !== "object")
                        throw TypeError(".game.PropsData.props: object expected");
                    message.props[i] = $root.game.WorldProp.fromObject(object.props[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PropsData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PropsData
         * @static
         * @param {game.PropsData} message PropsData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PropsData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.props = [];
            if (options.defaults)
                object.chunkPosition = null;
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition"))
                object.chunkPosition = $root.game.Vec3i.toObject(message.chunkPosition, options);
            if (message.props && message.props.length) {
                object.props = [];
                for (var j = 0; j < message.props.length; ++j)
                    object.props[j] = $root.game.WorldProp.toObject(message.props[j], options);
            }
            return object;
        };

        /**
         * Converts this PropsData to JSON.
         * @function toJSON
         * @memberof game.PropsData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PropsData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PropsData
         * @function getTypeUrl
         * @memberof game.PropsData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PropsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PropsData";
        };

        return PropsData;
    })();

    game.UnloadChunk = (function() {

        /**
         * Properties of an UnloadChunk.
         * @memberof game
         * @interface IUnloadChunk
         * @property {game.IVec3i|null} [chunkPosition] UnloadChunk chunkPosition
         */

        /**
         * Constructs a new UnloadChunk.
         * @memberof game
         * @classdesc Represents an UnloadChunk.
         * @implements IUnloadChunk
         * @constructor
         * @param {game.IUnloadChunk=} [properties] Properties to set
         */
        function UnloadChunk(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnloadChunk chunkPosition.
         * @member {game.IVec3i|null|undefined} chunkPosition
         * @memberof game.UnloadChunk
         * @instance
         */
        UnloadChunk.prototype.chunkPosition = null;

        /**
         * Creates a new UnloadChunk instance using the specified properties.
         * @function create
         * @memberof game.UnloadChunk
         * @static
         * @param {game.IUnloadChunk=} [properties] Properties to set
         * @returns {game.UnloadChunk} UnloadChunk instance
         */
        UnloadChunk.create = function create(properties) {
            return new UnloadChunk(properties);
        };

        /**
         * Encodes the specified UnloadChunk message. Does not implicitly {@link game.UnloadChunk.verify|verify} messages.
         * @function encode
         * @memberof game.UnloadChunk
         * @static
         * @param {game.IUnloadChunk} message UnloadChunk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnloadChunk.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chunkPosition != null && Object.hasOwnProperty.call(message, "chunkPosition"))
                $root.game.Vec3i.encode(message.chunkPosition, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UnloadChunk message, length delimited. Does not implicitly {@link game.UnloadChunk.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.UnloadChunk
         * @static
         * @param {game.IUnloadChunk} message UnloadChunk message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnloadChunk.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UnloadChunk message from the specified reader or buffer.
         * @function decode
         * @memberof game.UnloadChunk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.UnloadChunk} UnloadChunk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnloadChunk.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.UnloadChunk();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.chunkPosition = $root.game.Vec3i.decode(reader, reader.uint32());
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
         * Decodes an UnloadChunk message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.UnloadChunk
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.UnloadChunk} UnloadChunk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnloadChunk.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnloadChunk message.
         * @function verify
         * @memberof game.UnloadChunk
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnloadChunk.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition")) {
                var error = $root.game.Vec3i.verify(message.chunkPosition);
                if (error)
                    return "chunkPosition." + error;
            }
            return null;
        };

        /**
         * Creates an UnloadChunk message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.UnloadChunk
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.UnloadChunk} UnloadChunk
         */
        UnloadChunk.fromObject = function fromObject(object) {
            if (object instanceof $root.game.UnloadChunk)
                return object;
            var message = new $root.game.UnloadChunk();
            if (object.chunkPosition != null) {
                if (typeof object.chunkPosition !== "object")
                    throw TypeError(".game.UnloadChunk.chunkPosition: object expected");
                message.chunkPosition = $root.game.Vec3i.fromObject(object.chunkPosition);
            }
            return message;
        };

        /**
         * Creates a plain object from an UnloadChunk message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.UnloadChunk
         * @static
         * @param {game.UnloadChunk} message UnloadChunk
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnloadChunk.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chunkPosition = null;
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition"))
                object.chunkPosition = $root.game.Vec3i.toObject(message.chunkPosition, options);
            return object;
        };

        /**
         * Converts this UnloadChunk to JSON.
         * @function toJSON
         * @memberof game.UnloadChunk
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnloadChunk.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UnloadChunk
         * @function getTypeUrl
         * @memberof game.UnloadChunk
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UnloadChunk.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.UnloadChunk";
        };

        return UnloadChunk;
    })();

    game.LoadChunkRequest = (function() {

        /**
         * Properties of a LoadChunkRequest.
         * @memberof game
         * @interface ILoadChunkRequest
         * @property {game.IVec3i|null} [chunkPosition] LoadChunkRequest chunkPosition
         */

        /**
         * Constructs a new LoadChunkRequest.
         * @memberof game
         * @classdesc Represents a LoadChunkRequest.
         * @implements ILoadChunkRequest
         * @constructor
         * @param {game.ILoadChunkRequest=} [properties] Properties to set
         */
        function LoadChunkRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoadChunkRequest chunkPosition.
         * @member {game.IVec3i|null|undefined} chunkPosition
         * @memberof game.LoadChunkRequest
         * @instance
         */
        LoadChunkRequest.prototype.chunkPosition = null;

        /**
         * Creates a new LoadChunkRequest instance using the specified properties.
         * @function create
         * @memberof game.LoadChunkRequest
         * @static
         * @param {game.ILoadChunkRequest=} [properties] Properties to set
         * @returns {game.LoadChunkRequest} LoadChunkRequest instance
         */
        LoadChunkRequest.create = function create(properties) {
            return new LoadChunkRequest(properties);
        };

        /**
         * Encodes the specified LoadChunkRequest message. Does not implicitly {@link game.LoadChunkRequest.verify|verify} messages.
         * @function encode
         * @memberof game.LoadChunkRequest
         * @static
         * @param {game.ILoadChunkRequest} message LoadChunkRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoadChunkRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chunkPosition != null && Object.hasOwnProperty.call(message, "chunkPosition"))
                $root.game.Vec3i.encode(message.chunkPosition, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LoadChunkRequest message, length delimited. Does not implicitly {@link game.LoadChunkRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.LoadChunkRequest
         * @static
         * @param {game.ILoadChunkRequest} message LoadChunkRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoadChunkRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoadChunkRequest message from the specified reader or buffer.
         * @function decode
         * @memberof game.LoadChunkRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.LoadChunkRequest} LoadChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoadChunkRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.LoadChunkRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.chunkPosition = $root.game.Vec3i.decode(reader, reader.uint32());
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
         * Decodes a LoadChunkRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.LoadChunkRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.LoadChunkRequest} LoadChunkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoadChunkRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoadChunkRequest message.
         * @function verify
         * @memberof game.LoadChunkRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoadChunkRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition")) {
                var error = $root.game.Vec3i.verify(message.chunkPosition);
                if (error)
                    return "chunkPosition." + error;
            }
            return null;
        };

        /**
         * Creates a LoadChunkRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.LoadChunkRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.LoadChunkRequest} LoadChunkRequest
         */
        LoadChunkRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.game.LoadChunkRequest)
                return object;
            var message = new $root.game.LoadChunkRequest();
            if (object.chunkPosition != null) {
                if (typeof object.chunkPosition !== "object")
                    throw TypeError(".game.LoadChunkRequest.chunkPosition: object expected");
                message.chunkPosition = $root.game.Vec3i.fromObject(object.chunkPosition);
            }
            return message;
        };

        /**
         * Creates a plain object from a LoadChunkRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.LoadChunkRequest
         * @static
         * @param {game.LoadChunkRequest} message LoadChunkRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoadChunkRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.chunkPosition = null;
            if (message.chunkPosition != null && message.hasOwnProperty("chunkPosition"))
                object.chunkPosition = $root.game.Vec3i.toObject(message.chunkPosition, options);
            return object;
        };

        /**
         * Converts this LoadChunkRequest to JSON.
         * @function toJSON
         * @memberof game.LoadChunkRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoadChunkRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LoadChunkRequest
         * @function getTypeUrl
         * @memberof game.LoadChunkRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LoadChunkRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.LoadChunkRequest";
        };

        return LoadChunkRequest;
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

    game.PlayerLeave = (function() {

        /**
         * Properties of a PlayerLeave.
         * @memberof game
         * @interface IPlayerLeave
         * @property {string|null} [name] PlayerLeave name
         */

        /**
         * Constructs a new PlayerLeave.
         * @memberof game
         * @classdesc Represents a PlayerLeave.
         * @implements IPlayerLeave
         * @constructor
         * @param {game.IPlayerLeave=} [properties] Properties to set
         */
        function PlayerLeave(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerLeave name.
         * @member {string} name
         * @memberof game.PlayerLeave
         * @instance
         */
        PlayerLeave.prototype.name = "";

        /**
         * Creates a new PlayerLeave instance using the specified properties.
         * @function create
         * @memberof game.PlayerLeave
         * @static
         * @param {game.IPlayerLeave=} [properties] Properties to set
         * @returns {game.PlayerLeave} PlayerLeave instance
         */
        PlayerLeave.create = function create(properties) {
            return new PlayerLeave(properties);
        };

        /**
         * Encodes the specified PlayerLeave message. Does not implicitly {@link game.PlayerLeave.verify|verify} messages.
         * @function encode
         * @memberof game.PlayerLeave
         * @static
         * @param {game.IPlayerLeave} message PlayerLeave message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLeave.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified PlayerLeave message, length delimited. Does not implicitly {@link game.PlayerLeave.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.PlayerLeave
         * @static
         * @param {game.IPlayerLeave} message PlayerLeave message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerLeave.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerLeave message from the specified reader or buffer.
         * @function decode
         * @memberof game.PlayerLeave
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.PlayerLeave} PlayerLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLeave.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.PlayerLeave();
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
         * Decodes a PlayerLeave message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.PlayerLeave
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.PlayerLeave} PlayerLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerLeave.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerLeave message.
         * @function verify
         * @memberof game.PlayerLeave
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerLeave.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a PlayerLeave message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.PlayerLeave
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.PlayerLeave} PlayerLeave
         */
        PlayerLeave.fromObject = function fromObject(object) {
            if (object instanceof $root.game.PlayerLeave)
                return object;
            var message = new $root.game.PlayerLeave();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a PlayerLeave message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.PlayerLeave
         * @static
         * @param {game.PlayerLeave} message PlayerLeave
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerLeave.toObject = function toObject(message, options) {
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
         * Converts this PlayerLeave to JSON.
         * @function toJSON
         * @memberof game.PlayerLeave
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerLeave.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerLeave
         * @function getTypeUrl
         * @memberof game.PlayerLeave
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerLeave.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.PlayerLeave";
        };

        return PlayerLeave;
    })();

    game.ItemStack = (function() {

        /**
         * Properties of an ItemStack.
         * @memberof game
         * @interface IItemStack
         * @property {string|null} [name] ItemStack name
         * @property {number|null} [count] ItemStack count
         * @property {Object.<string,game.IPropertyData>|null} [attributes] ItemStack attributes
         */

        /**
         * Constructs a new ItemStack.
         * @memberof game
         * @classdesc Represents an ItemStack.
         * @implements IItemStack
         * @constructor
         * @param {game.IItemStack=} [properties] Properties to set
         */
        function ItemStack(properties) {
            this.attributes = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ItemStack name.
         * @member {string} name
         * @memberof game.ItemStack
         * @instance
         */
        ItemStack.prototype.name = "";

        /**
         * ItemStack count.
         * @member {number} count
         * @memberof game.ItemStack
         * @instance
         */
        ItemStack.prototype.count = 0;

        /**
         * ItemStack attributes.
         * @member {Object.<string,game.IPropertyData>} attributes
         * @memberof game.ItemStack
         * @instance
         */
        ItemStack.prototype.attributes = $util.emptyObject;

        /**
         * Creates a new ItemStack instance using the specified properties.
         * @function create
         * @memberof game.ItemStack
         * @static
         * @param {game.IItemStack=} [properties] Properties to set
         * @returns {game.ItemStack} ItemStack instance
         */
        ItemStack.create = function create(properties) {
            return new ItemStack(properties);
        };

        /**
         * Encodes the specified ItemStack message. Does not implicitly {@link game.ItemStack.verify|verify} messages.
         * @function encode
         * @memberof game.ItemStack
         * @static
         * @param {game.IItemStack} message ItemStack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemStack.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.count);
            if (message.attributes != null && Object.hasOwnProperty.call(message, "attributes"))
                for (var keys = Object.keys(message.attributes), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.game.PropertyData.encode(message.attributes[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };

        /**
         * Encodes the specified ItemStack message, length delimited. Does not implicitly {@link game.ItemStack.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.ItemStack
         * @static
         * @param {game.IItemStack} message ItemStack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemStack.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ItemStack message from the specified reader or buffer.
         * @function decode
         * @memberof game.ItemStack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.ItemStack} ItemStack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemStack.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ItemStack(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.count = reader.int32();
                        break;
                    }
                case 3: {
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
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ItemStack message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.ItemStack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.ItemStack} ItemStack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemStack.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ItemStack message.
         * @function verify
         * @memberof game.ItemStack
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ItemStack.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
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
            return null;
        };

        /**
         * Creates an ItemStack message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.ItemStack
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.ItemStack} ItemStack
         */
        ItemStack.fromObject = function fromObject(object) {
            if (object instanceof $root.game.ItemStack)
                return object;
            var message = new $root.game.ItemStack();
            if (object.name != null)
                message.name = String(object.name);
            if (object.count != null)
                message.count = object.count | 0;
            if (object.attributes) {
                if (typeof object.attributes !== "object")
                    throw TypeError(".game.ItemStack.attributes: object expected");
                message.attributes = {};
                for (var keys = Object.keys(object.attributes), i = 0; i < keys.length; ++i) {
                    if (typeof object.attributes[keys[i]] !== "object")
                        throw TypeError(".game.ItemStack.attributes: object expected");
                    message.attributes[keys[i]] = $root.game.PropertyData.fromObject(object.attributes[keys[i]]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ItemStack message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.ItemStack
         * @static
         * @param {game.ItemStack} message ItemStack
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ItemStack.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.attributes = {};
            if (options.defaults) {
                object.name = "";
                object.count = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            var keys2;
            if (message.attributes && (keys2 = Object.keys(message.attributes)).length) {
                object.attributes = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.attributes[keys2[j]] = $root.game.PropertyData.toObject(message.attributes[keys2[j]], options);
            }
            return object;
        };

        /**
         * Converts this ItemStack to JSON.
         * @function toJSON
         * @memberof game.ItemStack
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ItemStack.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ItemStack
         * @function getTypeUrl
         * @memberof game.ItemStack
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ItemStack.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.ItemStack";
        };

        return ItemStack;
    })();

    game.InventorySync = (function() {

        /**
         * Properties of an InventorySync.
         * @memberof game
         * @interface IInventorySync
         * @property {Array.<game.IItemStack>|null} [items] InventorySync items
         * @property {game.IItemStack|null} [holding] InventorySync holding
         */

        /**
         * Constructs a new InventorySync.
         * @memberof game
         * @classdesc Represents an InventorySync.
         * @implements IInventorySync
         * @constructor
         * @param {game.IInventorySync=} [properties] Properties to set
         */
        function InventorySync(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InventorySync items.
         * @member {Array.<game.IItemStack>} items
         * @memberof game.InventorySync
         * @instance
         */
        InventorySync.prototype.items = $util.emptyArray;

        /**
         * InventorySync holding.
         * @member {game.IItemStack|null|undefined} holding
         * @memberof game.InventorySync
         * @instance
         */
        InventorySync.prototype.holding = null;

        /**
         * Creates a new InventorySync instance using the specified properties.
         * @function create
         * @memberof game.InventorySync
         * @static
         * @param {game.IInventorySync=} [properties] Properties to set
         * @returns {game.InventorySync} InventorySync instance
         */
        InventorySync.create = function create(properties) {
            return new InventorySync(properties);
        };

        /**
         * Encodes the specified InventorySync message. Does not implicitly {@link game.InventorySync.verify|verify} messages.
         * @function encode
         * @memberof game.InventorySync
         * @static
         * @param {game.IInventorySync} message InventorySync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventorySync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.game.ItemStack.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.holding != null && Object.hasOwnProperty.call(message, "holding"))
                $root.game.ItemStack.encode(message.holding, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified InventorySync message, length delimited. Does not implicitly {@link game.InventorySync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.InventorySync
         * @static
         * @param {game.IInventorySync} message InventorySync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventorySync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InventorySync message from the specified reader or buffer.
         * @function decode
         * @memberof game.InventorySync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.InventorySync} InventorySync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventorySync.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.InventorySync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.game.ItemStack.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        message.holding = $root.game.ItemStack.decode(reader, reader.uint32());
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
         * Decodes an InventorySync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.InventorySync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.InventorySync} InventorySync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventorySync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InventorySync message.
         * @function verify
         * @memberof game.InventorySync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InventorySync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.game.ItemStack.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            if (message.holding != null && message.hasOwnProperty("holding")) {
                var error = $root.game.ItemStack.verify(message.holding);
                if (error)
                    return "holding." + error;
            }
            return null;
        };

        /**
         * Creates an InventorySync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.InventorySync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.InventorySync} InventorySync
         */
        InventorySync.fromObject = function fromObject(object) {
            if (object instanceof $root.game.InventorySync)
                return object;
            var message = new $root.game.InventorySync();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".game.InventorySync.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".game.InventorySync.items: object expected");
                    message.items[i] = $root.game.ItemStack.fromObject(object.items[i]);
                }
            }
            if (object.holding != null) {
                if (typeof object.holding !== "object")
                    throw TypeError(".game.InventorySync.holding: object expected");
                message.holding = $root.game.ItemStack.fromObject(object.holding);
            }
            return message;
        };

        /**
         * Creates a plain object from an InventorySync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.InventorySync
         * @static
         * @param {game.InventorySync} message InventorySync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InventorySync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.defaults)
                object.holding = null;
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.game.ItemStack.toObject(message.items[j], options);
            }
            if (message.holding != null && message.hasOwnProperty("holding"))
                object.holding = $root.game.ItemStack.toObject(message.holding, options);
            return object;
        };

        /**
         * Converts this InventorySync to JSON.
         * @function toJSON
         * @memberof game.InventorySync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InventorySync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InventorySync
         * @function getTypeUrl
         * @memberof game.InventorySync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InventorySync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.InventorySync";
        };

        return InventorySync;
    })();

    game.InventoryUpdate = (function() {

        /**
         * Properties of an InventoryUpdate.
         * @memberof game
         * @interface IInventoryUpdate
         * @property {number|null} [slot] InventoryUpdate slot
         */

        /**
         * Constructs a new InventoryUpdate.
         * @memberof game
         * @classdesc Represents an InventoryUpdate.
         * @implements IInventoryUpdate
         * @constructor
         * @param {game.IInventoryUpdate=} [properties] Properties to set
         */
        function InventoryUpdate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InventoryUpdate slot.
         * @member {number} slot
         * @memberof game.InventoryUpdate
         * @instance
         */
        InventoryUpdate.prototype.slot = 0;

        /**
         * Creates a new InventoryUpdate instance using the specified properties.
         * @function create
         * @memberof game.InventoryUpdate
         * @static
         * @param {game.IInventoryUpdate=} [properties] Properties to set
         * @returns {game.InventoryUpdate} InventoryUpdate instance
         */
        InventoryUpdate.create = function create(properties) {
            return new InventoryUpdate(properties);
        };

        /**
         * Encodes the specified InventoryUpdate message. Does not implicitly {@link game.InventoryUpdate.verify|verify} messages.
         * @function encode
         * @memberof game.InventoryUpdate
         * @static
         * @param {game.IInventoryUpdate} message InventoryUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.slot != null && Object.hasOwnProperty.call(message, "slot"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.slot);
            return writer;
        };

        /**
         * Encodes the specified InventoryUpdate message, length delimited. Does not implicitly {@link game.InventoryUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.InventoryUpdate
         * @static
         * @param {game.IInventoryUpdate} message InventoryUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InventoryUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof game.InventoryUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.InventoryUpdate} InventoryUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.InventoryUpdate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.slot = reader.int32();
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
         * Decodes an InventoryUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.InventoryUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.InventoryUpdate} InventoryUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InventoryUpdate message.
         * @function verify
         * @memberof game.InventoryUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InventoryUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.slot != null && message.hasOwnProperty("slot"))
                if (!$util.isInteger(message.slot))
                    return "slot: integer expected";
            return null;
        };

        /**
         * Creates an InventoryUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.InventoryUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.InventoryUpdate} InventoryUpdate
         */
        InventoryUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.game.InventoryUpdate)
                return object;
            var message = new $root.game.InventoryUpdate();
            if (object.slot != null)
                message.slot = object.slot | 0;
            return message;
        };

        /**
         * Creates a plain object from an InventoryUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.InventoryUpdate
         * @static
         * @param {game.InventoryUpdate} message InventoryUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InventoryUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.slot = 0;
            if (message.slot != null && message.hasOwnProperty("slot"))
                object.slot = message.slot;
            return object;
        };

        /**
         * Converts this InventoryUpdate to JSON.
         * @function toJSON
         * @memberof game.InventoryUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InventoryUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InventoryUpdate
         * @function getTypeUrl
         * @memberof game.InventoryUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InventoryUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.InventoryUpdate";
        };

        return InventoryUpdate;
    })();

    game.HotbarSelectUpdate = (function() {

        /**
         * Properties of a HotbarSelectUpdate.
         * @memberof game
         * @interface IHotbarSelectUpdate
         * @property {number|null} [slot] HotbarSelectUpdate slot
         */

        /**
         * Constructs a new HotbarSelectUpdate.
         * @memberof game
         * @classdesc Represents a HotbarSelectUpdate.
         * @implements IHotbarSelectUpdate
         * @constructor
         * @param {game.IHotbarSelectUpdate=} [properties] Properties to set
         */
        function HotbarSelectUpdate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HotbarSelectUpdate slot.
         * @member {number} slot
         * @memberof game.HotbarSelectUpdate
         * @instance
         */
        HotbarSelectUpdate.prototype.slot = 0;

        /**
         * Creates a new HotbarSelectUpdate instance using the specified properties.
         * @function create
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {game.IHotbarSelectUpdate=} [properties] Properties to set
         * @returns {game.HotbarSelectUpdate} HotbarSelectUpdate instance
         */
        HotbarSelectUpdate.create = function create(properties) {
            return new HotbarSelectUpdate(properties);
        };

        /**
         * Encodes the specified HotbarSelectUpdate message. Does not implicitly {@link game.HotbarSelectUpdate.verify|verify} messages.
         * @function encode
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {game.IHotbarSelectUpdate} message HotbarSelectUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HotbarSelectUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.slot != null && Object.hasOwnProperty.call(message, "slot"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.slot);
            return writer;
        };

        /**
         * Encodes the specified HotbarSelectUpdate message, length delimited. Does not implicitly {@link game.HotbarSelectUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {game.IHotbarSelectUpdate} message HotbarSelectUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HotbarSelectUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HotbarSelectUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.HotbarSelectUpdate} HotbarSelectUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HotbarSelectUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.HotbarSelectUpdate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.slot = reader.int32();
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
         * Decodes a HotbarSelectUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.HotbarSelectUpdate} HotbarSelectUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HotbarSelectUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HotbarSelectUpdate message.
         * @function verify
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HotbarSelectUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.slot != null && message.hasOwnProperty("slot"))
                if (!$util.isInteger(message.slot))
                    return "slot: integer expected";
            return null;
        };

        /**
         * Creates a HotbarSelectUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.HotbarSelectUpdate} HotbarSelectUpdate
         */
        HotbarSelectUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.game.HotbarSelectUpdate)
                return object;
            var message = new $root.game.HotbarSelectUpdate();
            if (object.slot != null)
                message.slot = object.slot | 0;
            return message;
        };

        /**
         * Creates a plain object from a HotbarSelectUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {game.HotbarSelectUpdate} message HotbarSelectUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HotbarSelectUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.slot = 0;
            if (message.slot != null && message.hasOwnProperty("slot"))
                object.slot = message.slot;
            return object;
        };

        /**
         * Converts this HotbarSelectUpdate to JSON.
         * @function toJSON
         * @memberof game.HotbarSelectUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HotbarSelectUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HotbarSelectUpdate
         * @function getTypeUrl
         * @memberof game.HotbarSelectUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HotbarSelectUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.HotbarSelectUpdate";
        };

        return HotbarSelectUpdate;
    })();

    game.HoldingItemUpdate = (function() {

        /**
         * Properties of a HoldingItemUpdate.
         * @memberof game
         * @interface IHoldingItemUpdate
         * @property {string|null} [itemName] HoldingItemUpdate itemName
         * @property {string|null} [playerName] HoldingItemUpdate playerName
         */

        /**
         * Constructs a new HoldingItemUpdate.
         * @memberof game
         * @classdesc Represents a HoldingItemUpdate.
         * @implements IHoldingItemUpdate
         * @constructor
         * @param {game.IHoldingItemUpdate=} [properties] Properties to set
         */
        function HoldingItemUpdate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HoldingItemUpdate itemName.
         * @member {string} itemName
         * @memberof game.HoldingItemUpdate
         * @instance
         */
        HoldingItemUpdate.prototype.itemName = "";

        /**
         * HoldingItemUpdate playerName.
         * @member {string} playerName
         * @memberof game.HoldingItemUpdate
         * @instance
         */
        HoldingItemUpdate.prototype.playerName = "";

        /**
         * Creates a new HoldingItemUpdate instance using the specified properties.
         * @function create
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {game.IHoldingItemUpdate=} [properties] Properties to set
         * @returns {game.HoldingItemUpdate} HoldingItemUpdate instance
         */
        HoldingItemUpdate.create = function create(properties) {
            return new HoldingItemUpdate(properties);
        };

        /**
         * Encodes the specified HoldingItemUpdate message. Does not implicitly {@link game.HoldingItemUpdate.verify|verify} messages.
         * @function encode
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {game.IHoldingItemUpdate} message HoldingItemUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HoldingItemUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.itemName != null && Object.hasOwnProperty.call(message, "itemName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.itemName);
            if (message.playerName != null && Object.hasOwnProperty.call(message, "playerName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.playerName);
            return writer;
        };

        /**
         * Encodes the specified HoldingItemUpdate message, length delimited. Does not implicitly {@link game.HoldingItemUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {game.IHoldingItemUpdate} message HoldingItemUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HoldingItemUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HoldingItemUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.HoldingItemUpdate} HoldingItemUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HoldingItemUpdate.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.HoldingItemUpdate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.itemName = reader.string();
                        break;
                    }
                case 2: {
                        message.playerName = reader.string();
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
         * Decodes a HoldingItemUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.HoldingItemUpdate} HoldingItemUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HoldingItemUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HoldingItemUpdate message.
         * @function verify
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HoldingItemUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.itemName != null && message.hasOwnProperty("itemName"))
                if (!$util.isString(message.itemName))
                    return "itemName: string expected";
            if (message.playerName != null && message.hasOwnProperty("playerName"))
                if (!$util.isString(message.playerName))
                    return "playerName: string expected";
            return null;
        };

        /**
         * Creates a HoldingItemUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.HoldingItemUpdate} HoldingItemUpdate
         */
        HoldingItemUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.game.HoldingItemUpdate)
                return object;
            var message = new $root.game.HoldingItemUpdate();
            if (object.itemName != null)
                message.itemName = String(object.itemName);
            if (object.playerName != null)
                message.playerName = String(object.playerName);
            return message;
        };

        /**
         * Creates a plain object from a HoldingItemUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {game.HoldingItemUpdate} message HoldingItemUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HoldingItemUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.itemName = "";
                object.playerName = "";
            }
            if (message.itemName != null && message.hasOwnProperty("itemName"))
                object.itemName = message.itemName;
            if (message.playerName != null && message.hasOwnProperty("playerName"))
                object.playerName = message.playerName;
            return object;
        };

        /**
         * Converts this HoldingItemUpdate to JSON.
         * @function toJSON
         * @memberof game.HoldingItemUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HoldingItemUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HoldingItemUpdate
         * @function getTypeUrl
         * @memberof game.HoldingItemUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HoldingItemUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.HoldingItemUpdate";
        };

        return HoldingItemUpdate;
    })();

    game.ItemUseAttack = (function() {

        /**
         * Properties of an ItemUseAttack.
         * @memberof game
         * @interface IItemUseAttack
         */

        /**
         * Constructs a new ItemUseAttack.
         * @memberof game
         * @classdesc Represents an ItemUseAttack.
         * @implements IItemUseAttack
         * @constructor
         * @param {game.IItemUseAttack=} [properties] Properties to set
         */
        function ItemUseAttack(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ItemUseAttack instance using the specified properties.
         * @function create
         * @memberof game.ItemUseAttack
         * @static
         * @param {game.IItemUseAttack=} [properties] Properties to set
         * @returns {game.ItemUseAttack} ItemUseAttack instance
         */
        ItemUseAttack.create = function create(properties) {
            return new ItemUseAttack(properties);
        };

        /**
         * Encodes the specified ItemUseAttack message. Does not implicitly {@link game.ItemUseAttack.verify|verify} messages.
         * @function encode
         * @memberof game.ItemUseAttack
         * @static
         * @param {game.IItemUseAttack} message ItemUseAttack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemUseAttack.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ItemUseAttack message, length delimited. Does not implicitly {@link game.ItemUseAttack.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.ItemUseAttack
         * @static
         * @param {game.IItemUseAttack} message ItemUseAttack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemUseAttack.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ItemUseAttack message from the specified reader or buffer.
         * @function decode
         * @memberof game.ItemUseAttack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.ItemUseAttack} ItemUseAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemUseAttack.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.ItemUseAttack();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ItemUseAttack message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.ItemUseAttack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.ItemUseAttack} ItemUseAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemUseAttack.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ItemUseAttack message.
         * @function verify
         * @memberof game.ItemUseAttack
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ItemUseAttack.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an ItemUseAttack message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.ItemUseAttack
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.ItemUseAttack} ItemUseAttack
         */
        ItemUseAttack.fromObject = function fromObject(object) {
            if (object instanceof $root.game.ItemUseAttack)
                return object;
            return new $root.game.ItemUseAttack();
        };

        /**
         * Creates a plain object from an ItemUseAttack message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.ItemUseAttack
         * @static
         * @param {game.ItemUseAttack} message ItemUseAttack
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ItemUseAttack.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ItemUseAttack to JSON.
         * @function toJSON
         * @memberof game.ItemUseAttack
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ItemUseAttack.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ItemUseAttack
         * @function getTypeUrl
         * @memberof game.ItemUseAttack
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ItemUseAttack.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.ItemUseAttack";
        };

        return ItemUseAttack;
    })();

    return game;
})();

module.exports = $root;
