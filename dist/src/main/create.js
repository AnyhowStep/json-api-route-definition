"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
function create(keyBuilder, bodyCtor, responseDataCtor) {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("POST")
        .body(bodyCtor)
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
    return route;
}
exports.create = create;
//# sourceMappingURL=create.js.map