"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
function create(route, bodyCtor, responseDataCtor) {
    return route
        .method("POST")
        .body(bodyCtor)
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
}
exports.create = create;
//# sourceMappingURL=create.js.map