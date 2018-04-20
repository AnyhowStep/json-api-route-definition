"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
let PaginateQuery = class PaginateQuery {
};
__decorate([
    sd.assert(sd.maybe(sd.naturalNumber()))
], PaginateQuery.prototype, "page", void 0);
__decorate([
    sd.assert(sd.maybe(sd.naturalNumber()))
], PaginateQuery.prototype, "itemsPerPage", void 0);
PaginateQuery = __decorate([
    sd.ignoreExtraVariables
], PaginateQuery);
exports.PaginateQuery = PaginateQuery;
let FetchPaginatedMeta = class FetchPaginatedMeta {
    constructor() {
        this.itemsFound = 0;
        this.pagesFound = 0;
        this.page = 0;
        this.itemsPerPage = 0;
    }
};
__decorate([
    sd.assert(sd.naturalNumber())
], FetchPaginatedMeta.prototype, "itemsFound", void 0);
__decorate([
    sd.assert(sd.naturalNumber())
], FetchPaginatedMeta.prototype, "pagesFound", void 0);
__decorate([
    sd.assert(sd.naturalNumber())
], FetchPaginatedMeta.prototype, "page", void 0);
__decorate([
    sd.assert(sd.naturalNumber())
], FetchPaginatedMeta.prototype, "itemsPerPage", void 0);
FetchPaginatedMeta = __decorate([
    sd.ignoreExtraVariables
], FetchPaginatedMeta);
exports.FetchPaginatedMeta = FetchPaginatedMeta;
function buildFetchPaginatedResponseAssertDelegate(responseDataCtor) {
    const documentAssertDelegate = jsonApi.createDocumentWithDelegate(sd.array(sd.nested(responseDataCtor))).assertDelegate;
    return (name, mixed) => {
        mixed = documentAssertDelegate(name, mixed);
        mixed.meta = sd.toClass(`${name}[meta]`, mixed.meta, FetchPaginatedMeta);
        return mixed;
    };
}
exports.buildFetchPaginatedResponseAssertDelegate = buildFetchPaginatedResponseAssertDelegate;
function fetchPaginated(keyBuilder, responseDataCtor) {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .query(PaginateQuery)
        .responseDelegate(buildFetchPaginatedResponseAssertDelegate(responseDataCtor));
    return route;
}
exports.fetchPaginated = fetchPaginated;
//# sourceMappingURL=fetch-paginated.js.map