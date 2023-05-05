"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinBalanceMonitor = void 0;
const BitcoinPaymentsUtils_1 = require("./BitcoinPaymentsUtils");
const BitcoinishBalanceMonitor_1 = require("./bitcoinish/BitcoinishBalanceMonitor");
const utils_1 = require("./utils");
class BitcoinBalanceMonitor extends BitcoinishBalanceMonitor_1.BitcoinishBalanceMonitor {
    constructor(config) {
        super({
            ...(0, utils_1.toBitcoinishConfig)(config),
            utils: new BitcoinPaymentsUtils_1.BitcoinPaymentsUtils(config),
        });
    }
}
exports.BitcoinBalanceMonitor = BitcoinBalanceMonitor;
//# sourceMappingURL=BitcoinBalanceMonitor.js.map