import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type UpdateRoute<ParamT, BodyT, ResponseDataT> = sd.Route<ParamT, StringParam<ParamT>, sd.Empty, BodyT, jsonApi.Document<ResponseDataT>, undefined, "PUT" | "DELETE" | "POST">;
export declare function update<ParamT, BodyT, ResponseDataT>(keyBuilder: KeyBuilder<ResponseDataT, ParamT>, actionName: string, bodyCtor: {
    new (): BodyT;
}, responseDataCtor: {
    new (): ResponseDataT;
}, method?: "PUT" | "DELETE" | "POST"): UpdateRoute<ParamT, BodyT, ResponseDataT>;
