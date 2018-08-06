import * as sd from "schema-decorator";

export type Delete<RouteT extends sd.Route<any>> = (
    RouteT
);
export function del<RouteT extends sd.Route<any>> (
    route : RouteT
) : (
    Delete<RouteT>
) {
    return route
        .method("DELETE") as any;
}