"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBalanceMonitor = void 0;
const DashPaymentsUtils_1 = require("./DashPaymentsUtils");
const lib_bitcoin_1 = require("../lib-bitcoin");
const utils_1 = require("./utils");
class DashBalanceMonitor extends lib_bitcoin_1.bitcoinish.BitcoinishBalanceMonitor {
    constructor(config) {
        super({
            ...(0, utils_1.toBitcoinishConfig)(config),
            utils: new DashPaymentsUtils_1.DashPaymentsUtils(config),
        });
    }
}
exports.DashBalanceMonitor = DashBalanceMonitor;
//# sourceMappingURL=DashBalanceMonitor.js.map