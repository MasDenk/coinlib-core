"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglesigDashPayments = void 0;
const types_1 = require("./types");
const lib_bitcoin_1 = require("../lib-bitcoin");
const BaseDashPayments_1 = require("./BaseDashPayments");
const constants_1 = require("./constants");
class SinglesigDashPayments extends BaseDashPayments_1.BaseDashPayments {
    constructor(config) {
        super(config);
        this.addressType = config.addressType || constants_1.SINGLESIG_ADDRESS_TYPE;
    }
    getPaymentScript(index) {
        return lib_bitcoin_1.bitcoinish.getSinglesigPaymentScript(this.bitcoinjsNetwork, this.addressType, this.getKeyPair(index).publicKey);
    }
    signMultisigTransaction(tx) {
        return lib_bitcoin_1.bitcoinish.signMultisigTransaction(tx, this);
    }
    async signTransaction(tx) {
        return lib_bitcoin_1.bitcoinish.signTransaction(tx, this);
    }
    getSupportedAddressTypes() {
        return [types_1.AddressType.Legacy];
    }
}
exports.SinglesigDashPayments = SinglesigDashPayments;
//# sourceMappingURL=SinglesigDashPayments.js.map