import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
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
export declare type FetchPaginatedRoute<ParamT, ResponseDataT> = sd.Route<ParamT, StringParam<ParamT>, PaginateQuery, sd.Empty, FetchPaginatedResponse<ResponseDataT>, undefined, "GET">;
export declare function fetchPaginated<ParamT, ResponseDataT>(keyBuilder: KeyBuilder<ResponseDataT, ParamT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchPaginatedRoute<ParamT, ResponseDataT>;
