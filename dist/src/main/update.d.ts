import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type UpdateRoute<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, AccessTokenT extends sd.AccessTokenType | undefined, ResponseDataT> = sd.Route<RawParamT, ParamT, QueryT, BodyT, jsonApi.Document<ResponseDataT>, AccessTokenT, "PUT" | "DELETE" | "POST">;
export declare function update<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral, ResponseDataT>(route: sd.Route<RawParamT, ParamT, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>, actionName: string, bodyCtor: {
    new (): BodyT;
}, responseDataCtor: {
    new (): ResponseDataT;
}, method?: "PUT" | "DELETE" | "POST"): UpdateRoute<RawParamT, ParamT, QueryT, BodyT, AccessTokenT, ResponseDataT>;
