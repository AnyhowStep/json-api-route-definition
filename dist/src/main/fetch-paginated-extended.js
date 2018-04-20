"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const fetch_paginated_1 = require("./fetch-paginated");
function fetchPaginatedExtended(keyBuilder, assertExtendsT, responseDataCtor) {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .queryDelegate((name, mixed) => {
        const query = sd.toClass(name, mixed, fetch_paginated_1.PaginateQuery);
        const extended = assertExtendsT(name, mixed);
        return Object.assign({}, query, extended);
    })
        .responseDelegate(fetch_paginated_1.buildFetchPaginatedResponseAssertDelegate(responseDataCtor));
    return route;
}
exports.fetchPaginatedExtended = fetchPaginatedExtended;
//# sourceMappingURL=fetch-paginated-extended.js.map