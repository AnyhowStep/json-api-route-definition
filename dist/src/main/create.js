"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
function create(route, bodyF, dataF, metaF) {
    return route
        .method("POST")
        .body(bodyF)
        .response(jsonApi.serverDocument(dataF, metaF));
}
exports.create = create;
//# sourceMappingURL=create.js.map