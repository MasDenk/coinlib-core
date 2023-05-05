"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RippleConnected = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
class RippleConnected {
    constructor(config = {}) {
        (0, ts_common_1.assertType)(types_1.BaseRippleConfig, config);
        this.networkType = config.network || constants_1.DEFAULT_NETWORK;
        this.logger = new ts_common_1.DelegateLogger(config.logger, constants_1.PACKAGE_NAME);
        const { api, server } = this.resolveRippleServer(config, this.networkType);
        this.api = api;
        this.server = server;
    }
    resolveRippleServer(config, network) {
        let { server, api } = config;
        if (api) {
            return {
                api,
                server: api.connection._url || '',
            };
        }
        if (typeof server === 'undefined') {
            server = network === lib_common_1.NetworkType.Testnet ? constants_1.DEFAULT_TESTNET_SERVER : constants_1.DEFAULT_MAINNET_SERVER;
        }
        if ((0, ts_common_1.isString)(server)) {
            const api = new types_1.RippleServerAPI({
                server,
            });
            api.on('error', (errorCode, errorMessage) => {
                this.logger.warn(`ripple api error ${errorCode}: ${errorMessage}`);
            });
            api.on('connected', () => {
                this.logger.debug('ripple api connected');
            });
            api.on('disconnected', (code) => {
                // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
                // will be 1000 if this was normal closure
                this.logger.warn(`ripple api disconnected, code: ${code}`);
            });
            return {
                api,
                server,
            };
        }
        else {
            // null server arg -> offline mode
            return {
                api: new types_1.RippleServerAPI(),
                server: null,
            };
        }
    }
    async init() {
        if (!this.api.isConnected()) {
            await this.api.connect();
        }
    }
    async destroy() {
        if (this.api.isConnected()) {
            await this.api.disconnect();
        }
    }
}
exports.RippleConnected = RippleConnected;
//# sourceMappingURL=RippleConnected.js.map