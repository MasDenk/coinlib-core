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
exports.assertValidExtraIdOrNil = exports.assertValidExtraId = exports.assertValidAddress = exports.isValidSecret = exports.isValidExtraId = exports.isValidAddress = exports.toBaseDenominationNumber = exports.toBaseDenominationString = exports.toBaseDenominationBigNumber = exports.toMainDenominationNumber = exports.toMainDenominationString = exports.toMainDenominationBigNumber = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const Stellar = __importStar(require("stellar-sdk"));
const constants_1 = require("./constants");
const { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, } = (0, lib_common_1.createUnitConverters)(constants_1.DECIMAL_PLACES);
exports.toMainDenominationBigNumber = toMainDenominationBigNumber;
exports.toMainDenominationString = toMainDenominationString;
exports.toMainDenominationNumber = toMainDenominationNumber;
exports.toBaseDenominationBigNumber = toBaseDenominationBigNumber;
exports.toBaseDenominationString = toBaseDenominationString;
exports.toBaseDenominationNumber = toBaseDenominationNumber;
function isValidAddress(address) {
    return (0, ts_common_1.isString)(address) && Stellar.StrKey.isValidEd25519PublicKey(address);
}
exports.isValidAddress = isValidAddress;
function isValidExtraId(extraId) {
    return (0, ts_common_1.isString)(extraId);
}
exports.isValidExtraId = isValidExtraId;
function isValidSecret(secret) {
    return (0, ts_common_1.isString)(secret) && Stellar.StrKey.isValidEd25519SecretSeed(secret);
}
exports.isValidSecret = isValidSecret;
function assertValidAddress(address) {
    if (!isValidAddress(address)) {
        throw new Error(`Invalid stellar address: ${address}`);
    }
}
exports.assertValidAddress = assertValidAddress;
function assertValidExtraId(extraId) {
    if (!isValidExtraId(extraId)) {
        throw new Error(`Invalid stellar extraId: ${extraId}`);
    }
}
exports.assertValidExtraId = assertValidExtraId;
function assertValidExtraIdOrNil(extraId) {
    if (!(0, ts_common_1.isNil)(extraId) && !isValidExtraId(extraId)) {
        throw new Error(`Invalid stellar extraId: ${extraId}`);
    }
}
exports.assertValidExtraIdOrNil = assertValidExtraIdOrNil;
//# sourceMappingURL=helpers.js.map