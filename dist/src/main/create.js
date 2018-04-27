"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
const util_1 = require("./util");
function create(route, body, response) {
    return route
        .method("POST")
        .bodyDelegate(util_1.toAssertDelegate(body))
        .responseDelegate(jsonApi.createDocumentWithDelegate(util_1.toAssertDelegate(response)).assertDelegate);
}
exports.create = create;
//# sourceMappingURL=create.js.map