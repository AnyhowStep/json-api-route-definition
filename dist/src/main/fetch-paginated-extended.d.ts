import * as sd from "schema-decorator";
import { PaginateQuery, FetchPaginatedResponse } from "./fetch-paginated";
export declare type PaginateExtendedQuery<ExtendsT> = (PaginateQuery & ExtendsT);
export declare type FetchPaginatedExtendedRoute<RawParamT, ParamT extends sd.Param<RawParamT>, BodyT, AccessTokenT extends sd.AccessTokenType | undefined, ExtendsT, ResponseDataT> = sd.Route<RawParamT, ParamT, PaginateExtendedQuery<ExtendsT>, BodyT, FetchPaginatedResponse<ResponseDataT>, AccessTokenT, "GET">;
export declare function fetchPaginatedExtended<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral, ExtendsT, ResponseDataT>(route: sd.Route<RawParamT, ParamT, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>, assertExtendsT: sd.AssertDelegate<ExtendsT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchPaginatedExtendedRoute<RawParamT, ParamT, BodyT, AccessTokenT, ExtendsT, ResponseDataT>;
