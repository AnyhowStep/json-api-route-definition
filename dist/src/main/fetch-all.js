"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
function fetchAll(keyBuilder, responseDataCtor) {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .responseAssertion(jsonApi.createDocumentWithDelegate(sd.array(sd.nested(responseDataCtor))).assertion);
    return route;
}
exports.fetchAll = fetchAll;
//# sourceMappingURL=fetch-all.js.map