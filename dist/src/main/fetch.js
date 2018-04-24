"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
function fetch(route, responseDataCtor) {
    return route
        .method("GET")
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
}
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map