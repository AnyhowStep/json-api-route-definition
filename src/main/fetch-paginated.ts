import * as sd from "schema-decorator";
import {KeyBuilder} from "./KeyBuilder";
import {StringParam} from "./StringParam";
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

export type FetchPaginatedRoute<ParamT, ResponseDataT> = sd.Route<
    ParamT,
    StringParam<ParamT>,
    PaginateQuery,
    sd.Empty,
    FetchPaginatedResponse<ResponseDataT>,
    undefined,
    "GET"
>;
export function fetchPaginated<
    ParamT,
    ResponseDataT
> (
    keyBuilder  : KeyBuilder<ResponseDataT, ParamT>,
    responseDataCtor : {new():ResponseDataT}
) : FetchPaginatedRoute<ParamT, ResponseDataT> {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .query(PaginateQuery)
        .responseDelegate(buildFetchPaginatedResponseAssertDelegate(
            responseDataCtor
        ));
    return route;
}
