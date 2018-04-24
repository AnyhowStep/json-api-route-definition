import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export interface InfiniteScrollQuery<BeforeT> {
    limit?: null | number;
    before?: null | BeforeT;
}
export interface FetchInfiniteScrollMeta<BeforeT> {
    itemsLeft: number;
    limit: number;
    before?: null | BeforeT;
    earliest?: null | BeforeT;
}
export declare function createFetchInfiniteScrollMeta<BeforeT>(assertBeforeT: sd.AssertDelegate<BeforeT>): {
    new (): FetchInfiniteScrollMeta<BeforeT>;
};
export declare type FetchInfiniteScrollResponse<BeforeT, ResponseDataT> = (jsonApi.Document<ResponseDataT[]> & {
    meta: FetchInfiniteScrollMeta<BeforeT>;
});
export declare function buildFetchInfiniteScrollResponseAssertDelegate<BeforeT, ResponseDataT>(assertBeforeT: sd.AssertDelegate<BeforeT>, responseDataCtor: {
    new (): ResponseDataT;
}): sd.AssertDelegate<FetchInfiniteScrollResponse<BeforeT, ResponseDataT>>;
export declare type FetchInfiniteScrollRoute<RawParamT, ParamT extends sd.Param<RawParamT>, BodyT, AccessTokenT extends sd.AccessTokenType | undefined, BeforeT, ResponseDataT> = sd.Route<RawParamT, ParamT, InfiniteScrollQuery<BeforeT>, BodyT, FetchInfiniteScrollResponse<BeforeT, ResponseDataT>, AccessTokenT, "GET">;
export declare function fetchInfiniteScroll<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral, BeforeT, ResponseDataT>(route: sd.Route<RawParamT, ParamT, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>, assertBeforeT: sd.AssertDelegate<BeforeT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchInfiniteScrollRoute<RawParamT, ParamT, BodyT, AccessTokenT, BeforeT, ResponseDataT>;
