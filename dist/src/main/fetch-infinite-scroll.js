"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
function fetchInfiniteScrollQuery(beforeF) {
    return sd.toSchema({
        limit: sd.maybe(sd.stringToNaturalNumber()),
        before: sd.maybe(beforeF),
    });
}
exports.fetchInfiniteScrollQuery = fetchInfiniteScrollQuery;
function fetchInfiniteScrollMeta(beforeF) {
    return sd.toSchema({
        itemsLeft: sd.naturalNumber(),
        limit: sd.naturalNumber(),
        before: sd.maybe(beforeF),
        earliest: sd.maybe(beforeF),
    });
}
exports.fetchInfiniteScrollMeta = fetchInfiniteScrollMeta;
function fetchInfiniteScroll(route, beforeF, dataF) {
    return route
        .method("GET")
        .query(fetchInfiniteScrollQuery(beforeF))
        .response(jsonApi.serverDocument(sd.array(dataF), fetchInfiniteScrollMeta(beforeF)));
}
exports.fetchInfiniteScroll = fetchInfiniteScroll;
//# sourceMappingURL=fetch-infinite-scroll.js.map