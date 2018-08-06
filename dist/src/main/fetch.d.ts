import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type Fetch<RouteT extends sd.Route<any>, DataF extends sd.AnyAssertFunc, MetaF extends jsonApi.MetaAssertFunc = undefined> = (sd.Route<RouteT["data"] & {
    responseF: jsonApi.ServerDocumentAssertDelegate<DataF, MetaF>;
}>);
export declare function fetch<RouteT extends sd.Route<any>, DataF extends sd.AnyAssertFunc, MetaF extends jsonApi.MetaAssertFunc = undefined>(route: RouteT, dataF: DataF, metaF?: MetaF): (Fetch<RouteT, DataF, MetaF>);
