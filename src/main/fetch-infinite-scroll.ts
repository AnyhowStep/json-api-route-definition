import * as sd from "schema-decorator";
import {KeyBuilder} from "./KeyBuilder";
import {StringParam} from "./StringParam";
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

export type FetchInfiniteScrollRoute<ParamT, BeforeT, ResponseDataT> = sd.Route<
    ParamT,
    StringParam<ParamT>,
    InfiniteScrollQuery<BeforeT>,
    sd.Empty,
    FetchInfiniteScrollResponse<BeforeT, ResponseDataT>,
    undefined,
    "GET"
>;
export function fetchInfiniteScroll<
    ParamT,
    BeforeT,
    ResponseDataT
> (
    keyBuilder  : KeyBuilder<ResponseDataT, ParamT>,
    assertBeforeT : sd.AssertDelegate<BeforeT>,
    responseDataCtor : {new():ResponseDataT}
) : FetchInfiniteScrollRoute<ParamT, BeforeT, ResponseDataT> {
    //TODO This class does not need to be a generic type...
    //What were you thinking, Justin?
    class InfiniteScrollOptions<BeforeT> {
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

    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .query<InfiniteScrollQuery<BeforeT>>(InfiniteScrollOptions)
        .responseDelegate(buildFetchInfiniteScrollResponseAssertDelegate(
            assertBeforeT,
            responseDataCtor
        ));
    return route;
}
