"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitecoinPaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const LitecoinPaymentsUtils_1 = require("./LitecoinPaymentsUtils");
const HdLitecoinPayments_1 = require("./HdLitecoinPayments");
const KeyPairLitecoinPayments_1 = require("./KeyPairLitecoinPayments");
const MultisigLitecoinPayments_1 = require("./MultisigLitecoinPayments");
const LitecoinBalanceMonitor_1 = require("./LitecoinBalanceMonitor");
class LitecoinPaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
        this.hasBalanceMonitor = true;
        this.connectionManager = new lib_common_1.StandardConnectionManager();
    }
    newPayments(config) {
        if (types_1.HdLitecoinPaymentsConfig.is(config)) {
            return new HdLitecoinPayments_1.HdLitecoinPayments(config);
        }
        if (types_1.KeyPairLitecoinPaymentsConfig.is(config)) {
            return new KeyPairLitecoinPayments_1.KeyPairLitecoinPayments(config);
        }
        if (types_1.MultisigLitecoinPaymentsConfig.is(config)) {
            return new MultisigLitecoinPayments_1.MultisigLitecoinPayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new LitecoinPaymentsUtils_1.LitecoinPaymentsUtils((0, ts_common_1.assertType)(types_1.LitecoinPaymentsUtilsConfig, config, 'config'));
    }
    newBalanceMonitor(config) {
        return new LitecoinBalanceMonitor_1.LitecoinBalanceMonitor((0, ts_common_1.assertType)(types_1.LitecoinBalanceMonitorConfig, config, 'config'));
    }
}
exports.LitecoinPaymentsFactory = LitecoinPaymentsFactory;
exports.default = LitecoinPaymentsFactory;
//# sourceMappingURL=LitecoinPaymentsFactory.js.map