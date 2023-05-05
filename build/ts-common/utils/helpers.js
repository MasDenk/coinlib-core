"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBigNumber = exports.isMatchingError = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const guards_1 = require("../guards");
function isMatchingError(e, partialMessages) {
    const messageLower = e.toString().toLowerCase();
    return partialMessages.some((pm) => messageLower.includes(pm.toLowerCase()));
}
exports.isMatchingError = isMatchingError;
function toBigNumber(value) {
    if ((0, guards_1.isNil)(value)) {
        return value;
    }
    if (value instanceof bignumber_js_1.default) {
        return value;
    }
    return new bignumber_js_1.default(value);
}
exports.toBigNumber = toBigNumber;
//# sourceMappingURL=helpers.js.map