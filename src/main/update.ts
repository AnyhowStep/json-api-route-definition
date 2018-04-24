import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";

export type UpdateRoute<
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
    jsonApi.Document<ResponseDataT>,
    AccessTokenT,
    "PUT"|"DELETE"|"POST"
>;
export function update<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT extends sd.AccessTokenType|undefined,
    MethodT extends sd.MethodLiteral,

    NewBodyT,
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
    actionName : string,
    bodyCtor : {new():NewBodyT},
    responseDataCtor : {new():ResponseDataT},
    method : "PUT"|"DELETE"|"POST" = "PUT"
) : UpdateRoute<
    RawParamT,
    ParamT,
    QueryT,
    NewBodyT,
    AccessTokenT,
    ResponseDataT
> {
    if (actionName != "") {
        const paramT = route.args.paramT;
        route = route
            .withoutParam()
            .append(`/${actionName}`)
            .paramAssertion(paramT);
    }
    return route
        .method(method)
        .body(bodyCtor)
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
}
