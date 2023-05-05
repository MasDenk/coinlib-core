"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryIfDisconnected = exports.toError = void 0;
const ts_common_1 = require("../ts-common");
const promise_retry_1 = __importDefault(require("promise-retry"));
/** Converts strings to Error */
function toError(e) {
    if (typeof e === 'string') {
        return new Error(e);
    }
    return e;
}
exports.toError = toError;
const RETRYABLE_ERRORS = ['Request failed'];
const MAX_RETRIES = 2;
function retryIfDisconnected(fn, logger) {
    return (0, promise_retry_1.default)((retry, attempt) => {
        return fn().catch(async (e) => {
            e = toError(e);
            if ((0, ts_common_1.isMatchingError)(e, RETRYABLE_ERRORS)) {
                logger.log(`Retryable error during tron-payments call, retrying ${MAX_RETRIES - attempt} more times`, e.toString());
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