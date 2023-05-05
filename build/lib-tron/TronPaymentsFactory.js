"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronPaymentsFactory = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const HdTronPayments_1 = require("./HdTronPayments");
const KeyPairTronPayments_1 = require("./KeyPairTronPayments");
const TronPaymentsUtils_1 = require("./TronPaymentsUtils");
class TronPaymentsFactory extends lib_common_1.PaymentsFactory {
    constructor() {
        super(...arguments);
        this.packageName = constants_1.PACKAGE_NAME;
    }
    newPayments(config) {
        if (types_1.HdTronPaymentsConfig.is(config)) {
            return new HdTronPayments_1.HdTronPayments(config);
        }
        if (types_1.KeyPairTronPaymentsConfig.is(config)) {
            return new KeyPairTronPayments_1.KeyPairTronPayments(config);
        }
        throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`);
    }
    newUtils(config) {
        return new TronPaymentsUtils_1.TronPaymentsUtils((0, ts_common_1.assertType)(types_1.BaseTronPaymentsConfig, config, 'config'));
    }
}
exports.TronPaymentsFactory = TronPaymentsFactory;
exports.default = TronPaymentsFactory;
//# sourceMappingURL=TronPaymentsFactory.js.map