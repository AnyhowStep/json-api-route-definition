"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
const util_1 = require("./util");
function fetch(route, response) {
    return route
        .method("GET")
        .responseDelegate(jsonApi.createDocumentWithDelegate(util_1.toAssertDelegate(response)).assertDelegate);
}
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map