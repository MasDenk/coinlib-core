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
exports.enumCodec = exports.EnumType = void 0;
const t = __importStar(require("io-ts"));
class EnumType extends t.Type {
    constructor(name, is, validate, encode) {
        super(name, is, validate, encode);
        this._tag = 'EnumType';
    }
}
exports.EnumType = EnumType;
/**
 * Creates an io-ts runtime type based off a typescript enum `e`
 */
function enumCodec(e, name, defaultValue) {
    const keyed = {};
    Object.values(e).forEach((v) => {
        keyed[v] = null;
    });
    const valueUnion = t.keyof(keyed);
    return new EnumType(name, (u) => valueUnion.is(u), (u, c) => {
        const validation = valueUnion.validate(u, c);
        if (validation.isRight()) {
            return validation;
        }
        else if (typeof defaultValue !== 'undefined' && typeof u === 'string') {
            return t.success(defaultValue);
        }
        else {
            return t.failure(u, c);
        }
    }, t.identity);
}
exports.enumCodec = enumCodec;
//# sourceMappingURL=Enum.js.map