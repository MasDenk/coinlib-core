"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashPaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const DashPaymentsUtils_1 = require("./DashPaymentsUtils");
const HdDashPayments_1 = require("./HdDashPayments");
const KeyPairDashPayments_1 = require("./KeyPairDashPayments");
const MultisigDashPayments_1 = require("./MultisigDashPayments");
const DashBalanceMonitor_1 = require("./DashBalanceMonitor");
class DashPaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
        this.hasBalanceMonitor = true;
        this.connectionManager = new lib_common_1.StandardConnectionManager();
    }
    newPayments(config) {
        if (types_1.HdDashPaymentsConfig.is(config)) {
            return new HdDashPayments_1.HdDashPayments(config);
        }
        if (types_1.KeyPairDashPaymentsConfig.is(config)) {
            return new KeyPairDashPayments_1.KeyPairDashPayments(config);
        }
        if (types_1.MultisigDashPaymentsConfig.is(config)) {
            return new MultisigDashPayments_1.MultisigDashPayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new DashPaymentsUtils_1.DashPaymentsUtils((0, ts_common_1.assertType)(types_1.DashPaymentsUtilsConfig, config, 'config'));
    }
    newBalanceMonitor(config) {
        return new DashBalanceMonitor_1.DashBalanceMonitor((0, ts_common_1.assertType)(types_1.DashBalanceMonitorConfig, config, 'config'));
    }
}
exports.DashPaymentsFactory = DashPaymentsFactory;
exports.default = DashPaymentsFactory;
//# sourceMappingURL=DashPaymentsFactory.js.map