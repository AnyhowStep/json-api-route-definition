import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type FetchAll<RouteT extends sd.Route<any>, DataF extends sd.AnyAssertFunc, MetaF extends jsonApi.MetaAssertFunc = undefined> = (sd.Route<RouteT["data"] & {
    responseF: jsonApi.ServerDocumentAssertDelegate<sd.ArrayAssertDelegate<DataF>, MetaF>;
}>);
export declare function fetchAll<RouteT extends sd.Route<any>, DataF extends sd.AnyAssertFunc, MetaF extends jsonApi.MetaAssertFunc = undefined>(route: RouteT, dataF: DataF, metaF?: MetaF): (FetchAll<RouteT, DataF, MetaF>);
