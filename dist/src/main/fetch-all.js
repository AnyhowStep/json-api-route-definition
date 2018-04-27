"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
const util_1 = require("./util");
function fetchAll(route, response) {
    return route
        .method("GET")
        .responseDelegate(jsonApi.createDocumentWithDelegate(sd.array(util_1.toAssertDelegate(response))).assertDelegate);
}
exports.fetchAll = fetchAll;
//# sourceMappingURL=fetch-all.js.map