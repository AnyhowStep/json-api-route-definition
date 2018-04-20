import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
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
export declare type FetchInfiniteScrollRoute<ParamT, BeforeT, ResponseDataT> = sd.Route<ParamT, StringParam<ParamT>, InfiniteScrollQuery<BeforeT>, sd.Empty, FetchInfiniteScrollResponse<BeforeT, ResponseDataT>, undefined, "GET">;
export declare function fetchInfiniteScroll<ParamT, BeforeT, ResponseDataT>(keyBuilder: KeyBuilder<ResponseDataT, ParamT>, assertBeforeT: sd.AssertDelegate<BeforeT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchInfiniteScrollRoute<ParamT, BeforeT, ResponseDataT>;
