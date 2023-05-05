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
exports.preCombinePartiallySignedTransactions = exports.combineMultisigData = exports.createMultisigData = void 0;
const lib_common_1 = require("../../lib-common");
const ts_common_1 = require("../../ts-common");
const helpers_1 = require("./helpers");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const lodash_1 = require("lodash");
/*
 * functions for multi-sig
 */
function createMultisigData(inputUtxos, signers, m) {
    const result = {};
    for (let i = 0; i < inputUtxos.length; i++) {
        const input = inputUtxos[i];
        if (!input.address) {
            throw new Error(`Missing address field for input utxo ${input.txid}:${input.vout}`);
        }
        if (!(0, ts_common_1.isNumber)(input.signer)) {
            throw new Error(`Missing signer field for input utxo ${input.txid}:${input.vout}`);
        }
        const signerIndex = input.signer;
        if (result[input.address]) {
            // Address already included in multisig data, append this input index
            result[input.address].inputIndices.push(i);
            continue;
        }
        const accountIds = [];
        const publicKeys = [];
        for (const signer of signers) {
            // accountIds and publicKeys are parallel arrays with lengths equal to number of signers in the multisig address
            accountIds.push(signer.getAccountId(signerIndex));
            publicKeys.push((0, helpers_1.publicKeyToString)(signer.getKeyPair(signerIndex).publicKey));
        }
        result[input.address] = {
            m,
            accountIds,
            publicKeys,
            signedAccountIds: [],
            signerIndex,
            inputIndices: [i],
        };
    }
    return result;
}
exports.createMultisigData = createMultisigData;
function deserializeSignedTxPsbt(tx, psbtOptions) {
    if (!tx.data.partial) {
        throw new Error('Cannot decode psbt of a finalized tx');
    }
    return bitcoin.Psbt.fromHex(tx.data.hex, psbtOptions);
}
function validateCompatibleBaseMultisigData(m1, m2) {
    if (m1.m !== m2.m) {
        throw new Error(`Mismatched legacy multisig data m value (${m1.m} vs ${m2.m})`);
    }
    if (m1.accountIds.length !== m1.publicKeys.length ||
        m1.accountIds.length !== m2.accountIds.length ||
        m1.accountIds.length !== m2.publicKeys.length) {
        throw new Error('Mismatched lengths of multisigdata accountIds or publicKeys');
    }
    for (let i = 0; i < m1.accountIds.length; i++) {
        if (m1.accountIds[i] !== m2.accountIds[i]) {
            throw new Error(`Mismatched accountId at index ${i}: ${m1.accountIds[i]} ${m2.accountIds[i]}`);
        }
        if (m1.publicKeys[i] !== m2.publicKeys[i]) {
            throw new Error(`Mismatched publicKey at index ${i}: ${m1.publicKeys[i]} ${m2.publicKeys[i]}`);
        }
    }
}
function combineBaseMultisigData(m1, m2) {
    validateCompatibleBaseMultisigData(m1, m2);
    return {
        ...m1,
        signedAccountIds: Array.from(new Set([...m1.signedAccountIds, ...m2.signedAccountIds])),
    };
}
function combineMultisigData(m1, m2) {
    if (lib_common_1.BaseMultisigData.is(m1)) {
        if (!lib_common_1.BaseMultisigData.is(m2)) {
            throw new Error('Cannot merge legacy single input with multi input MultisigData');
        }
        return combineBaseMultisigData(m1, m2);
    }
    else if (lib_common_1.BaseMultisigData.is(m2)) {
        throw new Error('Cannot merge multi-input with legacy single-input MultisigData');
    }
    else {
        // Both are multi-input MultisigData
        return Object.entries(m2).reduce((result, [address, data]) => {
            if (result[address]) {
                // Both transactions have entries for an address (ie standard multisig)
                result[address] = combineBaseMultisigData(result[address], data);
            }
            else {
                // m2 has entry for address that m1 doesn't (ie coinjoin)
                throw new Error(`combineMultisigData does not yet support coinjoin (${address})`);
            }
            return result;
        }, (0, lodash_1.cloneDeep)(m1));
    }
}
exports.combineMultisigData = combineMultisigData;
function preCombinePartiallySignedTransactions(txs, psbtOptions) {
    if (txs.length < 2) {
        throw new Error(`Cannot combine ${txs.length} transactions, need at least 2`);
    }
    const unsignedTxHash = txs[0].data.unsignedTxHash;
    txs.forEach(({ multisigData, inputUtxos, externalOutputs, data }, i) => {
        if (!multisigData)
            throw new Error(`Cannot combine signed multisig tx ${i} because multisigData is ${multisigData}`);
        if (!inputUtxos)
            throw new Error(`Cannot combine signed multisig tx ${i} because inputUtxos field is missing`);
        if (!externalOutputs)
            throw new Error(`Cannot combine signed multisig tx ${i} because externalOutputs field is missing`);
        if (data.unsignedTxHash !== unsignedTxHash)
            throw new Error(`Cannot combine signed multisig tx ${i} because unsignedTxHash is ${data.unsignedTxHash} when expecting ${unsignedTxHash}`);
        if (!data.partial)
            throw new Error(`Cannot combine signed multisig tx ${i} because partial is ${data.partial}`);
    });
    const baseTx = txs[0];
    const baseTxMultisigData = baseTx.multisigData;
    let updatedMultisigData = baseTxMultisigData;
    const combinedPsbt = deserializeSignedTxPsbt(baseTx, psbtOptions);
    for (let i = 1; i < txs.length; i++) {
        if ((0, helpers_1.isMultisigFullySigned)(updatedMultisigData)) {
            break;
        }
        const tx = txs[i];
        const psbt = deserializeSignedTxPsbt(tx, psbtOptions);
        combinedPsbt.combine(psbt);
        updatedMultisigData = combineMultisigData(updatedMultisigData, tx.multisigData);
    }
    return { baseTx, combinedPsbt, updatedMultisigData };
}
exports.preCombinePartiallySignedTransactions = preCombinePartiallySignedTransactions;
//# sourceMappingURL=multisigPaymentHelper.js.map