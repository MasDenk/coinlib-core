"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairEthereumPayments = void 0;
const lodash_1 = require("lodash");
const BaseEthereumPayments_1 = require("./BaseEthereumPayments");
const bip44_1 = require("./bip44");
const constants_1 = require("./constants");
class KeyPairEthereumPayments extends BaseEthereumPayments_1.BaseEthereumPayments {
    constructor(config) {
        super(config);
        this.addresses = {};
        this.privateKeys = {};
        this.addressIndices = {};
        Object.entries(config.keyPairs).forEach(([key, value]) => {
            if (typeof value === 'undefined' || value === null) {
                return;
            }
            const i = Number.parseInt(key);
            let address;
            let pkey = null;
            if (this.web3.utils.isAddress(value)) {
                address = value.toLowerCase();
            }
            else if (this.isValidPrivateKey(value)) {
                address = this.privateKeyToAddress(value);
            }
            else if (this.isValidXprv(value)) {
                // XXX hardened
                const signatory = (0, bip44_1.deriveSignatory)(value);
                address = signatory.address;
                pkey = signatory.keys.prv;
            }
            else {
                throw new Error(`KeyPairEthereumPaymentsConfig.keyPairs[${i}] is not a valid private key or address`);
            }
            if (typeof this.addressIndices[address] === 'number') {
                return;
            }
            this.addresses[i] = address;
            this.privateKeys[i] = pkey;
            this.addressIndices[address] = i;
        });
    }
    getPublicConfig() {
        return {
            ...(0, lodash_1.omit)(this.getFullConfig(), constants_1.PUBLIC_CONFIG_OMIT_FIELDS),
            keyPairs: this.addresses,
        };
    }
    getAccountId(index) {
        const accountId = this.addresses[index] || '';
        if (!accountId) {
            throw new Error(`No KeyPairEthereumPayments account configured at index ${index}`);
        }
        return accountId;
    }
    getAccountIds() {
        return Object.keys(this.addressIndices);
    }
    async getPayport(index) {
        const address = this.addresses[index] || '';
        if (!this.isValidAddress(address)) {
            throw new Error(`Cannot get address ${index} - keyPair[${index}] is undefined or invalid address`);
        }
        return { address };
    }
    async getPrivateKey(index) {
        const privateKey = this.privateKeys[index] || '';
        if (!this.isValidPrivateKey(privateKey)) {
            throw new Error(`Cannot get private key ${index} - keyPair[${index}] is undefined`);
        }
        return privateKey;
    }
}
exports.KeyPairEthereumPayments = KeyPairEthereumPayments;
exports.default = KeyPairEthereumPayments;
//# sourceMappingURL=KeyPairEthereumPayments.js.map