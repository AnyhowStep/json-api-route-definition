import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

export type Update<
    RouteT extends sd.Route<any>,
    BodyF extends sd.AnyAssertFunc,
    DataF extends sd.AnyAssertFunc,
    MetaF extends jsonApi.MetaAssertFunc=undefined
> = (
    sd.Route<
        RouteT["data"] &
        {
            bodyF : BodyF,
            responseF : jsonApi.ServerDocumentAssertDelegate<DataF, MetaF>
        }
    >
);
export function update<
    RouteT extends sd.Route<any>,
    BodyF extends sd.AnyAssertFunc,
    DataF extends sd.AnyAssertFunc,
    MetaF extends jsonApi.MetaAssertFunc=undefined
> (
    route : RouteT,
    bodyF : BodyF,
    dataF : DataF,
    actionName : string = "",
    method : "PUT"|"DELETE"|"POST"|"PATCH" = "PUT",
    metaF? : MetaF
) : (
    Update<RouteT, BodyF, DataF, MetaF>
) {
    return route
        .append(`/${actionName}`)
        .method(method)
        .body(bodyF)
        .response(jsonApi.serverDocument(dataF, metaF));
}