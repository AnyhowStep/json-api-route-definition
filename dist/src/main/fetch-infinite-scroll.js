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
const v = require("@anyhowstep/data-validation");
const util_1 = require("./util");
function createFetchInfiniteScrollMeta(assertBeforeT) {
    class FetchInfiniteScrollMeta {
        constructor() {
            this.itemsLeft = 0;
            this.limit = 0;
        }
    }
    __decorate([
        sd.assert(sd.naturalNumber())
    ], FetchInfiniteScrollMeta.prototype, "itemsLeft", void 0);
    __decorate([
        sd.assert(sd.naturalNumber())
    ], FetchInfiniteScrollMeta.prototype, "limit", void 0);
    __decorate([
        sd.assert(sd.maybe(assertBeforeT))
    ], FetchInfiniteScrollMeta.prototype, "before", void 0);
    __decorate([
        sd.assert(sd.maybe(assertBeforeT))
    ], FetchInfiniteScrollMeta.prototype, "earliest", void 0);
    ;
    return FetchInfiniteScrollMeta;
}
exports.createFetchInfiniteScrollMeta = createFetchInfiniteScrollMeta;
function buildFetchInfiniteScrollResponseAssertDelegate(assertBeforeT, response) {
    const documentAssertDelegate = jsonApi.createDocumentWithDelegate(sd.array(util_1.toAssertDelegate(response))).assertDelegate;
    const metaCtor = createFetchInfiniteScrollMeta(assertBeforeT);
    return (name, mixed) => {
        mixed = documentAssertDelegate(name, mixed);
        mixed.meta = sd.toClass(`${name}[meta]`, mixed.meta, metaCtor);
        return mixed;
    };
}
exports.buildFetchInfiniteScrollResponseAssertDelegate = buildFetchInfiniteScrollResponseAssertDelegate;
function fetchInfiniteScroll(route, assertBeforeT, response) {
    let InfiniteScrollOptions = class InfiniteScrollOptions {
    };
    __decorate([
        sd.assert(sd.cast(sd.maybe(v.NumberString.assertNaturalNumberString), (from) => {
            if (from == undefined) {
                return from;
            }
            else {
                return parseInt(from);
            }
        }, sd.maybe(sd.naturalNumber())))
    ], InfiniteScrollOptions.prototype, "limit", void 0);
    __decorate([
        sd.assert(sd.maybe(assertBeforeT))
    ], InfiniteScrollOptions.prototype, "before", void 0);
    InfiniteScrollOptions = __decorate([
        sd.ignoreExtraVariables
    ], InfiniteScrollOptions);
    return route
        .method("GET")
        .query(InfiniteScrollOptions)
        .responseDelegate(buildFetchInfiniteScrollResponseAssertDelegate(assertBeforeT, response));
}
exports.fetchInfiniteScroll = fetchInfiniteScroll;
//# sourceMappingURL=fetch-infinite-scroll.js.map