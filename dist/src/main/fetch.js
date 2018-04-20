"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
function fetch(keyBuilder, responseDataCtor) {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
    return route;
}
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map