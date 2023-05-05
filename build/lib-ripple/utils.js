"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padLeft = void 0;
function padLeft(x, n, v) {
    while (x.length < n) {
        x = `${v}${x}`;
    }
    return x;
}
exports.padLeft = padLeft;
//# sourceMappingURL=utils.js.map