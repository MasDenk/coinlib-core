"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegateLogger = void 0;
class DelegateLogger {
    constructor(logger, prefix) {
        this.prefix = prefix;
        this.error = this.delegate('error');
        this.warn = this.delegate('warn');
        this.info = this.delegate('info');
        this.log = this.delegate('log');
        this.debug = this.delegate('debug');
        this.trace = this.delegate('trace');
        this.logger = typeof logger === 'undefined' ? console : logger;
        if (prefix) {
            this.prefix = `[${prefix}]`;
        }
    }
    delegate(method) {
        return (...args) => {
            if (this.logger !== null) {
                if (this.prefix) {
                    this.logger[method](this.prefix, ...args);
                }
                else {
                    this.logger[method](...args);
                }
            }
        };
    }
}
exports.DelegateLogger = DelegateLogger;
//# sourceMappingURL=DelegateLogger.js.map