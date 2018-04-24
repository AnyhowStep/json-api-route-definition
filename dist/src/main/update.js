"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
function update(route, actionName, bodyCtor, responseDataCtor, method = "PUT") {
    if (actionName != "") {
        const paramT = route.args.paramT;
        route = route
            .withoutParam()
            .append(`/${actionName}`)
            .paramAssertion(paramT);
    }
    return route
        .method(method)
        .body(bodyCtor)
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
}
exports.update = update;
//# sourceMappingURL=update.js.map