"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
const util_1 = require("./util");
function update(route, actionName, body, response, method = "PUT") {
    return route
        .append(`/${actionName}`)
        .method(method)
        .bodyDelegate(util_1.toAssertDelegate(body))
        .responseDelegate(jsonApi.createDocumentWithDelegate(util_1.toAssertDelegate(response)).assertDelegate);
}
exports.update = update;
//# sourceMappingURL=update.js.map