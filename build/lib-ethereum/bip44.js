"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidXkey = exports.deriveSignatory = void 0;
const web3_1 = __importDefault(require("web3"));
const ethereumjs_util_1 = require("ethereumjs-util");
const lib_common_1 = require("../lib-common");
const crypto_1 = __importDefault(require("crypto"));
const elliptic_1 = require("elliptic");
const web3 = new web3_1.default();
const ec = new elliptic_1.ec('secp256k1');
class EthereumBIP44 {
    constructor(hdKey) {
        this.parts = [
            'm',
            "44'",
            "60'",
            "0'",
            '0', // 0 - public, 1 = private
            // index
        ];
        this.key = hdKey;
    }
    static fromExtKey(xkey) {
        if (['xprv', 'xpub'].includes(xkey.substring(0, 4))) {
            return new EthereumBIP44(lib_common_1.bip32.fromBase58(xkey));
        }
        throw new Error('Not extended key');
    }
    getAddress(index) {
        const derived = this.deriveByIndex(index);
        const address = (0, ethereumjs_util_1.pubToAddress)(derived.publicKey, true);
        return web3.utils.toChecksumAddress(`0x${address.toString('hex')}`).toLowerCase();
    }
    getPrivateKey(index) {
        const derived = this.deriveByIndex(index);
        if (!derived.privateKey) {
            return '';
        }
        return `0x${derived.privateKey.toString('hex')}`;
    }
    getPublicKey(index) {
        return this.deriveByIndex(index).publicKey.toString('hex');
    }
    getXPrivateKey(index) {
        const key = this.deriveByIndex(index).toBase58();
        return key.substring(0, 4) === 'xpub' ? '' : key;
    }
    getXPublicKey(index) {
        return this.deriveByIndex(index).neutered().toBase58();
    }
    deriveByIndex(index) {
        if (typeof index === 'undefined') {
            return this.key;
        }
        const path = this.parts.slice(this.key.depth);
        const keyPath = path.length > 0 ? path.join('/') + '/' : '';
        return this.key.derivePath(`${keyPath}${index.toString()}`);
    }
}
// XXX if index is not provided, derived key will be hardened
function deriveSignatory(xkey, index) {
    const wallet = xkey
        ? EthereumBIP44.fromExtKey(xkey)
        : EthereumBIP44.fromExtKey(lib_common_1.bip32.fromSeed(crypto_1.default.randomBytes(32)).toBase58());
    return {
        address: wallet.getAddress(index),
        keys: {
            prv: wallet.getPrivateKey(index) || '',
            pub: wallet.getPublicKey(index),
        },
        xkeys: {
            xprv: wallet.getXPrivateKey(index) || '',
            xpub: wallet.getXPublicKey(index),
        },
    };
}
exports.deriveSignatory = deriveSignatory;
function isValidXkey(key) {
    try {
        EthereumBIP44.fromExtKey(key);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidXkey = isValidXkey;
//# sourceMappingURL=bip44.js.map