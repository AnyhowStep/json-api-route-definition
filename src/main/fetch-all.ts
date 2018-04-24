import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

export type FetchAllRoute<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    AccessTokenT extends sd.AccessTokenType|undefined,

    ResponseDataT
> = sd.Route<
    RawParamT,
    ParamT,
    QueryT,
    BodyT,
    jsonApi.Document<ResponseDataT[]>,
    AccessTokenT,
    "GET"
>;
export function fetchAll<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT extends sd.AccessTokenType|undefined,
    MethodT extends sd.MethodLiteral,
    ResponseDataT
> (
    route : sd.Route<
        RawParamT,
        ParamT,
        QueryT,
        BodyT,
        ResponseT,
        AccessTokenT,
        MethodT
    >,
    responseDataCtor : {new():ResponseDataT}
) : FetchAllRoute<
    RawParamT,
    ParamT,
    QueryT,
    BodyT,
    AccessTokenT,
    ResponseDataT
> {
    return route
        .method("GET")
        .responseAssertion(jsonApi.createDocumentWithDelegate(
            sd.array(sd.nested(responseDataCtor))
        ).assertion);
}
