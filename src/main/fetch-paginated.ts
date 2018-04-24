import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

@sd.ignoreExtraVariables
export class PaginateQuery {
    @sd.assert(sd.maybe(sd.naturalNumber()))
    page? : number|null|undefined;
    @sd.assert(sd.maybe(sd.naturalNumber()))
    itemsPerPage? : number|null|undefined;
}

@sd.ignoreExtraVariables
export class FetchPaginatedMeta {
    @sd.assert(sd.naturalNumber())
    itemsFound : number = 0;
    @sd.assert(sd.naturalNumber())
    pagesFound : number = 0;
    @sd.assert(sd.naturalNumber())
    page : number = 0;
    @sd.assert(sd.naturalNumber())
    itemsPerPage : number = 0;
}

export type FetchPaginatedResponse<ResponseDataT> = (
    jsonApi.Document<ResponseDataT[]> &
    {
        meta : FetchPaginatedMeta,
    }
);

export function buildFetchPaginatedResponseAssertDelegate<ResponseDataT> (
    responseDataCtor : {new():ResponseDataT}
) : sd.AssertDelegate<FetchPaginatedResponse<ResponseDataT>> {
    const documentAssertDelegate = jsonApi.createDocumentWithDelegate(
        sd.array(sd.nested(responseDataCtor))
    ).assertDelegate;
    return (name : string, mixed : any) : FetchPaginatedResponse<ResponseDataT> => {
        mixed = documentAssertDelegate(name, mixed);
        mixed.meta = sd.toClass(`${name}[meta]`, mixed.meta, FetchPaginatedMeta);
        return mixed;
    }
}

export type FetchPaginatedRoute<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    BodyT,
    AccessTokenT extends sd.AccessTokenType|undefined,

    ResponseDataT
> = sd.Route<
    RawParamT,
    ParamT,
    PaginateQuery,
    BodyT,
    FetchPaginatedResponse<ResponseDataT>,
    AccessTokenT,
    "GET"
>;
export function fetchPaginated<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT extends sd.AccessTokenType|undefined,
    MethodT extends sd.MethodLiteral,

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
    responseDataCtor : {new():ResponseDataT}
) : FetchPaginatedRoute<
    RawParamT,
    ParamT,
    BodyT,
    AccessTokenT,

    ResponseDataT
> {
    return route
        .method("GET")
        .query(PaginateQuery)
        .responseDelegate(buildFetchPaginatedResponseAssertDelegate(
            responseDataCtor
        ));
}
