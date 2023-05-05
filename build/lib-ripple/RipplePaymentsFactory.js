"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RipplePaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const HdRipplePayments_1 = require("./HdRipplePayments");
const AccountRipplePayments_1 = require("./AccountRipplePayments");
const RipplePaymentsUtils_1 = require("./RipplePaymentsUtils");
const RippleBalanceMonitor_1 = require("./RippleBalanceMonitor");
class RipplePaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
        this.hasBalanceMonitor = true;
        this.connectionManager = new lib_common_1.StandardConnectionManager();
    }
    newPayments(config) {
        if (types_1.AccountRipplePaymentsConfig.is(config)) {
            return new AccountRipplePayments_1.AccountRipplePayments(config);
        }
        if (types_1.HdRipplePaymentsConfig.is(config)) {
            return new HdRipplePayments_1.HdRipplePayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new RipplePaymentsUtils_1.RipplePaymentsUtils((0, ts_common_1.assertType)(types_1.BaseRipplePaymentsConfig, config, 'config'));
    }
    newBalanceMonitor(config) {
        return new RippleBalanceMonitor_1.RippleBalanceMonitor((0, ts_common_1.assertType)(types_1.RippleBalanceMonitorConfig, config, 'config'));
    }
}
exports.RipplePaymentsFactory = RipplePaymentsFactory;
exports.default = RipplePaymentsFactory;
//# sourceMappingURL=RipplePaymentsFactory.js.map