"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    This is different from `fetch-infinite-scroll`,

    This allows us to extend the "query" part of the route.
    The `fetch-infinite-scroll` does not allow this.

    I made this a new factory function because I don't want to break
    compatibility with existing code.
*/
const sd = require("schema-decorator");
const jsonApi = require("@anyhowstep/json-api-schema");
const v = require("@anyhowstep/data-validation");
function createFetchInfiniteScrollExtendedMeta(assertBeforeT) {
    class FetchInfiniteScrollExtendedMeta {
        constructor() {
            this.itemsLeft = 0;
            this.limit = 0;
        }
    }
    __decorate([
        sd.assert(sd.naturalNumber())
    ], FetchInfiniteScrollExtendedMeta.prototype, "itemsLeft", void 0);
    __decorate([
        sd.assert(sd.naturalNumber())
    ], FetchInfiniteScrollExtendedMeta.prototype, "limit", void 0);
    __decorate([
        sd.assert(sd.maybe(assertBeforeT))
    ], FetchInfiniteScrollExtendedMeta.prototype, "before", void 0);
    __decorate([
        sd.assert(sd.maybe(assertBeforeT))
    ], FetchInfiniteScrollExtendedMeta.prototype, "earliest", void 0);
    ;
    return FetchInfiniteScrollExtendedMeta;
}
exports.createFetchInfiniteScrollExtendedMeta = createFetchInfiniteScrollExtendedMeta;
function buildFetchInfiniteScrollExtendedResponseAssertDelegate(assertBeforeT, responseDataCtor) {
    const documentAssertDelegate = jsonApi.createDocumentWithDelegate(sd.array(sd.nested(responseDataCtor))).assertDelegate;
    const metaCtor = createFetchInfiniteScrollExtendedMeta(assertBeforeT);
    return (name, mixed) => {
        mixed = documentAssertDelegate(name, mixed);
        mixed.meta = sd.toClass(`${name}[meta]`, mixed.meta, metaCtor);
        return mixed;
    };
}
exports.buildFetchInfiniteScrollExtendedResponseAssertDelegate = buildFetchInfiniteScrollExtendedResponseAssertDelegate;
function fetchInfiniteScrollExtended(keyBuilder, assertBeforeT, assertExtendsT, responseDataCtor) {
    let InfiniteScrollExtendedOptions = class InfiniteScrollExtendedOptions {
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
    ], InfiniteScrollExtendedOptions.prototype, "limit", void 0);
    __decorate([
        sd.assert(sd.maybe(assertBeforeT))
    ], InfiniteScrollExtendedOptions.prototype, "before", void 0);
    InfiniteScrollExtendedOptions = __decorate([
        sd.ignoreExtraVariables
    ], InfiniteScrollExtendedOptions);
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .queryDelegate((name, mixed) => {
        const options = sd.toClass(name, mixed, InfiniteScrollExtendedOptions);
        const extended = assertExtendsT(name, mixed);
        return Object.assign({}, options, extended);
    })
        .responseDelegate(buildFetchInfiniteScrollExtendedResponseAssertDelegate(assertBeforeT, responseDataCtor));
    return route;
}
exports.fetchInfiniteScrollExtended = fetchInfiniteScrollExtended;
//# sourceMappingURL=fetch-infinite-scroll-extended.js.map