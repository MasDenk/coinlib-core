"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitecoinBalanceMonitor = void 0;
const LitecoinPaymentsUtils_1 = require("./LitecoinPaymentsUtils");
const lib_bitcoin_1 = require("../lib-bitcoin");
const utils_1 = require("./utils");
class LitecoinBalanceMonitor extends lib_bitcoin_1.bitcoinish.BitcoinishBalanceMonitor {
    constructor(config) {
        super({
            ...(0, utils_1.toBitcoinishConfig)(config),
            utils: new LitecoinPaymentsUtils_1.LitecoinPaymentsUtils(config),
        });
    }
}
exports.LitecoinBalanceMonitor = LitecoinBalanceMonitor;
//# sourceMappingURL=LitecoinBalanceMonitor.js.map