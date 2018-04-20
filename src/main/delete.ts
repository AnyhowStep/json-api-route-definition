import * as sd from "schema-decorator";
import {KeyBuilder} from "./KeyBuilder";
import {StringParam} from "./StringParam";

export type DeleteRoute<ParamT> = sd.Route<ParamT, StringParam<ParamT>, sd.Empty, sd.Empty, sd.Empty, undefined, "DELETE">;
export function del<T, ParamT> (
    keyBuilder  : KeyBuilder<T, ParamT>
) : DeleteRoute<ParamT> {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("DELETE");
    return route;
}
