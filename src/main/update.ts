import * as sd from "schema-decorator";
import {KeyBuilder} from "./KeyBuilder";
import {StringParam} from "./StringParam";
import * as jsonApi from "@anyhowstep/json-api-schema";

export type UpdateRoute<ParamT, BodyT, ResponseDataT> = sd.Route<
    ParamT,
    StringParam<ParamT>,
    sd.Empty,
    BodyT,
    jsonApi.Document<ResponseDataT>,
    undefined,
    "PUT"|"DELETE"|"POST"
>;
export function update<ParamT, BodyT, ResponseDataT> (
    keyBuilder  : KeyBuilder<ResponseDataT, ParamT>,
    actionName : string,
    bodyCtor : {new():BodyT},
    responseDataCtor : {new():ResponseDataT},
    method : "PUT"|"DELETE"|"POST" = "PUT"
) : UpdateRoute<ParamT, BodyT, ResponseDataT> {
    const route = keyBuilder
        .setSuffix((actionName == "") ? "" : `/${actionName}`)
        .buildRoute(sd.Route.Create())
        .method(method)
        .body(bodyCtor)
        .responseAssertion(jsonApi.createDocumentWithCtor(responseDataCtor).assertion);
    return route;
}
