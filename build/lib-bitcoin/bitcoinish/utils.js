"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bip32MagicNumberToPrefix = exports.estimateTxSize = exports.ADDRESS_OUTPUT_WEIGHTS = exports.ADDRESS_INPUT_WEIGHTS = exports.getBlockbookFeeRecommendation = exports.getBlockcypherFeeRecommendation = exports.sha256FromHex = exports.isConfirmedUtxo = exports.shuffleUtxos = exports.countOccurences = exports.sumUtxoValue = exports.sumField = exports.retryIfDisconnected = exports.resolveServer = void 0;
const lib_common_1 = require("../../lib-common");
const blockbook_client_1 = require("blockbook-client");
const ts_common_1 = require("../../ts-common");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const promise_retry_1 = __importDefault(require("promise-retry"));
const crypto_1 = __importDefault(require("crypto"));
const bs58_1 = __importDefault(require("bs58"));
const types_1 = require("./types");
function resolveServer(config, logger) {
    const { server } = config;
    if (config.api) {
        return {
            api: config.api,
            server: config.api.nodes,
        };
    }
    else if ((0, ts_common_1.isString)(server)) {
        return {
            api: new types_1.BlockbookServerAPI({
                nodes: [server],
                logger,
                requestTimeoutMs: config.requestTimeoutMs,
            }),
            server: [server],
        };
    }
    else if (server instanceof blockbook_client_1.BlockbookBitcoin || server instanceof types_1.BlockbookServerAPI) {
        return {
            api: server,
            server: server.nodes,
        };
    }
    else if (Array.isArray(server)) {
        return {
            api: new types_1.BlockbookServerAPI({
                nodes: server,
                logger,
                requestTimeoutMs: config.requestTimeoutMs,
            }),
            server,
        };
    }
    else {
        // null server arg -> offline mode
        return {
            api: new types_1.BlockbookServerAPI({
                nodes: [''],
                logger,
                requestTimeoutMs: config.requestTimeoutMs,
            }),
            server: null,
        };
    }
}
exports.resolveServer = resolveServer;
const RETRYABLE_ERRORS = [
    'timeout',
    'disconnected',
    'time-out',
    'StatusCodeError: 522',
    'StatusCodeError: 504',
    'ENOTFOUND',
    'ESOCKETTIMEDOUT',
    'ETIMEDOUT',
];
const MAX_RETRIES = 2;
function retryIfDisconnected(fn, api, logger, additionalRetryableErrors = []) {
    return (0, promise_retry_1.default)((retry, attempt) => {
        return fn().catch(async (e) => {
            if ((0, ts_common_1.isMatchingError)(e, [...RETRYABLE_ERRORS, ...additionalRetryableErrors])) {
                logger.log(`Retryable error during blockbook server call, retrying ${MAX_RETRIES - attempt} more times`, e.toString());
                retry(e);
            }
            throw e;
        });
    }, {
        retries: MAX_RETRIES,
    });
}
exports.retryIfDisconnected = retryIfDisconnected;
/** returns the sum of a particular field in an array of items */
function sumField(items, field) {
    return items.reduce((total, item) => total.plus(item[field]), (0, ts_common_1.toBigNumber)(0));
}
exports.sumField = sumField;
/**
 * Sum the utxos values (main denomination)
 */
function sumUtxoValue(utxos, includeUnconfirmed) {
    const filtered = includeUnconfirmed ? utxos : utxos.filter(isConfirmedUtxo);
    return sumField(filtered, 'value');
}
exports.sumUtxoValue = sumUtxoValue;
function countOccurences(a) {
    return a.reduce((result, element) => {
        var _a;
        result[element] = ((_a = result[element]) !== null && _a !== void 0 ? _a : 0) + 1;
        return result;
    }, {});
}
exports.countOccurences = countOccurences;
/**
 * Shuffle the utxos for input selection.
 */
