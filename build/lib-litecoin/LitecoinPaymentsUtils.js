"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitecoinPaymentsUtils = void 0;
const lib_bitcoin_1 = require("../lib-bitcoin");
const utils_1 = require("./utils");
const types_1 = require("./types");
const helpers_1 = require("./helpers");
const ts_common_1 = require("../ts-common");
const constants_1 = require("./constants");
class LitecoinPaymentsUtils extends lib_bitcoin_1.bitcoinish.BitcoinishPaymentsUtils {
    constructor(config = {}) {
        super((0, utils_1.toBitcoinishConfig)(config));
        this.validAddressFormat = config.validAddressFormat;
    }
    isValidAddress(address, options) {
        var _a;
        // prefer argument over configured format, default to any (undefined)
        const format = (0, ts_common_1.assertType)((0, ts_common_1.optional)(types_1.LitecoinAddressFormatT), (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : this.validAddressFormat, 'format');
        return (0, helpers_1.isValidAddress)(address, this.networkType, format);
    }
    standardizeAddress(address, options) {
        var _a, _b;
        // prefer argument over configured format, default to cash address
        const format = (0, ts_common_1.assertType)(types_1.LitecoinAddressFormatT, (_b = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : this.validAddressFormat) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_ADDRESS_FORMAT, 'format');
        const standardized = (0, helpers_1.standardizeAddress)(address, this.networkType, format);
        if (standardized && address !== standardized) {
            this.logger.log(`Standardized ${this.coinSymbol} address to ${format} format: ${address} -> ${standardized}`);
        }
        return standardized;
    }
    isValidPublicKey(publicKey) {
        return (0, helpers_1.isValidPublicKey)(publicKey, this.networkType);
    }
    isValidPrivateKey(privateKey) {
        return (0, helpers_1.isValidPrivateKey)(privateKey, this.networkType);
    }
}
exports.LitecoinPaymentsUtils = LitecoinPaymentsUtils;
//# sourceMappingURL=LitecoinPaymentsUtils.js.map