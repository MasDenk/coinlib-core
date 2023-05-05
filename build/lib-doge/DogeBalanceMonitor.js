"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogeBalanceMonitor = void 0;
const DogePaymentsUtils_1 = require("./DogePaymentsUtils");
const lib_bitcoin_1 = require("../lib-bitcoin");
const utils_1 = require("./utils");
class DogeBalanceMonitor extends lib_bitcoin_1.bitcoinish.BitcoinishBalanceMonitor {
    constructor(config) {
        super({
            ...(0, utils_1.toBitcoinishConfig)(config),
            utils: new DogePaymentsUtils_1.DogePaymentsUtils(config),
        });
    }
}
exports.DogeBalanceMonitor = DogeBalanceMonitor;
//# sourceMappingURL=DogeBalanceMonitor.js.map