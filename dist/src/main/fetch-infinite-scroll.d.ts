import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export interface FetchInfiniteScrollQuery<BeforeT> {
    limit?: undefined | null | number;
    before?: undefined | null | BeforeT;
}
export declare type FetchInfiniteScrollQueryAssertDelegate<BeforeF extends sd.AnyAssertFunc> = (sd.AssertDelegate<FetchInfiniteScrollQuery<sd.TypeOf<BeforeF>>> & {
    __accepts: FetchInfiniteScrollQuery<sd.AcceptsOf<BeforeF>>;
    __canAccept: {
        limit?: undefined | null | string | number;
        before?: undefined | null | sd.CanAcceptOf<BeforeF>;
    };
});
export declare function fetchInfiniteScrollQuery<BeforeF extends sd.AnyAssertFunc>(beforeF: BeforeF): (FetchInfiniteScrollQueryAssertDelegate<BeforeF>);
export interface FetchInfiniteScrollMeta<BeforeT> {
    itemsLeft: number;
    limit: number;
    before?: undefined | null | BeforeT;
    earliest?: undefined | null | BeforeT;
}
export declare type FetchInfiniteScrollMetaAssertDelegate<BeforeF extends sd.AnyAssertFunc> = (sd.AssertDelegate<FetchInfiniteScrollMeta<sd.TypeOf<BeforeF>>> & {
    __accepts: FetchInfiniteScrollMeta<sd.AcceptsOf<BeforeF>>;
    __canAccept: FetchInfiniteScrollMeta<sd.CanAcceptOf<BeforeF>>;
});
export declare function fetchInfiniteScrollMeta<BeforeF extends sd.AnyAssertFunc>(beforeF: BeforeF): (FetchInfiniteScrollMetaAssertDelegate<BeforeF>);
export declare type FetchInfiniteScroll<RouteT extends sd.Route<any>, BeforeF extends sd.AnyAssertFunc, DataF extends sd.AnyAssertFunc> = (sd.Route<RouteT["data"] & {
    queryF: FetchInfiniteScrollQueryAssertDelegate<BeforeF>;
    responseF: jsonApi.ServerDocumentAssertDelegate<sd.ArrayAssertDelegate<DataF>, FetchInfiniteScrollMetaAssertDelegate<BeforeF>>;
}>);
export declare function fetchInfiniteScroll<RouteT extends sd.Route<any>, BeforeF extends sd.AnyAssertFunc, DataF extends sd.AnyAssertFunc>(route: RouteT, beforeF: BeforeF, dataF: DataF): (FetchInfiniteScroll<RouteT, BeforeF, DataF>);
