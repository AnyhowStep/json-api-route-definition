import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

export type Create<
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
export function create<
    RouteT extends sd.Route<any>,
    BodyF extends sd.AnyAssertFunc,
    DataF extends sd.AnyAssertFunc,
    MetaF extends jsonApi.MetaAssertFunc=undefined
> (
    route : RouteT,
    bodyF : BodyF,
    dataF : DataF,
    metaF? : MetaF
) : (
    Create<RouteT, BodyF, DataF, MetaF>
) {
    return route
        .method("POST")
        .body(bodyF)
        .response(jsonApi.serverDocument(dataF, metaF));
}