import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

export interface FetchInfiniteScrollQuery<BeforeT> {
    limit?  : undefined|null|number,
    before? : undefined|null|BeforeT,
}
export type FetchInfiniteScrollQueryAssertDelegate<BeforeF extends sd.AnyAssertFunc> = (
    sd.AssertDelegate<FetchInfiniteScrollQuery<sd.TypeOf<BeforeF>>> &
    {
        __accepts : FetchInfiniteScrollQuery<sd.AcceptsOf<BeforeF>>,
        __canAccept : {
            limit? : undefined|null|string|number,
            before? : undefined|null|sd.CanAcceptOf<BeforeF>,
        }
    }
);
export function fetchInfiniteScrollQuery<BeforeF extends sd.AnyAssertFunc> (
    beforeF : BeforeF
) : (
    FetchInfiniteScrollQueryAssertDelegate<BeforeF>
) {
    return sd.toSchema({
        limit : sd.maybe(sd.stringToNaturalNumber()),
        before : sd.maybe(beforeF),
    });
}

export interface FetchInfiniteScrollMeta<BeforeT> {
    itemsLeft : number;
    limit     : number;
    before?   : undefined|null|BeforeT,
    earliest? : undefined|null|BeforeT,
}
export type FetchInfiniteScrollMetaAssertDelegate<BeforeF extends sd.AnyAssertFunc> = (
    sd.AssertDelegate<FetchInfiniteScrollMeta<sd.TypeOf<BeforeF>>> &
    {
        __accepts : FetchInfiniteScrollMeta<sd.AcceptsOf<BeforeF>>,
        __canAccept : FetchInfiniteScrollMeta<sd.CanAcceptOf<BeforeF>>
    }
);
export function fetchInfiniteScrollMeta<BeforeF extends sd.AnyAssertFunc> (
    beforeF : BeforeF
) : (
    FetchInfiniteScrollMetaAssertDelegate<BeforeF>
) {
    return sd.toSchema({
        itemsLeft : sd.naturalNumber(),
        limit     : sd.naturalNumber(),
        before    : sd.maybe(beforeF),
        earliest  : sd.maybe(beforeF),
    });
}

export type FetchInfiniteScroll<
    RouteT extends sd.Route<any>,
    BeforeF extends sd.AnyAssertFunc,
    DataF extends sd.AnyAssertFunc
> = (
    sd.Route<
        RouteT["data"] &
        {
            queryF : FetchInfiniteScrollQueryAssertDelegate<BeforeF>,
            responseF : jsonApi.ServerDocumentAssertDelegate<
                sd.ArrayAssertDelegate<DataF>,
                FetchInfiniteScrollMetaAssertDelegate<BeforeF>
            >
        }
    >
);
export function fetchInfiniteScroll<
    RouteT extends sd.Route<any>,
    BeforeF extends sd.AnyAssertFunc,
    DataF extends sd.AnyAssertFunc
> (
    route : RouteT,
    beforeF : BeforeF,
    dataF : DataF
) : (
    FetchInfiniteScroll<RouteT, BeforeF, DataF>
) {
    return route
        .method("GET")
        .query(fetchInfiniteScrollQuery(beforeF))
        .response(jsonApi.serverDocument(
            sd.array(dataF),
            fetchInfiniteScrollMeta(beforeF)
        ));
}