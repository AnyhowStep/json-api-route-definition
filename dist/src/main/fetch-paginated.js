"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
exports.fetchPaginatedQuery = sd.toSchema({
    page: sd.maybe(sd.stringToNaturalNumber()),
    itemsPerPage: sd.maybe(sd.stringToNaturalNumber()),
});
exports.fetchPaginatedMeta = sd.toSchema({
    itemsFound: sd.naturalNumber(),
    pagesFound: sd.naturalNumber(),
    page: sd.naturalNumber(),
    itemsPerPage: sd.naturalNumber(),
});
function fetchPaginated(route, dataF) {
    return route
        .method("GET")
        .query(exports.fetchPaginatedQuery)
        .response(jsonApi.serverDocument(sd.array(dataF), exports.fetchPaginatedMeta));
}
exports.fetchPaginated = fetchPaginated;
//# sourceMappingURL=fetch-paginated.js.map