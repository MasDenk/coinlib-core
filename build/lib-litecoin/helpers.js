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
exports.privateKeyToAddress = exports.publicKeyToAddress = exports.estimateLitecoinTxSize = exports.isValidPrivateKey = exports.isValidPublicKey = exports.standardizeAddress = exports.isValidAddress = exports.isModernP2shAddress = exports.isDeprecatedP2shAddress = exports.toBaseDenominationNumber = exports.toBaseDenominationString = exports.toBaseDenominationBigNumber = exports.toMainDenominationNumber = exports.toMainDenominationString = exports.toMainDenominationBigNumber = exports.privateKeyToKeyPair = exports.publicKeyToBuffer = exports.publicKeyToString = exports.publicKeyToKeyPair = exports.getSinglesigPaymentScript = exports.getMultisigPaymentScript = void 0;
const lib_common_1 = require("../lib-common");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const types_1 = require("./types");
const lib_bitcoin_1 = require("../lib-bitcoin");
const constants_1 = require("./constants");
const { getMultisigPaymentScript, getSinglesigPaymentScript, publicKeyToKeyPair, publicKeyToString, publicKeyToBuffer, privateKeyToKeyPair, } = lib_bitcoin_1.bitcoinish;
exports.getMultisigPaymentScript = getMultisigPaymentScript;
exports.getSinglesigPaymentScript = getSinglesigPaymentScript;
exports.publicKeyToKeyPair = publicKeyToKeyPair;
exports.publicKeyToString = publicKeyToString;
exports.publicKeyToBuffer = publicKeyToBuffer;
exports.privateKeyToKeyPair = privateKeyToKeyPair;
const { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, } = (0, lib_common_1.createUnitConverters)(constants_1.DECIMAL_PLACES);
exports.toMainDenominationBigNumber = toMainDenominationBigNumber;
exports.toMainDenominationString = toMainDenominationString;
exports.toMainDenominationNumber = toMainDenominationNumber;
exports.toBaseDenominationBigNumber = toBaseDenominationBigNumber;
exports.toBaseDenominationString = toBaseDenominationString;
exports.toBaseDenominationNumber = toBaseDenominationNumber;
const ADDRESS_FORMAT_NETWORKS = {
    [types_1.LitecoinAddressFormat.Deprecated]: lib_bitcoin_1.NETWORKS,
    [types_1.LitecoinAddressFormat.Modern]: constants_1.NETWORKS,
};
function isP2shAddressForNetwork(address, network) {
    try {
        const decoded = bitcoin.address.fromBase58Check(address);
        return decoded.version === network.scriptHash;
    }
    catch (e) {
        return false;
    }
}
/**
 * Return true if address is a deprecated p2sh address (bitcoin format)
 * 3-prefix: mainnet
 * 2-prefix: testnet
 */
function isDeprecatedP2shAddress(address, networkType) {
    return isP2shAddressForNetwork(address, lib_bitcoin_1.NETWORKS[networkType]);
}
exports.isDeprecatedP2shAddress = isDeprecatedP2shAddress;
/**
 * Return true if address is a modern p2sh address
 * M-prefix: mainnet
 * Q-prefix: testnet
 */
function isModernP2shAddress(address, networkType) {
    return isP2shAddressForNetwork(address, constants_1.NETWORKS[networkType]);
}
exports.isModernP2shAddress = isModernP2shAddress;
/**
 * defined format: return true if address is valid in provided format
 * undefined format: return true if address is valid in *any* format
 */
function isValidAddress(address, networkType, format) {
    // Validation for modern addresses is the same as Bitcoin just using different network constants
    const isModern = lib_bitcoin_1.bitcoinish.isValidAddress(address, constants_1.NETWORKS[networkType]);
    if (format === types_1.LitecoinAddressFormat.Modern) {
        return isModern;
    }
    else if (format === types_1.LitecoinAddressFormat.Deprecated) {
        return (isModern || isDeprecatedP2shAddress(address, networkType)) && !isModernP2shAddress(address, networkType);
    }
    else {
        return isModern || isDeprecatedP2shAddress(address, networkType);
    }
}
exports.isValidAddress = isValidAddress;
function standardizeAddress(address, networkType, format) {
    if (isValidAddress(address, networkType, format)) {
        return address;
    }
    const fromFormat = format === types_1.LitecoinAddressFormat.Modern ? types_1.LitecoinAddressFormat.Deprecated : types_1.LitecoinAddressFormat.Modern;
    try {
        // Convert between p2sh legacy `3` prefix and modern `M` prefix
        const decoded = bitcoin.address.fromBase58Check(address);
        const fromNetwork = ADDRESS_FORMAT_NETWORKS[fromFormat][networkType];
        const toNetwork = ADDRESS_FORMAT_NETWORKS[format][networkType];
        if (decoded.version === fromNetwork.scriptHash) {
            return bitcoin.address.toBase58Check(decoded.hash, toNetwork.scriptHash);
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
exports.standardizeAddress = standardizeAddress;
function isValidPublicKey(publicKey, networkType) {
    return lib_bitcoin_1.bitcoinish.isValidPublicKey(publicKey, constants_1.NETWORKS[networkType]);
}
exports.isValidPublicKey = isValidPublicKey;
function isValidPrivateKey(privateKey, networkType) {
    return lib_bitcoin_1.bitcoinish.isValidPrivateKey(privateKey, constants_1.NETWORKS[networkType]);
}
exports.isValidPrivateKey = isValidPrivateKey;
function estimateLitecoinTxSize(inputCounts, outputCounts, networkType) {
    return lib_bitcoin_1.bitcoinish.estimateTxSize(inputCounts, outputCounts, (address) => bitcoin.address.toOutputScript(
    // Modern format needed so address matches the bitcoinjs network
    standardizeAddress(address, networkType, types_1.LitecoinAddressFormat.Modern) || '', constants_1.NETWORKS[networkType]));
}
exports.estimateLitecoinTxSize = estimateLitecoinTxSize;
function publicKeyToAddress(publicKey, networkType, addressType, format) {
    const address = lib_bitcoin_1.bitcoinish.publicKeyToAddress(publicKey, constants_1.NETWORKS[networkType], addressType);
    const standardAddress = standardizeAddress(address, networkType, format);
    if (!standardAddress) {
        throw new Error('Failed to standardize derived LTC address');
    }
    return standardAddress;
}
exports.publicKeyToAddress = publicKeyToAddress;
function privateKeyToAddress(privateKey, networkType, addressType, format) {
    const keyPair = privateKeyToKeyPair(privateKey, constants_1.NETWORKS[networkType]);
    return publicKeyToAddress(keyPair.publicKey, networkType, addressType, format);
}
exports.privateKeyToAddress = privateKeyToAddress;
//# sourceMappingURL=helpers.js.map