"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
function update(keyBuilder, actionName, bodyCtor, responseDataCtor, method = "PUT") {
    const route = keyBuilder
        .setSuffix((actionName == "") ? "" : `/${actionName}`)
        .buildRoute(sd.Route.Create())
        .method(method)
        .body(bodyCtor)
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
    return route;
}
exports.update = update;
//# sourceMappingURL=update.js.map