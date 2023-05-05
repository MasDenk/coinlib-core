"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigDashPayments = void 0;
const BaseDashPayments_1 = require("./BaseDashPayments");
const types_1 = require("./types");
const lodash_1 = require("lodash");
const HdDashPayments_1 = require("./HdDashPayments");
const KeyPairDashPayments_1 = require("./KeyPairDashPayments");
const lib_bitcoin_1 = require("../lib-bitcoin");
const helpers_1 = require("./helpers");
const constants_1 = require("./constants");
class MultisigDashPayments extends BaseDashPayments_1.BaseDashPayments {
    constructor(config) {
        super(config);
        this.config = config;
        this.accountIdToSigner = {};
        this.addressType = config.addressType || constants_1.DEFAULT_MULTISIG_ADDRESS_TYPE;
        this.m = config.m;
        this.signers = config.signers.map((signerConfig, i) => {
            signerConfig = {
                network: this.networkType,
                logger: this.logger,
                ...signerConfig,
            };
            if (signerConfig.network !== this.networkType) {
                throw new Error(`MultisigDashPayments is on network ${this.networkType} but signer config ${i} is on ${signerConfig.network}`);
            }
            const payments = types_1.HdDashPaymentsConfig.is(signerConfig)
                ? new HdDashPayments_1.HdDashPayments(signerConfig)
                : new KeyPairDashPayments_1.KeyPairDashPayments(signerConfig);
            payments.getAccountIds().forEach((accountId) => {
                this.accountIdToSigner[accountId] = payments;
            });
            return payments;
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
            ...(0, lodash_1.omit)(this.getFullConfig(), ['logger', 'server', 'signers']),
            signers: this.signers.map((signer) => signer.getPublicConfig()),
        };
    }
    getEstimateTxSizeInputKey() {
        return `${this.addressType}:${this.m}-${this.signers.length}`;
    }
    getAccountId(index) {
        throw new Error('Multisig payments does not have single account for an index, use getAccountIds(index) instead');
    }
    getAccountIds(index) {
        return this.signers.reduce((result, signer) => [...result, ...signer.getAccountIds(index)], []);
    }
    getSignerPublicKeyBuffers(index) {
        return this.signers.map((signer) => signer.getKeyPair(index).publicKey);
    }
    getPaymentScript(index, addressType) {
        return (0, helpers_1.getMultisigPaymentScript)(this.bitcoinjsNetwork, addressType || this.addressType, this.getSignerPublicKeyBuffers(index), this.m);
    }
    getAddress(index, addressType) {
        const { address } = this.getPaymentScript(index, addressType);
        if (!address) {
            throw new Error('bitcoinjs-lib address derivation returned falsy value');
        }
        return address;
    }
    async createTransaction(from, to, amount, options) {
        const tx = await super.createTransaction(from, to, amount, options);
        return {
            ...tx,
            multisigData: lib_bitcoin_1.bitcoinish.createMultisigData(tx.inputUtxos, this.signers, this.m),
        };
    }
    async createMultiOutputTransaction(from, to, options = {}) {
        const tx = await super.createMultiOutputTransaction(from, to, options);
        return {
            ...tx,
            multisigData: lib_bitcoin_1.bitcoinish.createMultisigData(tx.inputUtxos, this.signers, this.m),
        };
    }
    async createMultiInputTransaction(from, to, options = {}) {
        const tx = await super.createMultiInputTransaction(from, to, options);
        return {
            ...tx,
            multisigData: lib_bitcoin_1.bitcoinish.createMultisigData(tx.inputUtxos, this.signers, this.m),
        };
    }
    async createSweepTransaction(from, to, options = {}) {
        const tx = await super.createSweepTransaction(from, to, options);
        return {
            ...tx,
            multisigData: lib_bitcoin_1.bitcoinish.createMultisigData(tx.inputUtxos, this.signers, this.m),
        };
    }
    /**
     * Combines two of more partially signed transactions. Once the required # of signatures is reached (`m`)
     * the transaction is validated and finalized.
     */
    async combinePartiallySignedTransactions(txs) {
        const { baseTx, combinedPsbt, updatedMultisigData } = lib_bitcoin_1.bitcoinish.preCombinePartiallySignedTransactions(txs, this.psbtOptions);
        return lib_bitcoin_1.bitcoinish.updateSignedMultisigTx(baseTx, combinedPsbt, updatedMultisigData);
    }
    async signTransaction(tx) {
        const partiallySignedTxs = await Promise.all(this.signers.map((signer) => signer.signTransaction(tx)));
        return this.combinePartiallySignedTransactions(partiallySignedTxs);
    }
    getSupportedAddressTypes() {
        return [types_1.AddressType.MultisigLegacy];
    }
}
exports.MultisigDashPayments = MultisigDashPayments;
exports.default = MultisigDashPayments;
//# sourceMappingURL=MultisigDashPayments.js.map