import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
export declare type DeleteRoute<ParamT> = sd.Route<ParamT, StringParam<ParamT>, sd.Empty, sd.Empty, sd.Empty, undefined, "DELETE">;
export declare function del<T, ParamT>(keyBuilder: KeyBuilder<T, ParamT>): DeleteRoute<ParamT>;
