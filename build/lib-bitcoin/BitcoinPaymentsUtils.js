"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinPaymentsUtils = void 0;
const bitcoinish_1 = require("./bitcoinish");
const utils_1 = require("./utils");
const helpers_1 = require("./helpers");
class BitcoinPaymentsUtils extends bitcoinish_1.BitcoinishPaymentsUtils {
    constructor(config = {}) {
        super((0, utils_1.toBitcoinishConfig)(config));
    }
    isValidAddress(address) {
        return (0, helpers_1.isValidAddress)(address, this.networkType);
    }
    standardizeAddress(address) {
        return (0, helpers_1.standardizeAddress)(address, this.networkType);
    }
    isValidPublicKey(privateKey) {
        return (0, helpers_1.isValidPublicKey)(privateKey, this.networkType);
    }
    isValidPrivateKey(privateKey) {
        return (0, helpers_1.isValidPrivateKey)(privateKey, this.networkType);
    }
}
exports.BitcoinPaymentsUtils = BitcoinPaymentsUtils;
//# sourceMappingURL=BitcoinPaymentsUtils.js.map