import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
export declare type FetchRoute<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, AccessTokenT extends sd.AccessTokenType | undefined, ResponseDataT> = sd.Route<RawParamT, ParamT, QueryT, BodyT, jsonApi.Document<ResponseDataT>, AccessTokenT, "GET">;
export declare function fetch<RawParamT, ParamT extends sd.Param<RawParamT>, QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral, ResponseDataT>(route: sd.Route<RawParamT, ParamT, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>, responseDataCtor: {
    new (): ResponseDataT;
}): FetchRoute<RawParamT, ParamT, QueryT, BodyT, AccessTokenT, ResponseDataT>;