function shuffleUtxos(utxoList) {
    const result = [...utxoList];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
    }
    return result;
}
exports.shuffleUtxos = shuffleUtxos;
function isConfirmedUtxo(utxo) {
    return Boolean((utxo.confirmations && utxo.confirmations > 0) || (utxo.height && Number.parseInt(utxo.height) > 0));
}
exports.isConfirmedUtxo = isConfirmedUtxo;
function sha256FromHex(hex) {
    return hex ? crypto_1.default.createHash('sha256').update(Buffer.from(hex, 'hex')).digest('hex') : '';
}
exports.sha256FromHex = sha256FromHex;
async function getBlockcypherFeeRecommendation(feeLevel, coinSymbol, networkType, blockcypherToken, logger) {
    let feeRate;
    try {
        const networkParam = networkType === lib_common_1.NetworkType.Mainnet ? 'main' : 'test3';
        const tokenQs = blockcypherToken ? `?token=${blockcypherToken}` : '';
        const body = await request_promise_native_1.default.get(`https://api.blockcypher.com/v1/${coinSymbol.toLowerCase()}/${networkParam}${tokenQs}`, { json: true });
        const feePerKbField = `${feeLevel}_fee_per_kb`;
        const feePerKb = body[feePerKbField];
        if (!feePerKb) {
            throw new Error(`Response is missing expected field ${feePerKbField}`);
        }
        const satPerByte = feePerKb / 1000;
        feeRate = String(satPerByte);
        logger.log(`Retrieved ${coinSymbol} ${networkType} fee rate of ${satPerByte} sat/vbyte from blockcypher for ${feeLevel} level`);
    }
    catch (e) {
        throw new Error(`Failed to retrieve ${coinSymbol} ${networkType} fee rate from blockcypher - ${e.toString()}`);
    }
    return {
        feeRate,
        feeRateType: lib_common_1.FeeRateType.BasePerWeight,
    };
}
exports.getBlockcypherFeeRecommendation = getBlockcypherFeeRecommendation;
async function getBlockbookFeeRecommendation(blockTarget, coinSymbol, networkType, blockbookClient, logger) {
    let feeRate;
    try {
        const btcPerKbString = await blockbookClient.estimateFee(blockTarget);
        const fee = new lib_common_1.BigNumber(btcPerKbString);
        if (fee.isNaN() || fee.lte(0)) {
            throw new Error(`Blockbook estimatefee result is not a positive number: ${btcPerKbString}`);
        }
        const satPerByte = fee.times(100000);
        feeRate = satPerByte.toFixed();
        logger.log(`Retrieved ${coinSymbol} ${networkType} fee rate of ${satPerByte} sat/vbyte from blockbook, using ${feeRate} for ${blockTarget} block target`);
    }
    catch (e) {
        throw new Error(`Failed to retrieve ${coinSymbol} ${networkType} fee rate from blockbook - ${e.toString()}`);
    }
    return {
        feeRate,
        feeRateType: lib_common_1.FeeRateType.BasePerWeight,
    };
}
exports.getBlockbookFeeRecommendation = getBlockbookFeeRecommendation;
// assumes compressed pubkeys in all cases.
exports.ADDRESS_INPUT_WEIGHTS = {
    [types_1.AddressType.Legacy]: 148 * 4,
    [types_1.AddressType.SegwitP2SH]: 108 + 64 * 4,
    [types_1.AddressType.SegwitNative]: 108 + 41 * 4,
    [types_1.AddressType.MultisigLegacy]: 49 * 4,
    [types_1.AddressType.MultisigSegwitP2SH]: 6 + 76 * 4,
    [types_1.AddressType.MultisigSegwitNative]: 6 + 41 * 4,
};
exports.ADDRESS_OUTPUT_WEIGHTS = {
    [types_1.AddressType.Legacy]: 34 * 4,
    [types_1.AddressType.SegwitP2SH]: 32 * 4,
    [types_1.AddressType.SegwitNative]: 31 * 4,
    [types_1.AddressType.MultisigLegacy]: 34 * 4,
    [types_1.AddressType.MultisigSegwitP2SH]: 34 * 4,
    [types_1.AddressType.MultisigSegwitNative]: 43 * 4,
};
function checkUInt53(n) {
    if (n < 0 || n > Number.MAX_SAFE_INTEGER || n % 1 !== 0)
        throw new RangeError('value out of range');
}
function varIntLength(n) {
    checkUInt53(n);
    return n < 0xfd ? 1 : n <= 0xffff ? 3 : n <= 0xffffffff ? 5 : 9;
}
/**
 * Estimate the size of a bitcoin tx in vbytes
 *
 * Usage:
 *
 * `estimateTxSize({'p2sh-p2ms:2-4':4},{'p2pkh':1,'1J5d68gBGsNS8bxMGBnjCHorYCYGXQnM65': 1})`
 *   Means "4 inputs of P2SH Multisig, 1 output of P2PKH, and one output to 1J5d68gBGsNS8bxMGBnjCHorYCYGXQnM65"
 *
 * `estimateTxSize({'p2pkh':1,'p2sh-p2wsh-p2ms:2-3':2},{'p2wpkh':2})`
 *   means "1 P2PKH input and 2 Multisig segwit P2SH (2 of 3) inputs along with 2 native segwit outputs"
 *
 * Adapted from: https://gist.github.com/junderw/b43af3253ea5865ed52cb51c200ac19c
 *
 * @param toOutputScript - An function equivalent to bitcoin.address.toOutputScript without the network arg
 *    ie (address) => bitcoin.address.toOutputScript(address, bitcoin.networks.testnet)
 */
