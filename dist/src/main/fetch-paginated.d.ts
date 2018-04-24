import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare class PaginateQuery {
    page?: number | null | undefined;
    itemsPerPage?: number | null | undefined;
}
export declare class FetchPaginatedMeta {
    itemsFound: number;
    pagesFound: number;
    page: number;
    itemsPerPage: number;
}
export declare type FetchPaginatedResponse<ResponseDataT> = (jsonApi.Document<ResponseDataT[]> & {
    meta: FetchPaginatedMeta;
});
export declare function buildFetchPaginatedResponseAssertDelegate<ResponseDataT>(responseDataCtor: {
    new (): ResponseDataT;
}): sd.AssertDelegate<FetchPaginatedResponse<ResponseDataT>>;
export declare type FetchPaginatedRoute<RawParamT, ParamT extends sd.Param<RawParamT>, BodyT, AccessTokenT extends sd.AccessTokenType | undefined, ResponseDataT> = sd.Route<RawParamT, ParamT, PaginateQuery, BodyT, FetchPaginatedResponse<ResponseDataT>, AccessTokenT, "GET">;
export declare function fetchPaginated<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral, ResponseDataT>(route: sd.Route<RawParamT, ParamT, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchPaginatedRoute<RawParamT, ParamT, BodyT, AccessTokenT, ResponseDataT>;
