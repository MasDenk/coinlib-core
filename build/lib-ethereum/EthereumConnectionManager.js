"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumConnectionManager = void 0;
class EthereumConnectionManager {
    constructor() {
        this.connections = {};
    }
    getConnection(connected) {
        return { web3: connected.web3, blockbookApi: connected.blockBookApi };
    }
    getConnectionUrl(config) {
        var _a, _b;
        const { fullNode, blockbookNode } = config;
        if (fullNode && blockbookNode) {
            return `${fullNode}-${blockbookNode}`;
        }
        return (_b = (_a = config.fullNode) !== null && _a !== void 0 ? _a : config.blockbookNode) !== null && _b !== void 0 ? _b : null;
    }
    setConnection(config, ethereumConnection) {
        config.web3 = ethereumConnection.web3;
        config.blockbookApi = ethereumConnection.blockbookApi;
    }
}
exports.EthereumConnectionManager = EthereumConnectionManager;
//# sourceMappingURL=EthereumConnectionManager.js.map