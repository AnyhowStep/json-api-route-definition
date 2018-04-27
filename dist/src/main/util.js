"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_decorator_1 = require("schema-decorator");
function isCtor(assertFunc) {
    return assertFunc.length == 0;
}
exports.isCtor = isCtor;
function toAssertDelegate(assertFunc) {
    if (isCtor(assertFunc)) {
        return schema_decorator_1.nested(assertFunc);
    }
    else {
        return assertFunc;
    }
}
exports.toAssertDelegate = toAssertDelegate;
//# sourceMappingURL=util.js.map