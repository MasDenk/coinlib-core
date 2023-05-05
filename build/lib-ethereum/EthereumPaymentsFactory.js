"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumPaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const EthereumConnectionManager_1 = require("./EthereumConnectionManager");
const EthereumPaymentsUtils_1 = require("./EthereumPaymentsUtils");
const HdEthereumPayments_1 = require("./HdEthereumPayments");
const KeyPairEthereumPayments_1 = require("./KeyPairEthereumPayments");
const HdErc20Payments_1 = require("./erc20/HdErc20Payments");
const EthereumBalanceMonitor_1 = require("./EthereumBalanceMonitor");
class EthereumPaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
        this.hasBalanceMonitor = true;
        this.connectionManager = new EthereumConnectionManager_1.EthereumConnectionManager();
    }
    newPayments(config) {
        if (types_1.HdErc20PaymentsConfig.is(config)) {
            return new HdErc20Payments_1.HdErc20Payments(config);
        }
        if (types_1.KeyPairErc20PaymentsConfig.is(config)) {
            throw new Error(`Cannot instantiate ${this.packageName} for unsupported KeyPairErc20PaymentsConfig`);
            // return new KeyPairErc20Payments(config)
        }
        if (types_1.HdEthereumPaymentsConfig.is(config)) {
            return new HdEthereumPayments_1.HdEthereumPayments(config);
        }
        if (types_1.KeyPairEthereumPaymentsConfig.is(config)) {
            return new KeyPairEthereumPayments_1.KeyPairEthereumPayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new EthereumPaymentsUtils_1.EthereumPaymentsUtils((0, ts_common_1.assertType)(types_1.EthereumPaymentsUtilsConfig, config, 'config'));
    }
    newBalanceMonitor(config) {
        return new EthereumBalanceMonitor_1.EthereumBalanceMonitor((0, ts_common_1.assertType)(types_1.EthereumBalanceMonitorConfig, config, 'config'));
    }
}
exports.EthereumPaymentsFactory = EthereumPaymentsFactory;
exports.default = EthereumPaymentsFactory;
//# sourceMappingURL=EthereumPaymentsFactory.js.map