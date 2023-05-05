"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLitecoinPayments = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const lib_common_1 = require("../lib-common");
const lib_bitcoin_1 = require("../lib-bitcoin");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
const LitecoinPaymentsUtils_1 = require("./LitecoinPaymentsUtils");
class BaseLitecoinPayments extends lib_bitcoin_1.bitcoinish.BitcoinishPayments {
    constructor(config) {
        var _a;
        super((0, utils_1.toBitcoinishConfig)(config));
        this.maximumFeeRate = config.maximumFeeRate;
        this.validAddressFormat = config.validAddressFormat;
        this.feeLevelBlockTargets = (_a = config.feeLevelBlockTargets) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_FEE_LEVEL_BLOCK_TARGETS;
        this.utils = new LitecoinPaymentsUtils_1.LitecoinPaymentsUtils(config);
    }
    isValidAddress(address, options) {
        return this.utils.isValidAddress(address, options);
    }
    standardizeAddress(address, options) {
        return this.utils.standardizeAddress(address, options);
    }
    isValidPrivateKey(privateKey) {
        return this.utils.isValidPrivateKey(privateKey);
    }
    isValidPublicKey(publicKey) {
        return this.utils.isValidPublicKey(publicKey);
    }
    /** Return a string that can be passed into estimateLitecoinTxSize. Override to support multisig */
    getEstimateTxSizeInputKey() {
        return this.addressType;
    }
    estimateTxSize(inputCount, changeOutputCount, externalOutputAddresses) {
        return (0, helpers_1.estimateLitecoinTxSize)({ [this.getEstimateTxSizeInputKey()]: inputCount }, {
            ...lib_bitcoin_1.bitcoinish.countOccurences(externalOutputAddresses),
            [this.addressType]: changeOutputCount,
        }, this.networkType);
    }
    async getPsbtInputData(utxo, paymentScript, addressType) {
        const utx = await lib_common_1.limiter.schedule(() => this.getApi().getTx(utxo.txid));
        const result = {
            hash: utxo.txid,
            index: utxo.vout,
            sequence: constants_1.LITECOIN_SEQUENCE_RBF,
        };
        if (/p2wpkh|p2wsh/.test(addressType)) {
            // for segwit inputs, you only need the output script and value as an object.
            const rawUtxo = utx.vout[utxo.vout];
            const { hex: scriptPubKey, value: rawValue } = rawUtxo;
            if (!scriptPubKey) {
                throw new Error(`Cannot get scriptPubKey for utxo ${utxo.txid}:${utxo.vout}`);
            }
            const utxoValue = this.toBaseDenominationNumber(utxo.value);
            if (String(utxoValue) !== rawValue) {
                throw new Error(`Utxo ${utxo.txid}:${utxo.vout} has mismatched value - ${utxoValue} sat expected but network reports ${rawValue} sat`);
            }
            result.witnessUtxo = {
                script: Buffer.from(scriptPubKey, 'hex'),
                value: utxoValue,
            };
        }
        else {
            // for non segwit inputs, you must pass the full transaction buffer
            if (!utx.hex) {
                throw new Error(`Cannot get raw hex of tx for utxo ${utxo.txid}:${utxo.vout}`);
            }
            result.nonWitnessUtxo = Buffer.from(utx.hex, 'hex');
        }
        if (addressType.startsWith('p2sh-p2wsh')) {
            result.witnessScript = paymentScript.redeem.redeem.output;
            result.redeemScript = paymentScript.redeem.output;
        }
        else if (addressType.startsWith('p2sh')) {
            result.redeemScript = paymentScript.redeem.output;
        }
        else if (addressType.startsWith('p2wsh')) {
            result.witnessScript = paymentScript.redeem.output;
        }
        return result;
    }
    get psbtOptions() {
        return {
            network: this.bitcoinjsNetwork,
            maximumFeeRate: this.maximumFeeRate,
        };
    }
    async buildPsbt(paymentTx, fromIndex) {
        var _a;
        const { inputs, outputs } = paymentTx;
        const psbt = new bitcoin.Psbt(this.psbtOptions);
        for (const input of inputs) {
            const signer = (_a = input.signer) !== null && _a !== void 0 ? _a : fromIndex;
            if (typeof signer === 'undefined') {
                throw new Error('Signer index for utxo is not provided');
            }
            psbt.addInput(await this.getPsbtInputData(input, this.getPaymentScript(signer), this.addressType));
        }
        for (const output of outputs) {
            psbt.addOutput({
                address: output.address,
                value: this.toBaseDenominationNumber(output.value),
            });
        }
        return psbt;
    }
    async serializePaymentTx(tx, fromIndex) {
        return (await this.buildPsbt(tx, fromIndex)).toHex();
    }
}
exports.BaseLitecoinPayments = BaseLitecoinPayments;
//# sourceMappingURL=BaseLitecoinPayments.js.map