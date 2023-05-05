"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryIfDisconnected = exports.resolveStellarServer = exports.padLeft = exports.isStellarTransactionRecord = exports.isStellarTransaction = exports.isStellarLedger = exports.omitHidden = exports.serializePayport = exports.isMatchingError = void 0;
const lib_common_1 = require("../lib-common");
Object.defineProperty(exports, "isMatchingError", { enumerable: true, get: function () { return lib_common_1.isMatchingError; } });
const promise_retry_1 = __importDefault(require("promise-retry"));
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const lodash_1 = require("lodash");
function serializePayport(payport) {
    return (0, ts_common_1.isNil)(payport.extraId) ? payport.address : `${payport.address}/${payport.extraId}`;
}
exports.serializePayport = serializePayport;
function omitHidden(o) {
    return (0, lodash_1.omitBy)(o, (_, k) => k.startsWith('_'));
}
exports.omitHidden = omitHidden;
function isStellarLedger(x) {
    return (0, ts_common_1.isObject)(x) && !(0, ts_common_1.isUndefined)(x === null || x === void 0 ? void 0 : x.successful_transaction_count);
}
exports.isStellarLedger = isStellarLedger;
function isStellarTransaction(x) {
    return (0, ts_common_1.isObject)(x) && !(0, ts_common_1.isUndefined)(x === null || x === void 0 ? void 0 : x.source_account);
}
exports.isStellarTransaction = isStellarTransaction;
function isStellarTransactionRecord(x) {
    return (0, ts_common_1.isObject)(x) && (0, lodash_1.isFunction)(x.ledger);
}
exports.isStellarTransactionRecord = isStellarTransactionRecord;
function padLeft(x, n, v) {
    while (x.length < n) {
        x = `${v}${x}`;
    }
    return x;
}
exports.padLeft = padLeft;
function resolveStellarServer(config, network) {
    let { api, server } = config;
    if (api) {
        return {
            api,
            server: api.serverURL.toString(),
        };
    }
    if (typeof server === 'undefined') {
        server = network === lib_common_1.NetworkType.Testnet ? constants_1.DEFAULT_TESTNET_SERVER : constants_1.DEFAULT_MAINNET_SERVER;
    }
    if ((0, ts_common_1.isString)(server)) {
        return {
            api: new types_1.StellarServerAPI(server),
            server,
        };
    }
    else {
        // null server arg -> offline mode
        return {
            api: null,
            server: null,
        };
    }
}
exports.resolveStellarServer = resolveStellarServer;
const RETRYABLE_ERRORS = ['timeout', 'disconnected'];
const MAX_RETRIES = 3;
function retryIfDisconnected(fn, stellarApi, logger) {
    return (0, promise_retry_1.default)((retry, attempt) => {
        return fn().catch(async (e) => {
            if ((0, lib_common_1.isMatchingError)(e, RETRYABLE_ERRORS)) {
                logger.log(`Retryable error during stellar server call, retrying ${MAX_RETRIES - attempt} more times`, e.toString());
                retry(e);
            }
            throw e;
        });
    }, {
        retries: MAX_RETRIES,
    });
}
exports.retryIfDisconnected = retryIfDisconnected;
//# sourceMappingURL=utils.js.map