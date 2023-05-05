"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsError = exports.PaymentsErrorCode = void 0;
var PaymentsErrorCode;
(function (PaymentsErrorCode) {
    PaymentsErrorCode["TxExpired"] = "PAYMENTS_TX_EXPIRED";
    PaymentsErrorCode["TxSequenceTooHigh"] = "PAYMENTS_TX_SEQUENCE_TOO_HIGH";
    PaymentsErrorCode["TxSequenceCollision"] = "PAYMENTS_TX_SEQUENCE_COLLISION";
    /** Sender doesn't have enough balance for the output amount + fee */
    PaymentsErrorCode["TxInsufficientBalance"] = "PAYMENTS_TX_INSUFFICIENT_BALANCE";
    /** Fee exceeds the maximum acceptable percent relative to output amount */
    PaymentsErrorCode["TxFeeTooHigh"] = "PAYMENTS_TX_FEE_TOO_HIGH";
})(PaymentsErrorCode = exports.PaymentsErrorCode || (exports.PaymentsErrorCode = {}));
class PaymentsError extends Error {
    constructor(code, message) {
        super(typeof message === 'undefined' ? code : `${code} - ${message.toString()}`);
        this.code = code;
        this.name = PaymentsError.name;
    }
}
exports.PaymentsError = PaymentsError;
//# sourceMappingURL=errors.js.map