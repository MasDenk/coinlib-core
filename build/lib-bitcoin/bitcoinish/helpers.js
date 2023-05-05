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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSignedMultisigTx = exports.isMultisigFullySigned = exports.validateAndFinalizeSignedTx = exports.convertXPrefixHdKeys = exports.privateKeyToAddress = exports.privateKeyToKeyPair = exports.publicKeyToKeyPair = exports.publicKeyToAddress = exports.getSinglesigPaymentScript = exports.getMultisigPaymentScript = exports.publicKeyToString = exports.publicKeyToBuffer = exports.isValidPrivateKey = exports.isValidExtraId = exports.isValidPublicKey = exports.standardizeAddress = exports.isValidAddress = void 0;
const types_1 = require("./types");
const lib_common_1 = require("../../lib-common");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const ts_common_1 = require("../../ts-common");
const bs58check_1 = __importDefault(require("bs58check"));
function isValidAddress(address, network) {
    try {
        bitcoin.address.toOutputScript(address, network);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidAddress = isValidAddress;
function standardizeAddress(address, network) {
    if (!isValidAddress(address, network)) {
        return null;
    }
    // Uppercase bech32 addresses are valid but lowercase is standard
    const lowercase = address.toLowerCase();
    if (lowercase.startsWith(network.bech32) && isValidAddress(lowercase, network)) {
        return lowercase;
    }
    return address;
}
exports.standardizeAddress = standardizeAddress;
function isValidPublicKey(publicKey, network) {
    try {
        lib_common_1.ecpair.fromPublicKey(publicKeyToBuffer(publicKey), { network });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidPublicKey = isValidPublicKey;
function isValidExtraId(extraId) {
    return false;
}
exports.isValidExtraId = isValidExtraId;
function isValidPrivateKey(privateKey, network) {
    try {
        privateKeyToKeyPair(privateKey, network);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidPrivateKey = isValidPrivateKey;
function publicKeyToBuffer(publicKey) {
    return (0, ts_common_1.isString)(publicKey) ? Buffer.from(publicKey, 'hex') : publicKey;
}
exports.publicKeyToBuffer = publicKeyToBuffer;
function publicKeyToString(publicKey) {
    return (0, ts_common_1.isString)(publicKey) ? publicKey : publicKey.toString('hex');
}
exports.publicKeyToString = publicKeyToString;
function getMultisigPaymentScript(network, addressType, pubkeys, m) {
    const scriptParams = {
        network,
        redeem: bitcoin.payments.p2ms({
            pubkeys: pubkeys.sort(),
            m,
            network,
        }),
    };
    switch (addressType) {
        case types_1.AddressType.MultisigLegacy:
            return bitcoin.payments.p2sh(scriptParams);
        case types_1.AddressType.MultisigSegwitNative:
            return bitcoin.payments.p2wsh(scriptParams);
        case types_1.AddressType.MultisigSegwitP2SH:
            return bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wsh(scriptParams),
                network,
            });
    }
}
exports.getMultisigPaymentScript = getMultisigPaymentScript;
function getSinglesigPaymentScript(network, addressType, pubkey) {
    const scriptParams = { network, pubkey };
    switch (addressType) {
        case types_1.AddressType.Legacy:
            return bitcoin.payments.p2pkh(scriptParams);
        case types_1.AddressType.SegwitNative:
            return bitcoin.payments.p2wpkh(scriptParams);
        case types_1.AddressType.SegwitP2SH:
            return bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wpkh(scriptParams),
                network,
            });
    }
}
exports.getSinglesigPaymentScript = getSinglesigPaymentScript;
function publicKeyToAddress(publicKey, network, addressType) {
    const pubkey = publicKeyToBuffer(publicKey);
    const script = getSinglesigPaymentScript(network, addressType, pubkey);
    const { address } = script;
    if (!address) {
        throw new Error('bitcoinjs-lib-bigint address derivation returned falsy value');
    }
    return address;
}
exports.publicKeyToAddress = publicKeyToAddress;
function publicKeyToKeyPair(publicKey, network) {
    return lib_common_1.ecpair.fromPublicKey(publicKeyToBuffer(publicKey), { network });
}
exports.publicKeyToKeyPair = publicKeyToKeyPair;
function privateKeyToKeyPair(privateKey, network) {
    return lib_common_1.ecpair.fromWIF(privateKey, network);
}
exports.privateKeyToKeyPair = privateKeyToKeyPair;
function privateKeyToAddress(privateKey, network, addressType) {
    const keyPair = privateKeyToKeyPair(privateKey, network);
    return publicKeyToAddress(keyPair.publicKey, network, addressType);
}
exports.privateKeyToAddress = privateKeyToAddress;
function bufferFromUInt32(x) {
    const b = Buffer.alloc(4);
    b.writeUInt32BE(x, 0);
    return b;
}
/**
 * Utility for converting xpub/xprv prefixed hd keys to the network specific prefix (ie Ltub/Ltpv)
 */
function convertXPrefixHdKeys(hdKey, network) {
    let newMagicNumber;
    if (hdKey.startsWith('xpub')) {
        newMagicNumber = network.bip32.public;
    }
    else if (hdKey.startsWith('xprv')) {
        newMagicNumber = network.bip32.private;
    }
    else {
        // Not recognized so probably already has network prefix
        return hdKey;
    }
    let data = bs58check_1.default.decode(hdKey);
    data = data.slice(4);
    data = Buffer.concat([bufferFromUInt32(newMagicNumber), data]);
    return bs58check_1.default.encode(data);
}
exports.convertXPrefixHdKeys = convertXPrefixHdKeys;
function keypairValidator(publicKey, hash, signature) {
    const keypair = lib_common_1.ecpair.fromPublicKey(publicKey);
    return keypair.verify(hash, signature);
}
function validateAndFinalizeSignedTx(tx, psbt) {
    var _a;
    if (!psbt.validateSignaturesOfAllInputs(keypairValidator)) {
        throw new Error('Failed to validate signatures of all inputs');
    }
    psbt.finalizeAllInputs();
    const signedTx = psbt.extractTransaction();
    const txId = signedTx.getId();
    const txHex = signedTx.toHex();
    const txData = tx.data;
    const unsignedTxHash = types_1.BitcoinishSignedTransactionData.is(txData) ? txData.unsignedTxHash : txData.rawHash;
    return {
        ...tx,
        status: lib_common_1.TransactionStatus.Signed,
        id: txId,
        data: {
            hex: txHex,
            partial: false,
            unsignedTxHash,
            changeOutputs: (_a = tx.data) === null || _a === void 0 ? void 0 : _a.changeOutputs,
        },
    };
}
exports.validateAndFinalizeSignedTx = validateAndFinalizeSignedTx;
function isMultisigFullySigned(multisigData) {
    if (lib_common_1.BaseMultisigData.is(multisigData)) {
        return multisigData.signedAccountIds.length >= multisigData.m;
    }
    return Object.values(multisigData).every(isMultisigFullySigned);
}
exports.isMultisigFullySigned = isMultisigFullySigned;
function updateSignedMultisigTx(tx, psbt, updatedMultisigData) {
    var _a;
    if (isMultisigFullySigned(updatedMultisigData)) {
        const finalizedTx = validateAndFinalizeSignedTx(tx, psbt);
        return {
            ...finalizedTx,
            multisigData: updatedMultisigData,
        };
    }
    const combinedHex = psbt.toHex();
    const unsignedTxHash = types_1.BitcoinishSignedTransactionData.is(tx.data) ? tx.data.unsignedTxHash : tx.data.rawHash;
    return {
        ...tx,
        id: '',
        status: lib_common_1.TransactionStatus.Signed,
        multisigData: updatedMultisigData,
        data: {
            hex: combinedHex,
            partial: true,
            unsignedTxHash,
            changeOutputs: (_a = tx.data) === null || _a === void 0 ? void 0 : _a.changeOutputs,
        },
    };
}
exports.updateSignedMultisigTx = updateSignedMultisigTx;
//# sourceMappingURL=helpers.js.map