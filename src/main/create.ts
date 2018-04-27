import * as sd from "schema-decorator";
import * as jsonApi from "@anyhowstep/json-api-schema";
import {AssertFunc, toAssertDelegate} from "./util";

export type CreateRoute<
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
    "POST"
>;
export function create<
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
    body : AssertFunc<NewBodyT>,
    response : AssertFunc<ResponseDataT>
) : CreateRoute<
    RawParamT,
    ParamT,
    QueryT,
    NewBodyT,
    AccessTokenT,
    ResponseDataT
> {
    return route
        .method("POST")
        .bodyDelegate(toAssertDelegate(body))
        .responseDelegate(jsonApi.createDocumentWithDelegate(
            toAssertDelegate(response)).assertDelegate
        );
}
