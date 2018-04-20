import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type CreateRoute<ParamT, BodyT, ResponseDataT> = sd.Route<ParamT, StringParam<ParamT>, sd.Empty, BodyT, jsonApi.Document<ResponseDataT>, undefined, "POST">;
export declare function create<ParamT, BodyT, ResponseDataT>(keyBuilder: KeyBuilder<ResponseDataT, ParamT>, bodyCtor: {
    new (): BodyT;
}, responseDataCtor: {
    new (): ResponseDataT;
}): CreateRoute<ParamT, BodyT, ResponseDataT>;
