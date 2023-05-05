"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHdKey = exports.isValidXpub = exports.isValidXprv = exports.xprvToXpub = exports.derivePrivateKey = exports.deriveAddress = exports.deriveKeyPair = exports.deriveHDNode = exports.splitDerivationPath = exports.convertXPrefixHdKeys = void 0;
const lib_bitcoin_1 = require("../lib-bitcoin");
const helpers_1 = require("./helpers");
const lib_common_1 = require("../lib-common");
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
function deriveHDNode(hdKey, derivationPath, networkType) {
    const network = constants_1.NETWORKS[networkType];
    const rootNode = lib_common_1.bip32.fromBase58(lib_bitcoin_1.bitcoinish.convertXPrefixHdKeys(hdKey, network), network);
    const parts = splitDerivationPath(derivationPath).slice(rootNode.depth);
    let node = rootNode;
    if (parts.length > 0) {
        node = rootNode.derivePath(parts.join('/'));
    }
    return node;
}
exports.deriveHDNode = deriveHDNode;
function deriveKeyPair(baseNode, index) {
    return baseNode.derive(0).derive(index);
}
exports.deriveKeyPair = deriveKeyPair;
function deriveAddress(baseNode, index, networkType, addressType, format) {
    const keyPair = deriveKeyPair(baseNode, index);
    return (0, helpers_1.publicKeyToAddress)(keyPair.publicKey, networkType, addressType, format);
}
exports.deriveAddress = deriveAddress;
function derivePrivateKey(baseNode, index) {
    const keyPair = deriveKeyPair(baseNode, index);
    return keyPair.toWIF();
}
exports.derivePrivateKey = derivePrivateKey;
function xprvToXpub(xprv, derivationPath, networkType) {
    const node = deriveHDNode(xprv, derivationPath, networkType);
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