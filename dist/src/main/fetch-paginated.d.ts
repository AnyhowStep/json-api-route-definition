import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export interface FetchPaginatedQuery {
    page?: undefined | null | number;
    itemsPerPage?: undefined | null | number;
}
export declare const fetchPaginatedQuery: sd.AssertDelegate<{
    page?: number | null | undefined;
    itemsPerPage?: number | null | undefined;
}> & {
    __accepts: {
        page?: number | null | undefined;
        itemsPerPage?: number | null | undefined;
    };
    __canAccept: {
        page?: string | number | null | undefined;
        itemsPerPage?: string | number | null | undefined;
    };
};
export interface FetchPaginatedMeta {
    itemsFound: number;
    pagesFound: number;
    page: number;
    itemsPerPage: number;
}
export declare const fetchPaginatedMeta: sd.AssertDelegate<{
    itemsFound: number;
    pagesFound: number;
    page: number;
    itemsPerPage: number;
}> & {
    __accepts: {
        itemsFound: number;
        pagesFound: number;
        page: number;
        itemsPerPage: number;
    };
    __canAccept: {
        itemsFound: number;
        pagesFound: number;
        page: number;
        itemsPerPage: number;
    };
};
export declare type FetchPaginated<RouteT extends sd.Route<any>, DataF extends sd.AnyAssertFunc> = (sd.Route<RouteT["data"] & {
    queryF: typeof fetchPaginatedQuery;
    responseF: jsonApi.ServerDocumentAssertDelegate<sd.ArrayAssertDelegate<DataF>, typeof fetchPaginatedMeta>;
}>);
export declare function fetchPaginated<RouteT extends sd.Route<any>, DataF extends sd.AnyAssertFunc>(route: RouteT, dataF: DataF): (FetchPaginated<RouteT, DataF>);
