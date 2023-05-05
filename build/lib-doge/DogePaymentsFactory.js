"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogePaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const DogePaymentsUtils_1 = require("./DogePaymentsUtils");
const HdDogePayments_1 = require("./HdDogePayments");
const KeyPairDogePayments_1 = require("./KeyPairDogePayments");
const MultisigDogePayments_1 = require("./MultisigDogePayments");
const DogeBalanceMonitor_1 = require("./DogeBalanceMonitor");
class DogePaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
        this.hasBalanceMonitor = true;
        this.connectionManager = new lib_common_1.StandardConnectionManager();
    }
    newPayments(config) {
        if (types_1.HdDogePaymentsConfig.is(config)) {
            return new HdDogePayments_1.HdDogePayments(config);
        }
        if (types_1.KeyPairDogePaymentsConfig.is(config)) {
            return new KeyPairDogePayments_1.KeyPairDogePayments(config);
        }
        if (types_1.MultisigDogePaymentsConfig.is(config)) {
            return new MultisigDogePayments_1.MultisigDogePayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new DogePaymentsUtils_1.DogePaymentsUtils((0, ts_common_1.assertType)(types_1.DogePaymentsUtilsConfig, config, 'config'));
    }
    newBalanceMonitor(config) {
        return new DogeBalanceMonitor_1.DogeBalanceMonitor((0, ts_common_1.assertType)(types_1.DogeBalanceMonitorConfig, config, 'config'));
    }
}
exports.DogePaymentsFactory = DogePaymentsFactory;
exports.default = DogePaymentsFactory;
//# sourceMappingURL=DogePaymentsFactory.js.map