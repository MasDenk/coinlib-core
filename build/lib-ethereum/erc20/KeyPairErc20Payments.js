"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairErc20Payments = void 0;
const __1 = require("..");
const BaseErc20Payments_1 = require("./BaseErc20Payments");
const mixins_1 = require("./mixins");
class KeyPairErc20Payments {
}
exports.KeyPairErc20Payments = KeyPairErc20Payments;
(0, mixins_1.applyMixins)(KeyPairErc20Payments, [BaseErc20Payments_1.BaseErc20Payments, __1.KeyPairEthereumPayments]);
exports.default = KeyPairErc20Payments;
//# sourceMappingURL=KeyPairErc20Payments.js.map