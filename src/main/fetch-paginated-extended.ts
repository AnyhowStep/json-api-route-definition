import * as sd from "schema-decorator";
import {KeyBuilder} from "./KeyBuilder";
import {StringParam} from "./StringParam";
import {
    PaginateQuery,
    FetchPaginatedResponse,
    buildFetchPaginatedResponseAssertDelegate
} from "./fetch-paginated";

export type PaginateExtendedQuery<ExtendsT> = (
    PaginateQuery &
    ExtendsT
);

export type FetchPaginatedExtendedRoute<ParamT, ExtendsT, ResponseDataT> = sd.Route<
    ParamT,
    StringParam<ParamT>,
    PaginateExtendedQuery<ExtendsT>,
    sd.Empty,
    FetchPaginatedResponse<ResponseDataT>,
    undefined,
    "GET"
>;
export function fetchPaginatedExtended<
    ParamT,
    ExtendsT,
    ResponseDataT
> (
    keyBuilder  : KeyBuilder<ResponseDataT, ParamT>,
    assertExtendsT : sd.AssertDelegate<ExtendsT>,
    responseDataCtor : {new():ResponseDataT}
) : FetchPaginatedExtendedRoute<ParamT, ExtendsT, ResponseDataT> {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .queryDelegate((name : string, mixed : any) : PaginateExtendedQuery<ExtendsT> => {
            const query    = sd.toClass(name, mixed, PaginateQuery);
            const extended = assertExtendsT(name, mixed);
            return {
                ...query,
                ...(extended as any),
            };
        })
        .responseDelegate(buildFetchPaginatedResponseAssertDelegate(
            responseDataCtor
        ));
    return route;
}