function estimateTxSize(inputCounts, outputCounts, toOutputScript) {
    let totalWeight = 0;
    let hasWitness = false;
    let totalInputs = 0;
    let totalOutputs = 0;
    Object.keys(inputCounts).forEach((key) => {
        const count = inputCounts[key];
        checkUInt53(count);
        if (key.includes(':')) {
            // ex. "p2sh-p2ms:2-3" would mean 2 of 3 P2SH MULTISIG
            const keyParts = key.split(':');
            if (keyParts.length !== 2)
                throw new Error('invalid inputCounts key: ' + key);
            const addressType = (0, ts_common_1.assertType)(types_1.MultisigAddressType, keyParts[0], 'inputCounts key');
            const [m, n] = keyParts[1].split('-').map((x) => parseInt(x));
            totalWeight += exports.ADDRESS_INPUT_WEIGHTS[addressType] * count;
            const multiplyer = addressType === types_1.AddressType.MultisigLegacy ? 4 : 1;
            totalWeight += (73 * m + 34 * n) * multiplyer * count;
        }
        else {
            const addressType = (0, ts_common_1.assertType)(types_1.SinglesigAddressType, key, 'inputCounts key');
            totalWeight += exports.ADDRESS_INPUT_WEIGHTS[addressType] * count;
        }
        totalInputs += count;
        if (key.indexOf('W') >= 0)
            hasWitness = true;
    });
    Object.keys(outputCounts).forEach(function (key) {
        const count = outputCounts[key];
        checkUInt53(count);
        if (types_1.AddressTypeT.is(key)) {
            totalWeight += exports.ADDRESS_OUTPUT_WEIGHTS[key] * count;
        }
        else {
            try {
                const outputScript = toOutputScript(key);
                totalWeight += (outputScript.length + 9) * 4 * count;
            }
            catch (e) {
                throw new Error('invalid outputCounts key: ' + key);
            }
        }
        totalOutputs += count;
    });
    if (hasWitness)
        totalWeight += 2;
    totalWeight += 8 * 4;
    totalWeight += varIntLength(totalInputs) * 4;
    totalWeight += varIntLength(totalOutputs) * 4;
    return Math.ceil(totalWeight / 4);
}
exports.estimateTxSize = estimateTxSize;
function bip32MagicNumberToPrefix(magicNum) {
    const b = Buffer.alloc(82);
    b.writeUInt32BE(magicNum, 0);
    return bs58_1.default.encode(b).slice(0, 4);
}
exports.bip32MagicNumberToPrefix = bip32MagicNumberToPrefix;
//# sourceMappingURL=utils.js.map