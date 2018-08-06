"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
function fetchAll(route, dataF, metaF) {
    return route
        .method("GET")
        .response(jsonApi.serverDocument(sd.array(dataF), metaF));
}
exports.fetchAll = fetchAll;
//# sourceMappingURL=fetch-all.js.map