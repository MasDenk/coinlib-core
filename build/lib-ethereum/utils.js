"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockBookTxFromAndToAddress = exports.resolveServer = exports.retryIfDisconnected = void 0;
const ts_common_1 = require("../ts-common");
const blockbook_client_1 = require("blockbook-client");
const promise_retry_1 = __importDefault(require("promise-retry"));
const RETRYABLE_ERRORS = ['request failed or timed out'];
const MAX_RETRIES = 2;
function retryIfDisconnected(fn, logger, additionalRetryableErrors = []) {
    return (0, promise_retry_1.default)((retry, attempt) => {
        return fn().catch(async (e) => {
            if ((0, ts_common_1.isMatchingError)(e, [...RETRYABLE_ERRORS, ...additionalRetryableErrors])) {
                logger.log(`Retryable error during ethereum-payments call, retrying ${MAX_RETRIES - attempt} more times`, e.toString());
                retry(e);
            }
            throw e;
        });
    }, {
        retries: MAX_RETRIES,
    });
}
exports.retryIfDisconnected = retryIfDisconnected;
function resolveServer({ server, requestTimeoutMs, api }, logger) {
    if (api) {
        return {
            api: api,
            server: ['https://eth1.trezor.io', 'https://eth2.trezor.io'],
        };
    }
    if ((0, ts_common_1.isString)(server)) {
        return {
            api: new blockbook_client_1.BlockbookEthereum({
                nodes: ['https://eth1.trezor.io', 'https://eth2.trezor.io'],
                logger,
                requestTimeoutMs: requestTimeoutMs,
            }),
            server: ['https://eth1.trezor.io', 'https://eth2.trezor.io'],
        };
    }
    if (server instanceof blockbook_client_1.BlockbookEthereum) {
        return {
            api: server,
            server: ['https://eth1.trezor.io', 'https://eth2.trezor.io'],
        };
    }
    if (Array.isArray(server)) {
        return {
            api: new blockbook_client_1.BlockbookEthereum({
                nodes: ['https://eth1.trezor.io', 'https://eth2.trezor.io'],
                logger,
                requestTimeoutMs: requestTimeoutMs,
            }),
            server,
        };
    }
    // null server arg -> offline mode
    return {
        api: new blockbook_client_1.BlockbookEthereum({
            nodes: [''],
            logger,
            requestTimeoutMs,
        }),
        server: null,
    };
}
exports.resolveServer = resolveServer;
function getBlockBookTxFromAndToAddress(tx) {
    if (tx.vin.length !== 1 || tx.vout.length !== 1) {
        throw new Error('transaction has less or more than one input or output');
    }
    const inputAddresses = tx.vin[0].addresses;
    const outputAddresses = tx.vout[0].addresses;
    let toAddress = '';
    if (!inputAddresses) {
        throw new Error(`txId = ${tx.txid} is missing input address`);
    }
    // for contract deploys, the outputAddress is usually null
    if (!outputAddresses) {
        toAddress = '0x';
    }
    else {
        toAddress = outputAddresses[0];
    }
    return {
        toAddress,
        fromAddress: inputAddresses[0],
    };
}
exports.getBlockBookTxFromAndToAddress = getBlockBookTxFromAndToAddress;
//# sourceMappingURL=utils.js.map