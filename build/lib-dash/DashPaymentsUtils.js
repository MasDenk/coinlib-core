"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashPaymentsUtils = void 0;
const lib_bitcoin_1 = require("../lib-bitcoin");
const utils_1 = require("./utils");
const helpers_1 = require("./helpers");
const constants_1 = require("./constants");
class DashPaymentsUtils extends lib_bitcoin_1.bitcoinish.BitcoinishPaymentsUtils {
    constructor(config = {}) {
        var _a;
        super((0, utils_1.toBitcoinishConfig)(config));
        this.feeLevelBlockTargets = (_a = config.feeLevelBlockTargets) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_FEE_LEVEL_BLOCK_TARGETS;
    }
    isValidAddress(address) {
        return (0, helpers_1.isValidAddress)(address, this.networkType);
    }
    standardizeAddress(address) {
        return (0, helpers_1.standardizeAddress)(address, this.networkType);
    }
    isValidPublicKey(publicKey) {
        return (0, helpers_1.isValidPublicKey)(publicKey, this.networkType);
    }
    isValidPrivateKey(privateKey) {
        return (0, helpers_1.isValidPrivateKey)(privateKey, this.networkType);
    }
}
exports.DashPaymentsUtils = DashPaymentsUtils;
//# sourceMappingURL=DashPaymentsUtils.js.map