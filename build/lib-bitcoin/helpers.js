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
exports.estimateBitcoinTxSize = exports.isValidPrivateKey = exports.isValidExtraId = exports.isValidPublicKey = exports.standardizeAddress = exports.isValidAddress = exports.toBaseDenominationNumber = exports.toBaseDenominationString = exports.toBaseDenominationBigNumber = exports.toMainDenominationNumber = exports.toMainDenominationString = exports.toMainDenominationBigNumber = exports.privateKeyToAddress = exports.privateKeyToKeyPair = exports.publicKeyToBuffer = exports.publicKeyToString = exports.publicKeyToKeyPair = exports.publicKeyToAddress = exports.getSinglesigPaymentScript = exports.getMultisigPaymentScript = void 0;
const lib_common_1 = require("../lib-common");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const constants_1 = require("./constants");
const bitcoinish = __importStar(require("./bitcoinish"));
var bitcoinish_1 = require("./bitcoinish");
Object.defineProperty(exports, "getMultisigPaymentScript", { enumerable: true, get: function () { return bitcoinish_1.getMultisigPaymentScript; } });
Object.defineProperty(exports, "getSinglesigPaymentScript", { enumerable: true, get: function () { return bitcoinish_1.getSinglesigPaymentScript; } });
Object.defineProperty(exports, "publicKeyToAddress", { enumerable: true, get: function () { return bitcoinish_1.publicKeyToAddress; } });
Object.defineProperty(exports, "publicKeyToKeyPair", { enumerable: true, get: function () { return bitcoinish_1.publicKeyToKeyPair; } });
Object.defineProperty(exports, "publicKeyToString", { enumerable: true, get: function () { return bitcoinish_1.publicKeyToString; } });
Object.defineProperty(exports, "publicKeyToBuffer", { enumerable: true, get: function () { return bitcoinish_1.publicKeyToBuffer; } });
Object.defineProperty(exports, "privateKeyToKeyPair", { enumerable: true, get: function () { return bitcoinish_1.privateKeyToKeyPair; } });
Object.defineProperty(exports, "privateKeyToAddress", { enumerable: true, get: function () { return bitcoinish_1.privateKeyToAddress; } });
const { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, } = (0, lib_common_1.createUnitConverters)(constants_1.DECIMAL_PLACES);
exports.toMainDenominationBigNumber = toMainDenominationBigNumber;
exports.toMainDenominationString = toMainDenominationString;
exports.toMainDenominationNumber = toMainDenominationNumber;
exports.toBaseDenominationBigNumber = toBaseDenominationBigNumber;
exports.toBaseDenominationString = toBaseDenominationString;
exports.toBaseDenominationNumber = toBaseDenominationNumber;
function isValidAddress(address, networkType) {
    return bitcoinish.isValidAddress(address, constants_1.NETWORKS[networkType]);
}
exports.isValidAddress = isValidAddress;
function standardizeAddress(address, networkType) {
    return bitcoinish.standardizeAddress(address, constants_1.NETWORKS[networkType]);
}
exports.standardizeAddress = standardizeAddress;
function isValidPublicKey(publicKey, networkType) {
    return bitcoinish.isValidPublicKey(publicKey, constants_1.NETWORKS[networkType]);
}
exports.isValidPublicKey = isValidPublicKey;
function isValidExtraId(extraId) {
    return bitcoinish.isValidExtraId(extraId);
}
exports.isValidExtraId = isValidExtraId;
function isValidPrivateKey(privateKey, networkType) {
    return bitcoinish.isValidPrivateKey(privateKey, constants_1.NETWORKS[networkType]);
}
exports.isValidPrivateKey = isValidPrivateKey;
function estimateBitcoinTxSize(inputCounts, outputCounts, networkType) {
    return bitcoinish.estimateTxSize(inputCounts, outputCounts, (address) => bitcoin.address.toOutputScript(address, constants_1.NETWORKS[networkType]));
}
exports.estimateBitcoinTxSize = estimateBitcoinTxSize;
//# sourceMappingURL=helpers.js.map