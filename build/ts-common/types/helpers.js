"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendCodec = exports.requiredOptionalCodec = exports.optional = exports.nullable = exports.autoImplement = exports.partialRecord = exports.instanceofCodec = void 0;
const t = __importStar(require("io-ts"));
const Record_1 = require("fp-ts/lib/Record");
const guards_1 = require("../guards");
function instanceofCodec(con) {
    return new t.Type(`instanceof(${con.name})`, (u) => u instanceof con, (u, c) => (u instanceof con ? t.success(u) : t.failure(u, c)), t.identity);
}
exports.instanceofCodec = instanceofCodec;
function partialRecord(k, type, name) {
    return t.partial((0, Record_1.map)(k.keys, () => type), name);
}
exports.partialRecord = partialRecord;
function autoImplement() {
    return class {
        constructor(values) {
            if (values) {
                Object.assign(this, typeof values === 'object' ? values : values());
            }
        }
    };
}
exports.autoImplement = autoImplement;
const nullable = (codec) => t.union([codec, t.nullType]);
exports.nullable = nullable;
const optional = (codec) => t.union([codec, t.undefined]);
exports.optional = optional;
/**
 * Creates a codec for an object with required and optional params using an intersection
 * codec.
 *
 * @param required The required attributes
 * @param optional The optional attributes
 * @param name The name of the type
 */
function requiredOptionalCodec(required, optional, name) {
    return t.intersection([t.type(required, `${name}Req`), t.partial(optional, `${name}Opt`)], name);
}
exports.requiredOptionalCodec = requiredOptionalCodec;
function extendCodec(parent, required, optional, name) {
    if (typeof optional === 'string') {
        name = optional;
        optional = {};
    }
    const noRequired = (0, guards_1.isEmptyObject)(required);
    const noOptional = (0, guards_1.isEmptyObject)(optional);
    const nameOpt = `${name}Opt`;
    const nameReq = `${name}Req`;
    if (noRequired && noOptional) {
        return parent;
    }
    if (noRequired) {
        return t.intersection([parent, t.partial(optional, nameOpt)], name);
    }
    if (noOptional) {
        return t.intersection([parent, t.type(required, nameReq)], name);
    }
    return t.intersection([parent, t.type(required, nameReq), t.partial(optional, nameOpt)], name);
}
exports.extendCodec = extendCodec;
//# sourceMappingURL=helpers.js.map