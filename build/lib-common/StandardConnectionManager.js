"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardConnectionManager = void 0;
class StandardConnectionManager {
    constructor() {
        this.connections = {};
    }
    getConnection(connected) {
        return connected.api;
    }
    getConnectionUrl(config) {
        return config.server || null;
    }
    setConnection(config, connection) {
        config.api = connection;
    }
}
exports.StandardConnectionManager = StandardConnectionManager;
//# sourceMappingURL=StandardConnectionManager.js.map