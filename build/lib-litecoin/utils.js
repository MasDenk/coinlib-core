"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBitcoinishConfig = void 0;
const lib_common_1 = require("../lib-common");
const constants_1 = require("./constants");
const DEFAULT_BITCOINISH_CONFIG = {
    coinSymbol: constants_1.COIN_SYMBOL,
    coinName: constants_1.COIN_NAME,
    coinDecimals: constants_1.DECIMAL_PLACES,
    dustThreshold: constants_1.DEFAULT_DUST_THRESHOLD,
    networkMinRelayFee: constants_1.DEFAULT_NETWORK_MIN_RELAY_FEE,
    minTxFee: {
        feeRate: constants_1.DEFAULT_MIN_TX_FEE.toString(),
        feeRateType: lib_common_1.FeeRateType.BasePerWeight,
    },
    defaultFeeLevel: constants_1.DEFAULT_FEE_LEVEL,
};
function toBitcoinishConfig(config) {
    var _a, _b, _c;
    const configWithDefaults = {
        ...DEFAULT_BITCOINISH_CONFIG,
        ...config,
        network: config.network || constants_1.DEFAULT_NETWORK,
    };
    const { network, server } = configWithDefaults;
    return {
        ...configWithDefaults,
        packageName: constants_1.PACKAGE_NAME,
        bitcoinjsNetwork: network === lib_common_1.NetworkType.Testnet ? constants_1.NETWORK_TESTNET : constants_1.NETWORK_MAINNET,
        server: (_c = (_b = (_a = config === null || config === void 0 ? void 0 : config.api) === null || _a === void 0 ? void 0 : _a.nodes) !== null && _b !== void 0 ? _b : server) !== null && _c !== void 0 ? _c : (network === lib_common_1.NetworkType.Testnet ? constants_1.DEFAULT_TESTNET_SERVER : constants_1.DEFAULT_MAINNET_SERVER),
    };
}
exports.toBitcoinishConfig = toBitcoinishConfig;
//# sourceMappingURL=utils.js.map