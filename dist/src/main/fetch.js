"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
function fetch(route, dataF, metaF) {
    return route
        .method("GET")
        .response(jsonApi.serverDocument(dataF, metaF));
}
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map