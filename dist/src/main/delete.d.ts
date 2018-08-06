import * as sd from "schema-decorator";
export declare type Delete<RouteT extends sd.Route<any>> = (RouteT);
export declare function del<RouteT extends sd.Route<any>>(route: RouteT): (Delete<RouteT>);
