import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

export type Fetch<
    RouteT extends sd.Route<any>,
    DataF extends sd.AnyAssertFunc,
    MetaF extends jsonApi.MetaAssertFunc=undefined
> = (
    sd.Route<
        RouteT["data"] &
        {
            responseF : jsonApi.ServerDocumentAssertDelegate<DataF, MetaF>
        }
    >
);
export function fetch<
    RouteT extends sd.Route<any>,
    DataF extends sd.AnyAssertFunc,
    MetaF extends jsonApi.MetaAssertFunc=undefined
> (
    route : RouteT,
    dataF : DataF,
    metaF? : MetaF
) : (
    Fetch<RouteT, DataF, MetaF>
) {
    return route
        .method("GET")
        .response(jsonApi.serverDocument(dataF, metaF));
}