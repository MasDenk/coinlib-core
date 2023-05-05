"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairBitcoinPayments = void 0;
const lodash_1 = require("lodash");
const ts_common_1 = require("../ts-common");
const SinglesigBitcoinPayments_1 = require("./SinglesigBitcoinPayments");
const helpers_1 = require("./helpers");
const constants_1 = require("./constants");
class KeyPairBitcoinPayments extends SinglesigBitcoinPayments_1.SinglesigBitcoinPayments {
    constructor(config) {
        super(config);
        this.config = config;
        this.publicKeys = {};
        this.privateKeys = {};
        this.addresses = {};
        Object.entries(config.keyPairs).forEach(([key, value]) => {
            if (typeof value === 'undefined' || value === null) {
                return;
            }
            const i = Number.parseInt(key);
            let publicKey;
            let privateKey = null;
            if (this.isValidPublicKey(value)) {
                publicKey = value;
            }
            else if (this.isValidPrivateKey(value)) {
                publicKey = (0, helpers_1.privateKeyToKeyPair)(value, this.bitcoinjsNetwork).publicKey;
                privateKey = value;
            }
            else {
                throw new Error(`KeyPairBitcoinPaymentsConfig.keyPairs[${i}] is not a valid ${this.networkType} private or public key`);
            }
            const address = (0, helpers_1.publicKeyToAddress)(publicKey, this.bitcoinjsNetwork, this.addressType);
            this.publicKeys[i] = (0, helpers_1.publicKeyToString)(publicKey);
            this.privateKeys[i] = privateKey;
            this.addresses[i] = address;
        });
    }
    getFullConfig() {
        return {
            ...this.config,
            network: this.networkType,
            addressType: this.addressType,
        };
    }
    getPublicConfig() {
        return {
            ...(0, lodash_1.omit)(this.getFullConfig(), constants_1.PUBLIC_CONFIG_OMIT_FIELDS),
            keyPairs: this.publicKeys,
        };
    }
    getAccountId(index) {
        const accountId = this.publicKeys[index] || '';
        if (!accountId) {
            throw new Error(`No KeyPairBitcoinPayments account configured at index ${index}`);
        }
        return accountId;
    }
    getAccountIds(index) {
        if (!(0, ts_common_1.isUndefined)(index)) {
            return [this.getAccountId(index)];
        }
        return Object.values(this.publicKeys).filter(ts_common_1.isString);
    }
    getKeyPair(index) {
        const privateKey = this.privateKeys[index];
        if (privateKey) {
            return (0, helpers_1.privateKeyToKeyPair)(privateKey, this.bitcoinjsNetwork);
        }
        const publicKey = this.publicKeys[index] || '';
        if (!this.isValidPublicKey(publicKey)) {
            throw new Error(`Cannot get publicKey ${index} - keyPair[${index}] is undefined or invalid`);
        }
        return (0, helpers_1.publicKeyToKeyPair)(publicKey, this.bitcoinjsNetwork);
    }
    getAddress(index, addressType) {
        const address = this.addresses[index] || '';
        if (!this.isValidAddress(address)) {
            throw new Error(`Cannot get address ${index} - keyPair[${index}] is undefined or invalid address`);
        }
        return address;
    }
    getPrivateKey(index) {
        const privateKey = this.privateKeys[index] || '';
        if (!this.isValidPrivateKey(privateKey)) {
            throw new Error(`Cannot get private key ${index} - keyPair[${index}] is undefined`);
        }
        return privateKey;
    }
}
exports.KeyPairBitcoinPayments = KeyPairBitcoinPayments;
exports.default = KeyPairBitcoinPayments;
//# sourceMappingURL=KeyPairBitcoinPayments.js.map