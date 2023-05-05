"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarPaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const HdStellarPayments_1 = require("./HdStellarPayments");
const AccountStellarPayments_1 = require("./AccountStellarPayments");
const StellarPaymentsUtil_1 = require("./StellarPaymentsUtil");
const StellarBalanceMonitor_1 = require("./StellarBalanceMonitor");
class StellarPaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
        this.hasBalanceMonitor = true;
        this.connectionManager = new lib_common_1.StandardConnectionManager();
    }
    newPayments(config) {
        if (types_1.AccountStellarPaymentsConfig.is(config)) {
            return new AccountStellarPayments_1.AccountStellarPayments(config);
        }
        if (types_1.HdStellarPaymentsConfig.is(config)) {
            return new HdStellarPayments_1.HdStellarPayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new StellarPaymentsUtil_1.StellarPaymentsUtils((0, ts_common_1.assertType)(types_1.BaseStellarPaymentsConfig, config, 'config'));
    }
    newBalanceMonitor(config) {
        return new StellarBalanceMonitor_1.StellarBalanceMonitor((0, ts_common_1.assertType)(types_1.StellarBalanceMonitorConfig, config, 'config'));
    }
}
exports.StellarPaymentsFactory = StellarPaymentsFactory;
exports.default = StellarPaymentsFactory;
//# sourceMappingURL=StellarPaymentsFactory.js.map