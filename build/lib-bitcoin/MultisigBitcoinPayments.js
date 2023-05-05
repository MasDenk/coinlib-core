"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigBitcoinPayments = void 0;
const BaseBitcoinPayments_1 = require("./BaseBitcoinPayments");
const types_1 = require("./types");
const lodash_1 = require("lodash");
const HdBitcoinPayments_1 = require("./HdBitcoinPayments");
const KeyPairBitcoinPayments_1 = require("./KeyPairBitcoinPayments");
const helpers_1 = require("./helpers");
const constants_1 = require("./constants");
const bitcoinish_1 = require("./bitcoinish");
class MultisigBitcoinPayments extends BaseBitcoinPayments_1.BaseBitcoinPayments {
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
                throw new Error(`MultisigBitcoinPayments is on network ${this.networkType} but signer config ${i} is on ${signerConfig.network}`);
            }
            const payments = types_1.HdBitcoinPaymentsConfig.is(signerConfig)
                ? new HdBitcoinPayments_1.HdBitcoinPayments(signerConfig)
                : new KeyPairBitcoinPayments_1.KeyPairBitcoinPayments(signerConfig);
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
            throw new Error('bitcoinjs-lib-bigint address derivation returned falsy value');
        }
        return address;
    }
    async createTransaction(from, to, amount, options) {
        const tx = await super.createTransaction(from, to, amount, options);
        return {
            ...tx,
            multisigData: (0, bitcoinish_1.createMultisigData)(tx.inputUtxos, this.signers, this.m),
        };
    }
    async createMultiOutputTransaction(from, to, options = {}) {
        const tx = await super.createMultiOutputTransaction(from, to, options);
        return {
            ...tx,
            multisigData: (0, bitcoinish_1.createMultisigData)(tx.inputUtxos, this.signers, this.m),
        };
    }
    async createMultiInputTransaction(from, to, options = {}) {
        const tx = await super.createMultiInputTransaction(from, to, options);
        return {
            ...tx,
            multisigData: (0, bitcoinish_1.createMultisigData)(tx.inputUtxos, this.signers, this.m),
        };
    }
    async createSweepTransaction(from, to, options = {}) {
        const tx = await super.createSweepTransaction(from, to, options);
        return {
            ...tx,
            multisigData: (0, bitcoinish_1.createMultisigData)(tx.inputUtxos, this.signers, this.m),
        };
    }
    /**
     * Combines two of more partially signed transactions. Once the required # of signatures is reached (`m`)
     * the transaction is validated and finalized.
     */
    async combinePartiallySignedTransactions(txs) {
        const { baseTx, combinedPsbt, updatedMultisigData } = (0, bitcoinish_1.preCombinePartiallySignedTransactions)(txs, this.psbtOptions);
        return (0, bitcoinish_1.updateSignedMultisigTx)(baseTx, combinedPsbt, updatedMultisigData);
    }
    async signTransaction(tx) {
        const partiallySignedTxs = await Promise.all(this.signers.map((signer) => signer.signTransaction(tx)));
        return this.combinePartiallySignedTransactions(partiallySignedTxs);
    }
    getSupportedAddressTypes() {
        return [types_1.AddressType.MultisigLegacy, types_1.AddressType.MultisigSegwitNative, types_1.AddressType.MultisigSegwitP2SH];
    }
}
exports.MultisigBitcoinPayments = MultisigBitcoinPayments;
exports.default = MultisigBitcoinPayments;
//# sourceMappingURL=MultisigBitcoinPayments.js.map