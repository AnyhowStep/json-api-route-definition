import * as sd from "schema-decorator";
import {KeyBuilder} from "./KeyBuilder";
import {StringParam} from "./StringParam";
import * as jsonApi from "@anyhowstep/json-api-schema";

export type FetchAllRoute<ParamT, ResponseDataT> = sd.Route<
    ParamT,
    StringParam<ParamT>,
    sd.Empty,
    sd.Empty,
    jsonApi.Document<ResponseDataT[]>,
    undefined,
    "GET"
>;
export function fetchAll<
    ParamT,
    ResponseDataT
> (
    keyBuilder  : KeyBuilder<ResponseDataT, ParamT>,
    responseDataCtor : {new():ResponseDataT}
) : FetchAllRoute<ParamT, ResponseDataT> {
    const route = keyBuilder.buildRoute(sd.Route.Create())
        .method("GET")
        .responseAssertion(jsonApi.createDocumentWithDelegate(
            sd.array(sd.nested(responseDataCtor))
        ).assertion);
    return route;
}
