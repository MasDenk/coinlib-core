"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsFactory = void 0;
/**
 * A factory class for instantiating various payments objects. Includes basic connection management
 * for reusing an established connection across objects.
 */
class PaymentsFactory {
    constructor() {
        /** true if newBalanceMonitor has been implemented */
        this.hasBalanceMonitor = false;
    }
    /** Instantiate a new BalanceMonitor object. Override this if supported. */
    newBalanceMonitor(c) {
        throw new Error(`${this.packageName} balance monitor not supported`);
    }
    /** Instantiate a Payments object using an existing connection */
    initPayments(config) {
        return this.reuseConnection(config, this.newPayments.bind(this));
    }
    /** Instantiate a PaymentsUtils object using an existing connection */
    initUtils(config) {
        return this.reuseConnection(config, this.newUtils.bind(this));
    }
    /** Instantiate a BalanceMonitor object using an existing connection */
    initBalanceMonitor(config) {
        return this.reuseConnection(config, this.newBalanceMonitor.bind(this));
    }
    async createConnection(config, instantiator) {
        const connected = instantiator(config);
        await connected.init();
        return connected;
    }
    async reuseConnection(config, instantiator) {
        if (!this.connectionManager) {
            return this.createConnection(config, instantiator);
        }
        const url = this.connectionManager.getConnectionUrl(config);
        if (!url) {
            return this.createConnection(config, instantiator);
        }
        const urlKey = String(url);
        const existingConnection = this.connectionManager.connections[urlKey];
        if (existingConnection) {
            // connection is cached, pass it to instantiated object
            config = { ...config }; // avoid mutating external objects
            this.connectionManager.setConnection(config, existingConnection);
            return this.createConnection(config, instantiator);
        }
        else {
            // connection isnt cached yet, get it and add it to cache
            const connected = await this.createConnection(config, instantiator);
            this.connectionManager.connections[urlKey] = this.connectionManager.getConnection(connected);
            return connected;
        }
    }
}
exports.PaymentsFactory = PaymentsFactory;
//# sourceMappingURL=PaymentsFactory.js.map