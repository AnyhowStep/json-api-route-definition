import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

export interface FetchPaginatedQuery {
    page? : undefined|null|number;
    itemsPerPage? : undefined|null|number;
}
export const fetchPaginatedQuery = sd.toSchema({
    page : sd.maybe(sd.stringToNaturalNumber()),
    itemsPerPage : sd.maybe(sd.stringToNaturalNumber()),
});

export interface FetchPaginatedMeta {
    itemsFound : number,
    pagesFound : number,
    page : number,
    itemsPerPage : number,
}
export const fetchPaginatedMeta = sd.toSchema({
    itemsFound : sd.naturalNumber(),
    pagesFound : sd.naturalNumber(),
    page : sd.naturalNumber(),
    itemsPerPage : sd.naturalNumber(),
});

export type FetchPaginated<
    RouteT extends sd.Route<any>,
    DataF extends sd.AnyAssertFunc
> = (
    sd.Route<
        RouteT["data"] &
        {
            queryF : typeof fetchPaginatedQuery,
            responseF : jsonApi.ServerDocumentAssertDelegate<
                sd.ArrayAssertDelegate<DataF>,
                typeof fetchPaginatedMeta
            >
        }
    >
);
export function fetchPaginated<
    RouteT extends sd.Route<any>,
    DataF extends sd.AnyAssertFunc
> (
    route : RouteT,
    dataF : DataF
) : (
    FetchPaginated<RouteT, DataF>
) {
    return route
        .method("GET")
        .query(fetchPaginatedQuery)
        .response(jsonApi.serverDocument(
            sd.array(dataF),
            fetchPaginatedMeta
        ));
}