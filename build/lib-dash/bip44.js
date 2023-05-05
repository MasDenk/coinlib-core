"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHdKey = exports.isValidXpub = exports.isValidXprv = exports.xprvToXpub = exports.derivePrivateKey = exports.deriveAddress = exports.deriveKeyPair = exports.deriveHDNode = exports.splitDerivationPath = exports.convertXPrefixHdKeys = void 0;
const lib_bitcoin_1 = require("../lib-bitcoin");
const lib_common_1 = require("../lib-common");
const helpers_1 = require("./helpers");
const constants_1 = require("./constants");
const convertXPrefixHdKeys = lib_bitcoin_1.bitcoinish.convertXPrefixHdKeys;
exports.convertXPrefixHdKeys = convertXPrefixHdKeys;
/**
 * Split full path into array of indices
 *
 * @example "m/44'/0'/0'/1/23" -> ["44'", "0'", "0'", "1", "23"]
 */
function splitDerivationPath(path) {
    const parts = path.split('/');
    if (parts[0] === 'm') {
        return parts.slice(1);
    }
    return parts;
}
exports.splitDerivationPath = splitDerivationPath;
/**
 * Derive the base HDNode required for deriveKeyPair, deriveAddress, and derivePrivateKey functions
 *
 * This partially applies the derivation path starting at the already derived depth of the provided key.
 */
function deriveHDNode(hdKey, derivationPath, network) {
    if (network) {
        hdKey = lib_bitcoin_1.bitcoinish.convertXPrefixHdKeys(hdKey, network);
    }
    const rootNode = lib_common_1.bip32.fromBase58(hdKey, network);
    const parts = splitDerivationPath(derivationPath).slice(rootNode.depth);
    let node = rootNode;
    if (parts.length > 0) {
        node = rootNode.derivePath(parts.join('/'));
    }
    return node;
}
exports.deriveHDNode = deriveHDNode;
function deriveKeyPair(baseNode, index, network) {
    return baseNode.derive(0).derive(index);
}
exports.deriveKeyPair = deriveKeyPair;
function deriveAddress(baseNode, index, network) {
    const keyPair = deriveKeyPair(baseNode, index, network);
    return (0, helpers_1.publicKeyToAddress)(keyPair.publicKey, network, constants_1.SINGLESIG_ADDRESS_TYPE);
}
exports.deriveAddress = deriveAddress;
function derivePrivateKey(baseNode, index, network) {
    const keyPair = deriveKeyPair(baseNode, index, network);
    return keyPair.toWIF();
}
exports.derivePrivateKey = derivePrivateKey;
function xprvToXpub(xprv, derivationPath, network) {
    const node = deriveHDNode(xprv, derivationPath, network);
    return node.neutered().toBase58();
}
exports.xprvToXpub = xprvToXpub;
function isValidXprv(xprv, network) {
    try {
        return !lib_common_1.bip32.fromBase58(xprv, network).isNeutered();
    }
    catch (e) {
        return false;
    }
}
exports.isValidXprv = isValidXprv;
function isValidXpub(xpub, network) {
    try {
        return lib_common_1.bip32.fromBase58(xpub, network).isNeutered();
    }
    catch (e) {
        return false;
    }
}
exports.isValidXpub = isValidXpub;
/** Return string error if invalid, undefined otherwise */
function validateHdKey(hdKey, network) {
    try {
        lib_common_1.bip32.fromBase58(hdKey, network);
    }
    catch (e) {
        return e.toString();
    }
}
exports.validateHdKey = validateHdKey;
//# sourceMappingURL=bip44.js.map