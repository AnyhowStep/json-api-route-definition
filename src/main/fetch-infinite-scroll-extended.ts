/*
    This is different from `fetch-infinite-scroll`,

    This allows us to extend the "query" part of the route.
    The `fetch-infinite-scroll` does not allow this.

    I made this a new factory function because I don't want to break
    compatibility with existing code.
*/
import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
import * as v from "@anyhowstep/data-validation";

export type InfiniteScrollExtendedQuery<BeforeT, ExtendsT> = (
    {
        limit?  : null|number,
        before? : null|BeforeT,
    } &
    ExtendsT
);

export interface FetchInfiniteScrollExtendedMeta<BeforeT> {
    itemsLeft : number;
    limit     : number;
    before?   : null|BeforeT,
    earliest? : null|BeforeT,
}
export function createFetchInfiniteScrollExtendedMeta<BeforeT> (assertBeforeT : sd.AssertDelegate<BeforeT>) : {new():FetchInfiniteScrollExtendedMeta<BeforeT>} {
    class FetchInfiniteScrollExtendedMeta {
        @sd.assert(sd.naturalNumber())
        itemsLeft : number = 0;
        @sd.assert(sd.naturalNumber())
        limit     : number = 0;
        @sd.assert(sd.maybe(assertBeforeT))
        before?   : null|BeforeT;
        @sd.assert(sd.maybe(assertBeforeT))
        earliest? : null|BeforeT;
    };
    return FetchInfiniteScrollExtendedMeta;
}

export type FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT> = (
    jsonApi.Document<ResponseDataT[]> &
    {
        meta : FetchInfiniteScrollExtendedMeta<BeforeT>,
    }
);

export function buildFetchInfiniteScrollExtendedResponseAssertDelegate<BeforeT, ResponseDataT> (
    assertBeforeT : sd.AssertDelegate<BeforeT>,
    responseDataCtor : {new():ResponseDataT}
) : sd.AssertDelegate<FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT>> {
    const documentAssertDelegate = jsonApi.createDocumentWithDelegate(
        sd.array(sd.nested(responseDataCtor))
    ).assertDelegate;
    const metaCtor = createFetchInfiniteScrollExtendedMeta(assertBeforeT);
    return (name : string, mixed : any) : FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT> => {
        mixed = documentAssertDelegate(name, mixed);
        mixed.meta = sd.toClass(`${name}[meta]`, mixed.meta, metaCtor);
        return mixed;
    }
}

export type FetchInfiniteScrollExtendedRoute<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    BodyT,
    AccessTokenT extends sd.AccessTokenType|undefined,

    BeforeT,
    ExtendsT,
    ResponseDataT
> = sd.Route<
    RawParamT,
    ParamT,
    InfiniteScrollExtendedQuery<BeforeT, ExtendsT>,
    BodyT,
    FetchInfiniteScrollExtendedResponse<BeforeT, ResponseDataT>,
    AccessTokenT,
    "GET"
>;
export function fetchInfiniteScrollExtended<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT extends sd.AccessTokenType|undefined,
    MethodT extends sd.MethodLiteral,

    BeforeT,
    ExtendsT extends {},
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
    assertExtendsT : sd.AssertDelegate<ExtendsT>,
    responseDataCtor : {new():ResponseDataT}
) : FetchInfiniteScrollExtendedRoute<
    RawParamT,
    ParamT,
    BodyT,
    AccessTokenT,

    BeforeT,
    ExtendsT,
    ResponseDataT
> {
    @sd.ignoreExtraVariables
    class InfiniteScrollExtendedOptions {
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
        .queryDelegate((name : string, mixed : any) : InfiniteScrollExtendedQuery<BeforeT, ExtendsT> => {
            const options  = sd.toClass(name, mixed, InfiniteScrollExtendedOptions);
            const extended = assertExtendsT(name, mixed);
            return {
                ...options,
                ...(extended as any),
            };
        })
        .responseDelegate(buildFetchInfiniteScrollExtendedResponseAssertDelegate(
            assertBeforeT,
            responseDataCtor
        ));
}
