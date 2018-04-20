import * as sd from "schema-decorator";
import { KeyBuilder } from "./KeyBuilder";
import { StringParam } from "./StringParam";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type FetchAllRoute<ParamT, ResponseDataT> = sd.Route<ParamT, StringParam<ParamT>, sd.Empty, sd.Empty, jsonApi.Document<ResponseDataT[]>, undefined, "GET">;
export declare function fetchAll<ParamT, ResponseDataT>(keyBuilder: KeyBuilder<ResponseDataT, ParamT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchAllRoute<ParamT, ResponseDataT>;
