"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairTronPayments = void 0;
const BaseTronPayments_1 = require("./BaseTronPayments");
const helpers_1 = require("./helpers");
const lodash_1 = require("lodash");
const constants_1 = require("./constants");
class KeyPairTronPayments extends BaseTronPayments_1.BaseTronPayments {
    constructor(config) {
        super(config);
        this.config = config;
        this.addresses = {};
        this.privateKeys = {};
        this.addressIndices = {};
        Object.entries(config.keyPairs).forEach(([iString, addressOrKey]) => {
            if (typeof addressOrKey === 'undefined' || addressOrKey === null) {
                return;
            }
            const i = Number.parseInt(iString);
            if ((0, helpers_1.isValidAddress)(addressOrKey)) {
                this.addresses[i] = addressOrKey;
                this.privateKeys[i] = null;
                this.addressIndices[addressOrKey] = i;
                return;
            }
            if ((0, helpers_1.isValidPrivateKey)(addressOrKey)) {
                const address = (0, helpers_1.privateKeyToAddress)(addressOrKey);
                this.addresses[i] = address;
                this.privateKeys[i] = addressOrKey;
                this.addressIndices[address] = i;
                return;
            }
            throw new Error(`KeyPairTronPaymentsConfig.keyPairs[${i}] is not a valid private key or address`);
        });
    }
    getFullConfig() {
        return this.config;
    }
    getPublicConfig() {
        return {
            ...(0, lodash_1.omit)(this.config, constants_1.PUBLIC_CONFIG_OMIT_FIELDS),
            keyPairs: this.addresses,
        };
    }
    getAccountId(index) {
        const accountId = this.addresses[index];
        if (!accountId) {
            throw new Error(`No KeyPairTronPayments account configured at index ${index}`);
        }
        return accountId;
    }
    getAccountIds() {
        return Object.keys(this.addressIndices);
    }
    async getPayport(index) {
        const address = this.addresses[index];
        if (typeof address === 'undefined') {
            throw new Error(`Cannot get address ${index} - keyPair[${index}] is undefined`);
        }
        return { address };
    }
    async getPrivateKey(index) {
        const privateKey = this.privateKeys[index];
        if (typeof privateKey === 'undefined') {
            throw new Error(`Cannot get private key ${index} - keyPair[${index}] is undefined`);
        }
        if (privateKey === null) {
            throw new Error(`Cannot get private key ${index} - keyPair[${index}] is a public address`);
        }
        return privateKey;
    }
}
exports.KeyPairTronPayments = KeyPairTronPayments;
exports.default = KeyPairTronPayments;
//# sourceMappingURL=KeyPairTronPayments.js.map