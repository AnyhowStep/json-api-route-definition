"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
function fetchAll(route, responseDataCtor) {
    return route
        .method("GET")
        .responseAssertion(jsonApi.createDocumentWithDelegate(sd.array(sd.nested(responseDataCtor))).assertion);
}
exports.fetchAll = fetchAll;
//# sourceMappingURL=fetch-all.js.map