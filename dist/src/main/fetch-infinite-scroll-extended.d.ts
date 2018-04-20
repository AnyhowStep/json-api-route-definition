import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
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
export declare type FetchInfiniteScrollExtendedRoute<ParamT, BeforeT, ExtendsT, ResponseDataT> = sd.Route<ParamT, StringParam<ParamT>, InfiniteScrollExtendedQuery<BeforeT, ExtendsT>, sd.Empty, FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT>, undefined, "GET">;
export declare function fetchInfiniteScrollExtended<ParamT, BeforeT, ExtendsT extends {}, ResponseDataT>(keyBuilder: KeyBuilder<ResponseDataT, ParamT>, assertBeforeT: sd.AssertDelegate<BeforeT>, assertExtendsT: sd.AssertDelegate<ExtendsT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchInfiniteScrollExtendedRoute<ParamT, BeforeT, ExtendsT, ResponseDataT>;
