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
exports.signTransaction = exports.signMultisigTransaction = void 0;
const lib_common_1 = require("../../lib-common");
const helpers_1 = require("./helpers");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const lodash_1 = require("lodash");
/** Backwards compatible multisig transaction signing for non-multi input txs */
function signMultisigTransactionLegacy(tx, psbt, multisigData, context) {
    if (tx.fromIndex === null)
        throw new Error('Cannot sign legacy multisig transaction without fromIndex');
    const accountId = context.getAccountId(tx.fromIndex);
    const accountIdIndex = multisigData.accountIds.findIndex((x) => x === accountId);
    if (accountIdIndex === -1) {
        throw new Error('Not a signer for provided multisig tx');
    }
    if (multisigData.signedAccountIds.includes(accountId)) {
        throw new Error('Already signed multisig tx');
    }
    const keyPair = context.getKeyPair(tx.fromIndex);
    const publicKeyString = (0, helpers_1.publicKeyToString)(keyPair.publicKey);
    const signerPublicKey = multisigData.publicKeys[accountIdIndex];
    if (signerPublicKey !== publicKeyString) {
        throw new Error(`Mismatched publicKey for keyPair ${accountId}/${tx.fromIndex} - ` +
            `multisigData has ${signerPublicKey} but keyPair has ${publicKeyString}`);
    }
    context.validatePsbt(tx, psbt);
    psbt.signAllInputs(keyPair);
    const updatedMultisigTx = {
        ...multisigData,
        signedAccountIds: [...multisigData.signedAccountIds, accountId],
    };
    return (0, helpers_1.updateSignedMultisigTx)(tx, psbt, updatedMultisigTx);
}
function signMultisigTransactionMultiInput(tx, psbt, multisigData, context) {
    const updatedMultisigTx = (0, lodash_1.cloneDeep)(multisigData);
    let inputsSigned = 0;
    for (const address of Object.keys(multisigData)) {
        const addressMultisigData = multisigData[address];
        const { signerIndex, accountIds, signedAccountIds, publicKeys, inputIndices } = addressMultisigData;
        const accountId = context.getAccountId(signerIndex);
        const accountIdIndex = accountIds.findIndex((x) => x === accountId);
        if (accountIdIndex === -1) {
            // Not a signer for address
            context.logger.debug(`Not a signer for address ${address} because ${accountId} is not in ${accountIds}`);
            continue;
        }
        if (signedAccountIds.includes(accountId)) {
            // Already signed all inputs for this address
            context.logger.debug(`Already signed all inputs for address ${address} using account ${accountId}`);
            continue;
        }
        const keyPair = context.getKeyPair(signerIndex);
        const publicKeyString = (0, helpers_1.publicKeyToString)(keyPair.publicKey);
        const signerPublicKey = publicKeys[accountIdIndex];
        if (signerPublicKey !== publicKeyString) {
            throw new Error(`Mismatched publicKey for keyPair ${accountId}/${tx.fromIndex} - ` +
                `multisigData has ${signerPublicKey} but keyPair has ${publicKeyString}`);
        }
        for (const inputIndex of inputIndices) {
            psbt.signInput(inputIndex, keyPair);
            inputsSigned++;
            context.logger.debug(`Signed tx input #${inputIndex} for address ${address}`);
        }
        updatedMultisigTx[address].signedAccountIds.push(accountId);
    }
    if (inputsSigned === 0) {
        throw new Error('No inputs were signed');
    }
    return (0, helpers_1.updateSignedMultisigTx)(tx, psbt, updatedMultisigTx);
}
function signMultisigTransaction(tx, context) {
    const { multisigData, data } = tx;
    const { rawHex } = data;
    if (!multisigData)
        throw new Error('Not a multisig tx');
    if (!rawHex)
        throw new Error('Cannot sign multisig tx without unsigned tx hex');
    const psbt = bitcoin.Psbt.fromHex(rawHex, context.psbtOptions);
    context.validatePsbt(tx, psbt);
    if (lib_common_1.BaseMultisigData.is(multisigData)) {
        // back compat
        return signMultisigTransactionLegacy(tx, psbt, multisigData, context);
    }
    else {
        return signMultisigTransactionMultiInput(tx, psbt, multisigData, context);
    }
}
exports.signMultisigTransaction = signMultisigTransaction;
async function signTransaction(tx, context) {
    context.logger.log('signTransaction', JSON.stringify(tx, null, 2));
    if (tx.multisigData) {
        return signMultisigTransaction(tx, context);
    }
    const paymentTx = tx.data;
    const { rawHex } = paymentTx;
    let psbt;
    if (rawHex) {
        psbt = bitcoin.Psbt.fromHex(rawHex, context.psbtOptions);
    }
    else {
        psbt = await context.buildPsbt(paymentTx);
    }
    context.validatePsbt(tx, psbt);
    for (let i = 0; i < tx.data.inputs.length; i++) {
        if (typeof tx.data.inputs[i].signer === 'undefined') {
            throw new Error('Uxto needs to have signer provided');
        }
        const keyPair = context.getKeyPair(tx.data.inputs[i].signer);
        psbt.signInput(i, keyPair);
    }
    return (0, helpers_1.validateAndFinalizeSignedTx)(tx, psbt);
}
exports.signTransaction = signTransaction;
//# sourceMappingURL=singlesigPaymentHelper.js.map