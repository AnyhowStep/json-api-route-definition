"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonApi = require("@anyhowstep/json-api-schema");
function update(route, bodyF, dataF, actionName = "", method = "PUT", metaF) {
    return route
        .append(`/${actionName}`)
        .method(method)
        .body(bodyF)
        .response(jsonApi.serverDocument(dataF, metaF));
}
exports.update = update;
//# sourceMappingURL=update.js.map