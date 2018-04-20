import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
import { PaginateQuery, FetchPaginatedResponse } from "./fetch-paginated";
export declare type PaginateExtendedQuery<ExtendsT> = (PaginateQuery & ExtendsT);
export declare type FetchPaginatedExtendedRoute<ParamT, ExtendsT, ResponseDataT> = sd.Route<ParamT, StringParam<ParamT>, PaginateExtendedQuery<ExtendsT>, sd.Empty, FetchPaginatedResponse<ResponseDataT>, undefined, "GET">;
export declare function fetchPaginatedExtended<ParamT, ExtendsT, ResponseDataT>(keyBuilder: KeyBuilder<ResponseDataT, ParamT>, assertExtendsT: sd.AssertDelegate<ExtendsT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchPaginatedExtendedRoute<ParamT, ExtendsT, ResponseDataT>;
