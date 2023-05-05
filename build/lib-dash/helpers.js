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
exports.estimateDashTxSize = exports.isValidPrivateKey = exports.isValidExtraId = exports.isValidPublicKey = exports.standardizeAddress = exports.isValidAddress = exports.toBaseDenominationNumber = exports.toBaseDenominationString = exports.toBaseDenominationBigNumber = exports.toMainDenominationNumber = exports.toMainDenominationString = exports.toMainDenominationBigNumber = exports.privateKeyToAddress = exports.privateKeyToKeyPair = exports.publicKeyToBuffer = exports.publicKeyToString = exports.publicKeyToKeyPair = exports.publicKeyToAddress = exports.getSinglesigPaymentScript = exports.getMultisigPaymentScript = void 0;
const lib_common_1 = require("../lib-common");
const lib_bitcoin_1 = require("../lib-bitcoin");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const constants_1 = require("./constants");
const { getMultisigPaymentScript, getSinglesigPaymentScript, publicKeyToAddress, publicKeyToKeyPair, publicKeyToString, publicKeyToBuffer, privateKeyToKeyPair, privateKeyToAddress, } = lib_bitcoin_1.bitcoinish;
exports.getMultisigPaymentScript = getMultisigPaymentScript;
exports.getSinglesigPaymentScript = getSinglesigPaymentScript;
exports.publicKeyToAddress = publicKeyToAddress;
exports.publicKeyToKeyPair = publicKeyToKeyPair;
exports.publicKeyToString = publicKeyToString;
exports.publicKeyToBuffer = publicKeyToBuffer;
exports.privateKeyToKeyPair = privateKeyToKeyPair;
exports.privateKeyToAddress = privateKeyToAddress;
const { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, } = (0, lib_common_1.createUnitConverters)(constants_1.DECIMAL_PLACES);
exports.toMainDenominationBigNumber = toMainDenominationBigNumber;
exports.toMainDenominationString = toMainDenominationString;
exports.toMainDenominationNumber = toMainDenominationNumber;
exports.toBaseDenominationBigNumber = toBaseDenominationBigNumber;
exports.toBaseDenominationString = toBaseDenominationString;
exports.toBaseDenominationNumber = toBaseDenominationNumber;
function isValidAddress(address, networkType) {
    return lib_bitcoin_1.bitcoinish.isValidAddress(address, constants_1.NETWORKS[networkType]);
}
exports.isValidAddress = isValidAddress;
function standardizeAddress(address, networkType) {
    return lib_bitcoin_1.bitcoinish.standardizeAddress(address, constants_1.NETWORKS[networkType]);
}
exports.standardizeAddress = standardizeAddress;
function isValidPublicKey(publicKey, networkType) {
    return lib_bitcoin_1.bitcoinish.isValidPublicKey(publicKey, constants_1.NETWORKS[networkType]);
}
exports.isValidPublicKey = isValidPublicKey;
function isValidExtraId(extraId) {
    return false;
}
exports.isValidExtraId = isValidExtraId;
function isValidPrivateKey(privateKey, networkType) {
    return lib_bitcoin_1.bitcoinish.isValidPrivateKey(privateKey, constants_1.NETWORKS[networkType]);
}
exports.isValidPrivateKey = isValidPrivateKey;
function estimateDashTxSize(inputCounts, outputCounts, networkType) {
    return lib_bitcoin_1.bitcoinish.estimateTxSize(inputCounts, outputCounts, (address) => bitcoin.address.toOutputScript(address, constants_1.NETWORKS[networkType]));
}
exports.estimateDashTxSize = estimateDashTxSize;
//# sourceMappingURL=helpers.js.map