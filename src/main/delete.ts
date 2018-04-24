import * as sd from "schema-decorator";

export type DeleteRoute<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT extends sd.AccessTokenType|undefined
> = sd.Route<
    RawParamT,
    ParamT,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT,
    "DELETE"
>;
export function del<
    RawParamT,
    ParamT extends sd.Param<RawParamT>,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT extends sd.AccessTokenType|undefined,
    MethodT extends sd.MethodLiteral
> (
    route : sd.Route<
        RawParamT,
        ParamT,
        QueryT,
        BodyT,
        ResponseT,
        AccessTokenT,
        MethodT
    >
) : DeleteRoute<
    RawParamT,
    ParamT,
    QueryT,
    BodyT,
    ResponseT,
    AccessTokenT
> {
    return route
        .method("DELETE");
}
