"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const bottleneck_1 = __importDefault(require("bottleneck"));
const RATE_LIMIT = 2500;
const limiter = new bottleneck_1.default({
    minTime: RATE_LIMIT,
    maxConcurrent: 1,
});
exports.limiter = limiter;
limiter.on('failed', async (error, jobInfo) => {
    console.log('Limiter failed: ', JSON.stringify(error));
    if (jobInfo.retryCount < 10) {
        return RATE_LIMIT + jobInfo.retryCount * 400;
    }
});
//# sourceMappingURL=limiters.js.map