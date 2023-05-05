"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinPayments = void 0;
const bip39 = __importStar(require("bip39"));
const ts_common_1 = require("../ts-common");
const lib_common_1 = require("../lib-common");
const types_1 = require("./types");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
function addSeedIfNecessary(network, seed, config) {
    const configCodec = types_1.paymentsConfigCodecs[network];
    let result = config;
    if (configCodec.is(result)) {
        return result;
    }
    result = {
        ...config,
        seed: seed.toString('hex'),
    };
    if (configCodec.is(result)) {
        return result;
    }
    result = {
        ...config,
        hdKey: lib_common_1.bip32.fromSeed(seed).toBase58(),
    };
    if (configCodec.is(result)) {
        return result;
    }
    throw new Error(`Invalid config provided for ${network}`);
}
class CoinPayments {
    constructor(config) {
        this.config = config;
        this.payments = {};
        (0, ts_common_1.assertType)(types_1.CoinPaymentsConfig, config);
        this.network = config.network || lib_common_1.NetworkType.Mainnet;
        this.logger = config.logger || console;
        this.seedBuffer =
            (config.seed &&
                (config.seed.includes(' ') ? bip39.mnemonicToSeedSync(config.seed) : Buffer.from(config.seed, 'hex'))) ||
                undefined;
        const accountIdSet = new Set();
        constants_1.SUPPORTED_NETWORK_SYMBOLS.forEach((networkSymbol) => {
            const networkConfig = config[networkSymbol];
            if (!networkConfig && !this.seedBuffer) {
                return;
            }
            const networkPayments = this.newPayments(networkSymbol, networkConfig);
            this.payments[networkSymbol] = networkPayments;
            networkPayments.getAccountIds().forEach((id) => accountIdSet.add(id));
        });
        this.accountIds = Array.from(accountIdSet);
    }
    /** Get the global payments factory for a network */
    static getFactory(networkSymbol) {
        const paymentsFactory = constants_1.PAYMENTS_FACTORIES[networkSymbol];
        if (!paymentsFactory) {
            throw new Error(`No payment factory configured for network symbol ${networkSymbol}`);
        }
        return paymentsFactory;
    }
    newPayments(networkSymbol, partialConfig) {
        let paymentsConfig = partialConfig;
        if (this.seedBuffer) {
            paymentsConfig = addSeedIfNecessary(networkSymbol, this.seedBuffer, paymentsConfig || {});
        }
        // Clone to avoid mutating external objects
        paymentsConfig = { ...paymentsConfig };
        if (this.config.network) {
            paymentsConfig.network = this.config.network;
        }
        if (this.config.logger) {
            paymentsConfig.logger = this.config.logger;
        }
        (0, ts_common_1.assertType)(types_1.paymentsConfigCodecs[networkSymbol], paymentsConfig, `${networkSymbol} config`);
        return CoinPayments.getFactory(networkSymbol).newPayments(paymentsConfig);
    }
    getPublicConfig() {
        return (0, utils_1.keysOf)(this.payments).reduce((o, k) => {
            const publicConfig = this.forNetwork(k).getPublicConfig();
            // Ensure we don't accidentally expose sensitive fields
            if (publicConfig.seed) {
                delete publicConfig.seed;
            }
            if (publicConfig.hdKey && publicConfig.hdKey.startsWith('xprv')) {
                delete publicConfig.hdKey;
            }
            o[k] = publicConfig;
            return o;
        }, {});
    }
    getAccountIds() {
        return this.accountIds;
    }
    forNetwork(networkSymbol, extraConfig) {
        const payments = this.payments[networkSymbol];
        if (!payments) {
            throw new Error(`No payments interface configured for network ${networkSymbol}`);
        }
        if (extraConfig) {
            return this.newPayments(networkSymbol, {
                ...payments.getFullConfig(),
                ...extraConfig,
            });
        }
        return payments;
    }
    isNetworkSupported(networkSymbol) {
        return types_1.SupportedCoinPaymentsSymbol.is(networkSymbol);
    }
    isNetworkConfigured(networkSymbol) {
        return this.isNetworkSupported(networkSymbol) && Boolean(this.payments[networkSymbol]);
    }
}
exports.CoinPayments = CoinPayments;
exports.default = CoinPayments;
//# sourceMappingURL=CoinPayments.js.map