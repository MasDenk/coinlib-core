"use strict";
// Many parts of this code are snippets from tronWeb:
// https://github.com/tronprotocol/tron-web/blob/master/src/index.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewKeys = exports.xprvToXpub = exports.derivePrivateKey = exports.deriveAddress = exports.derivationPath = void 0;
const lib_common_1 = require("../lib-common");
const js_sha3_1 = require("js-sha3");
const jssha_1 = __importDefault(require("jssha"));
const elliptic_1 = require("elliptic");
const crypto_1 = __importDefault(require("crypto"));
const base58_1 = require("./base58");
const helpers_1 = require("./helpers");
const ec = new elliptic_1.ec('secp256k1');
exports.derivationPath = "m/44'/195'/0'";
const derivationPathParts = exports.derivationPath.split('/').slice(1);
function deriveAddress(xpub, index) {
    if (!(0, helpers_1.isValidXpub)(xpub)) {
        throw new Error('Invalid xpub');
    }
    const key = lib_common_1.bip32.fromBase58(xpub);
    const derived = deriveBasePath(key).derive(0).derive(index);
    return hdPublicKeyToAddress(derived);
}
exports.deriveAddress = deriveAddress;
function derivePrivateKey(xprv, index) {
    if (!(0, helpers_1.isValidXprv)(xprv)) {
        throw new Error('Invalid xprv');
    }
    const key = lib_common_1.bip32.fromBase58(xprv);
    const derived = deriveBasePath(key).derive(0).derive(index);
    return hdPrivateKeyToPrivateKey(derived);
}
exports.derivePrivateKey = derivePrivateKey;
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
function hdPublicKeyToAddress(key) {
    return addressBytesToB58CheckAddress(pubBytesToTronBytes(bip32PublicToTronPublic(key.publicKey)));
}
function hdPrivateKeyToPrivateKey(key) {
    if (key.isNeutered() || typeof key.privateKey === 'undefined') {
        throw new Error('Invalid HD private key, must not be neutered');
    }
    return bip32PrivateToTronPrivate(key.privateKey);
}
function bip32PublicToTronPublic(pubKey) {
    const pubkey = ec.keyFromPublic(pubKey).getPublic();
    const x = pubkey.getX();
    const y = pubkey.getY();
    let xHex = x.toString('hex');
    while (xHex.length < 64) {
        xHex = `0${xHex}`;
    }
    let yHex = y.toString('hex');
    while (yHex.length < 64) {
        yHex = `0${yHex}`;
    }
    const pubkeyHex = `04${xHex}${yHex}`;
    const pubkeyBytes = hexStr2byteArray(pubkeyHex);
    return pubkeyBytes;
}
function bip32PrivateToTronPrivate(priKeyBytes) {
    const key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    let priKeyHex = key.getPrivate('hex');
    while (priKeyHex.length < 64) {
        priKeyHex = `0${priKeyHex}`;
    }
    const privArray = hexStr2byteArray(priKeyHex);
    return byteArray2hexStr(privArray);
}
// Borrowed from tronweb:  https://github.com/tronprotocol/tron-web/blob/master/src/utils/code.js
const ADDRESS_PREFIX = '41';
function byte2hexStr(byte) {
    const hexByteMap = '0123456789ABCDEF';
    let str = '';
    str += hexByteMap.charAt(byte >> 4);
    str += hexByteMap.charAt(byte & 0x0f);
    return str;
}
function hexStr2byteArray(str) {
    const byteArray = [];
    let d = 0;
    let j = 0;
    let k = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        if (isHexChar(c)) {
            d <<= 4;
            d += hexChar2byte(c);
            j++;
            if (j % 2 === 0) {
                byteArray[k++] = d;
                d = 0;
            }
        }
    }
    return byteArray;
}
function isHexChar(c) {
    return (c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f') || (c >= '0' && c <= '9');
}
function hexChar2byte(c) {
    let d = 0;
    if (c >= 'A' && c <= 'F') {
        d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    }
    else if (c >= 'a' && c <= 'f') {
        d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    }
    else if (c >= '0' && c <= '9') {
        d = c.charCodeAt(0) - '0'.charCodeAt(0);
    }
    return d;
}
function byteArray2hexStr(byteArray) {
    let str = '';
    for (let i = 0; i < byteArray.length; i++) {
        str += byte2hexStr(byteArray[i]);
    }
    return str;
}
function pubBytesToTronBytes(pubBytes) {
    if (pubBytes.length === 65) {
        pubBytes = pubBytes.slice(1);
    }
    const hash = (0, js_sha3_1.keccak_256)(pubBytes).toString();
    const addressHex = `${ADDRESS_PREFIX}${hash.substring(24)}`;
    return hexStr2byteArray(addressHex);
}
function addressBytesToB58CheckAddress(addressBytes) {
    const hash0 = SHA256(addressBytes);
    const hash1 = SHA256(hash0);
    let checkSum = hash1.slice(0, 4);
    checkSum = addressBytes.concat(checkSum);
    return (0, base58_1.encode58)(checkSum);
}
function SHA256(msgBytes) {
    const shaObj = new jssha_1.default('SHA-256', 'HEX');
    const msgHex = byteArray2hexStr(msgBytes);
    shaObj.update(msgHex);
    const hashHex = shaObj.getHash('HEX');
    return hexStr2byteArray(hashHex);
}
//# sourceMappingURL=bip44.js.map