"use strict";
// Many parts of this code are snippets from tronWeb:
// https://github.com/tronprotocol/tron-web/blob/master/src/index.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyToAddress = exports.hdNodeToPrivateKey = exports.hdNodeToPublicKey = exports.generateNewKeys = exports.xprvToXpub = exports.deriveSignatory = exports.derivationPath = exports.base58 = exports.RIPPLE_B58_DICT = void 0;
const lib_common_1 = require("../lib-common");
const base_x_1 = __importDefault(require("base-x"));
const utils_1 = require("./utils");
const crypto_1 = __importDefault(require("crypto"));
exports.RIPPLE_B58_DICT = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';
exports.base58 = (0, base_x_1.default)(exports.RIPPLE_B58_DICT);
exports.derivationPath = "m/44'/144'/0'";
const derivationPathParts = exports.derivationPath.split('/').slice(1);
function deriveSignatory(hdKey, index) {
    const key = lib_common_1.bip32.fromBase58(hdKey);
    const derived = deriveBasePath(key).derive(0).derive(index);
    const privateKey = derived.isNeutered() ? '' : hdNodeToPrivateKey(derived);
    const publicKey = hdNodeToPublicKey(derived);
    const address = publicKeyToAddress(publicKey);
    return {
        address,
        secret: {
            privateKey,
            publicKey,
        },
    };
}
exports.deriveSignatory = deriveSignatory;
function xprvToXpub(xprv) {
    const key = typeof xprv === 'string' ? lib_common_1.bip32.fromBase58(xprv) : xprv;
    const derivedPubKey = deriveBasePath(key);
    return derivedPubKey.neutered().toBase58();
}
exports.xprvToXpub = xprvToXpub;
function generateNewKeys() {
    const key = lib_common_1.bip32.fromSeed(crypto_1.default.randomBytes(32));
    const xprv = key.toBase58();
    const xpub = xprvToXpub(xprv);
    return {
        xprv,
        xpub,
    };
}
exports.generateNewKeys = generateNewKeys;
// HELPER FUNCTIONS
function deriveBasePath(key) {
    const parts = derivationPathParts.slice(key.depth);
    if (parts.length > 0) {
        return key.derivePath(`m/${parts.join('/')}`);
    }
    return key;
}
function hdNodeToPublicKey(key) {
    const hexKey = (0, utils_1.padLeft)(key.publicKey.toString('hex'), 66, '0');
    return hexKey.toUpperCase();
}
exports.hdNodeToPublicKey = hdNodeToPublicKey;
function hdNodeToPrivateKey(key) {
    if (key.isNeutered() || typeof key.privateKey === 'undefined') {
        throw new Error('Cannot derive private key from neutered bip32 node');
    }
    const hexKey = (0, utils_1.padLeft)(key.privateKey.toString('hex'), 64, '0');
    return hexKey.toUpperCase();
}
exports.hdNodeToPrivateKey = hdNodeToPrivateKey;
/**
 * Source: https://xrpl.org/accounts.html#address-encoding
 */
function publicKeyToAddress(pubkeyHex) {
    const pubkeyBuffer = Buffer.from(pubkeyHex, 'hex');
    const pubkeyInnerHash = crypto_1.default.createHash('sha256').update(pubkeyBuffer);
    const pubkeyOuterHash = crypto_1.default.createHash('ripemd160');
    pubkeyOuterHash.update(pubkeyInnerHash.digest());
    const accountId = pubkeyOuterHash.digest();
    const addressTypePrefix = Buffer.from([0x00]);
    const payload = Buffer.concat([addressTypePrefix, accountId]);
    const chksumHash1 = crypto_1.default.createHash('sha256').update(payload).digest();
    const chksumHash2 = crypto_1.default.createHash('sha256').update(chksumHash1).digest();
    const checksum = chksumHash2.slice(0, 4);
    const dataToEncode = Buffer.concat([payload, checksum]);
    const address = exports.base58.encode(dataToEncode);
    return address;
}
exports.publicKeyToAddress = publicKeyToAddress;
//# sourceMappingURL=bip44.js.map