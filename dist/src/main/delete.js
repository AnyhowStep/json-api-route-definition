"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function del(keyBuilder) {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("DELETE");
    return route;
}
exports.del = del;
//# sourceMappingURL=delete.js.map