"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinPaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const BitcoinPaymentsUtils_1 = require("./BitcoinPaymentsUtils");
const HdBitcoinPayments_1 = require("./HdBitcoinPayments");
const KeyPairBitcoinPayments_1 = require("./KeyPairBitcoinPayments");
const MultisigBitcoinPayments_1 = require("./MultisigBitcoinPayments");
const BitcoinBalanceMonitor_1 = require("./BitcoinBalanceMonitor");
class BitcoinPaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
        this.hasBalanceMonitor = true;
        this.connectionManager = new lib_common_1.StandardConnectionManager();
    }
    newPayments(config) {
        if (types_1.HdBitcoinPaymentsConfig.is(config)) {
            return new HdBitcoinPayments_1.HdBitcoinPayments(config);
        }
        if (types_1.KeyPairBitcoinPaymentsConfig.is(config)) {
            return new KeyPairBitcoinPayments_1.KeyPairBitcoinPayments(config);
        }
        if (types_1.MultisigBitcoinPaymentsConfig.is(config)) {
            return new MultisigBitcoinPayments_1.MultisigBitcoinPayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new BitcoinPaymentsUtils_1.BitcoinPaymentsUtils((0, ts_common_1.assertType)(types_1.BitcoinPaymentsUtilsConfig, config, 'config'));
    }
    newBalanceMonitor(config) {
        return new BitcoinBalanceMonitor_1.BitcoinBalanceMonitor((0, ts_common_1.assertType)(types_1.BitcoinBalanceMonitorConfig, config, 'config'));
    }
}
exports.BitcoinPaymentsFactory = BitcoinPaymentsFactory;
exports.default = BitcoinPaymentsFactory;
//# sourceMappingURL=BitcoinPaymentsFactory.js.map