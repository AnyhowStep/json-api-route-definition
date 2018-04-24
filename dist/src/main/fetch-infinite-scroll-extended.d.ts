import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type InfiniteScrollExtendedQuery<BeforeT, ExtendsT> = ({
    limit?: null | number;
    before?: null | BeforeT;
} & ExtendsT);
export interface FetchInfiniteScrollExtendedMeta<BeforeT> {
    itemsLeft: number;
    limit: number;
    before?: null | BeforeT;
    earliest?: null | BeforeT;
}
export declare function createFetchInfiniteScrollExtendedMeta<BeforeT>(assertBeforeT: sd.AssertDelegate<BeforeT>): {
    new (): FetchInfiniteScrollExtendedMeta<BeforeT>;
};
export declare type FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT> = (jsonApi.Document<ResponseDataT[]> & {
    meta: FetchInfiniteScrollExtendedMeta<BeforeT>;
});
export declare function buildFetchInfiniteScrollExtendedResponseAssertDelegate<BeforeT, ResponseDataT>(assertBeforeT: sd.AssertDelegate<BeforeT>, responseDataCtor: {
    new (): ResponseDataT;
}): sd.AssertDelegate<FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT>>;
export declare type FetchInfiniteScrollExtendedRoute<RawParamT, ParamT extends sd.Param<RawParamT>, BodyT, AccessTokenT extends sd.AccessTokenType | undefined, BeforeT, ExtendsT, ResponseDataT> = sd.Route<RawParamT, ParamT, InfiniteScrollExtendedQuery<BeforeT, ExtendsT>, BodyT, FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT>, AccessTokenT, "GET">;
export declare function fetchInfiniteScrollExtended<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral, BeforeT, ExtendsT extends {}, ResponseDataT>(route: sd.Route<RawParamT, ParamT, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>, assertBeforeT: sd.AssertDelegate<BeforeT>, assertExtendsT: sd.AssertDelegate<ExtendsT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchInfiniteScrollExtendedRoute<RawParamT, ParamT, BodyT, AccessTokenT, BeforeT, ExtendsT, ResponseDataT>;
