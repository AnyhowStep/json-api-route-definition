import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
import * as v from "@anyhowstep/data-validation";

export interface InfiniteScrollQuery<BeforeT> {
    limit?  : null|number,
    before? : null|BeforeT,
}
export interface FetchInfiniteScrollMeta<BeforeT> {
    itemsLeft : number;
    limit     : number;
    before?   : null|BeforeT,
    earliest? : null|BeforeT,
}
export function createFetchInfiniteScrollMeta<BeforeT> (assertBeforeT : sd.AssertDelegate<BeforeT>) : {new():FetchInfiniteScrollMeta<BeforeT>} {
    class FetchInfiniteScrollMeta {
        @sd.assert(sd.naturalNumber())
        itemsLeft : number = 0;
        @sd.assert(sd.naturalNumber())
        limit     : number = 0;
        @sd.assert(sd.maybe(assertBeforeT))
        before?   : null|BeforeT;
        @sd.assert(sd.maybe(assertBeforeT))
        earliest? : null|BeforeT;
    };
    return FetchInfiniteScrollMeta;
}

export type FetchInfiniteScrollResponse<BeforeT, ResponseDataT> = (
    jsonApi.Document<ResponseDataT[]> &
    {
        meta : FetchInfiniteScrollMeta<BeforeT>,
    }
);

export function buildFetchInfiniteScrollResponseAssertDelegate<BeforeT, ResponseDataT> (
    assertBeforeT : sd.AssertDelegate<BeforeT>,
    responseDataCtor : {new():ResponseDataT}
) : sd.AssertDelegate<FetchInfiniteScrollResponse<BeforeT, ResponseDataT>> {
    const documentAssertDelegate = jsonApi.createDocumentWithDelegate(
        sd.array(sd.nested(responseDataCtor))
    ).assertDelegate;
    const metaCtor = createFetchInfiniteScrollMeta(assertBeforeT);
    return (name : string, mixed : any) : FetchInfiniteScrollResponse<BeforeT, ResponseDataT> => {
        mixed = documentAssertDelegate(name, mixed);
        mixed.meta = sd.toClass(`${name}[meta]`, mixed.meta, metaCtor);
        return mixed;
    }
}

export type FetchInfiniteScrollRoute<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    BodyT,
    AccessTokenT extends sd.AccessTokenType|undefined,

    BeforeT,
    ResponseDataT
> = sd.Route<
    RawParamT,
    ParamT,
    InfiniteScrollQuery<BeforeT>,
    BodyT,
    FetchInfiniteScrollResponse<BeforeT, ResponseDataT>,
    AccessTokenT,
    "GET"
>;
export function fetchInfiniteScroll<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT extends sd.AccessTokenType|undefined,
    MethodT extends sd.MethodLiteral,

    BeforeT,
    ResponseDataT
> (
    route : sd.Route<
        RawParamT,
        ParamT,
        QueryT,
        BodyT,
        ResponseT,
        AccessTokenT,
        MethodT
    >,
    assertBeforeT : sd.AssertDelegate<BeforeT>,
    responseDataCtor : {new():ResponseDataT}
) : FetchInfiniteScrollRoute<
    RawParamT,
    ParamT,
    BodyT,
    AccessTokenT,

    BeforeT,
    ResponseDataT
> {
    @sd.ignoreExtraVariables
    class InfiniteScrollOptions {
        @sd.assert(sd.cast(
            sd.maybe<string>(v.NumberString.assertNaturalNumberString),
            (from : null|undefined|string) : null|undefined|number => {
                if (from == undefined) {
                    return from;
                } else {
                    return parseInt(from);
                }
            },
            sd.maybe<number>(sd.naturalNumber())
        ))
        limit?  : null|number;
        @sd.assert(sd.maybe(assertBeforeT))
        before? : null|BeforeT;
    }

    return route
        .method("GET")
        .query<InfiniteScrollQuery<BeforeT>>(InfiniteScrollOptions)
        .responseDelegate(buildFetchInfiniteScrollResponseAssertDelegate(
            assertBeforeT,
            responseDataCtor
        ));
}
