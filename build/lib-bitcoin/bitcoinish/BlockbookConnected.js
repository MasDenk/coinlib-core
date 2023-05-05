"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockbookConnected = void 0;
const ts_common_1 = require("../../ts-common");
const types_1 = require("./types");
const utils_1 = require("./utils");
class BlockbookConnected {
    constructor(config) {
        (0, ts_common_1.assertType)(types_1.BlockbookConnectedConfig, config);
        this.networkType = config.network;
        this.logger = new ts_common_1.DelegateLogger(config.logger, config.packageName);
        const { api, server } = (0, utils_1.resolveServer)(config, this.logger);
        this.api = api;
        this.server = server;
    }
    getApi() {
        if (this.server === null) {
            throw new Error('Cannot access blockbook network when configured with null server');
        }
        return this.api;
    }
    async init() {
        await this.api.connect();
    }
    async destroy() {
        await this.api.disconnect();
    }
}
exports.BlockbookConnected = BlockbookConnected;
//# sourceMappingURL=BlockbookConnected.js.map