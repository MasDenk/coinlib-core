"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKeyToAddress = exports.isValidPrivateKey = exports.isValidExtraId = exports.isValidAddress = exports.isValidXpub = exports.isValidXprv = exports.toBaseDenominationNumber = exports.toBaseDenominationString = exports.toBaseDenominationBigNumber = exports.toMainDenominationNumber = exports.toMainDenominationString = exports.toMainDenominationBigNumber = void 0;
const tronweb_1 = __importDefault(require("tronweb"));
const constants_1 = require("./constants");
const lib_common_1 = require("../lib-common");
const { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, } = (0, lib_common_1.createUnitConverters)(constants_1.DECIMAL_PLACES);
exports.toMainDenominationBigNumber = toMainDenominationBigNumber;
exports.toMainDenominationString = toMainDenominationString;
exports.toMainDenominationNumber = toMainDenominationNumber;
exports.toBaseDenominationBigNumber = toBaseDenominationBigNumber;
exports.toBaseDenominationString = toBaseDenominationString;
exports.toBaseDenominationNumber = toBaseDenominationNumber;
function isValidXprv(xprv) {
    return xprv.startsWith('xprv');
}
exports.isValidXprv = isValidXprv;
function isValidXpub(xpub) {
    return xpub.startsWith('xpub');
}
exports.isValidXpub = isValidXpub;
function isValidAddress(address) {
    return tronweb_1.default.isAddress(address);
}
exports.isValidAddress = isValidAddress;
function isValidExtraId(extraId) {
    return false;
}
exports.isValidExtraId = isValidExtraId;
function isValidPrivateKey(privateKey) {
    try {
        privateKeyToAddress(privateKey);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidPrivateKey = isValidPrivateKey;
function privateKeyToAddress(privateKey) {
    const address = tronweb_1.default.address.fromPrivateKey(privateKey);
    if (isValidAddress(address)) {
        return address;
    }
    else {
        throw new Error('Validation failed for address derived from private key');
    }
}
exports.privateKeyToAddress = privateKeyToAddress;
//# sourceMappingURL=helpers.js.map