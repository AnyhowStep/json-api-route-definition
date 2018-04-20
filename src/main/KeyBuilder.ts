import * as sd from "schema-decorator";
import * as v from "@anyhowstep/data-validation";
import {StringParam} from "./StringParam";

export interface KeyData<T> {
    resourceName : string,
    name  : keyof T,
}
export type Key<T> = { [name in keyof T]? : string };

export class KeyBuilder<T, OutKeyT extends Key<T> = {}> {
    private readonly keys : KeyData<T>[];
    public readonly _dummyOutKeyT? : OutKeyT;

    //The path before the id part
    private readonly prefix : string;
    //The path after the id part
    private readonly suffix : string;

    private constructor (keys : KeyData<T>[], prefix : string, suffix : string) {
        this.keys = keys;
        this._dummyOutKeyT;

        this.prefix = prefix;
        this.suffix = suffix;
    }
    public static Create<T> () {
        return new KeyBuilder<T, {}>([], "", "");
    }
    public add<K extends keyof T, V extends (string)&T[K]> (resourceName : string, k : K) {
        return new KeyBuilder<T, OutKeyT & { [name in K] : V }>(
            [
                ...this.keys,
                {
                    resourceName : resourceName,
                    name  : k,
                }
            ],
            this.prefix,
            this.suffix
        );
    }
    public setPrefix (prefix : string) {
        return new KeyBuilder<T, OutKeyT>(
            this.keys,
            prefix,
            this.suffix
        );
    }
    public setSuffix (suffix : string) {
        return new KeyBuilder<T, OutKeyT>(
            this.keys,
            this.prefix,
            suffix
        );
    }
    public buildAssertDelegate () : sd.AssertDelegate<StringParam<OutKeyT>> {
        return (name : string, mixed : any) : StringParam<OutKeyT> => {
            const result : Partial<StringParam<OutKeyT>> = {};
            for (let k of this.keys) {
                const id = v.String.assertNonEmpty(`${name}[${k.name}]`, mixed[k.name]);
                result[k.name] = id;
            }
            //We have all the id keys and values we need, trust me
            return result as any;
        };
    }
    public buildRouteWithoutAssertion<
        QueryT,
        BodyT,
        ResponseT,
        AccessTokenT extends sd.AccessTokenType | undefined,
        MethodT extends sd.MethodLiteral
    > (route : sd.Route<{}, sd.Empty, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>) : sd.Route<OutKeyT, sd.Empty, QueryT, BodyT, ResponseT, AccessTokenT, MethodT> {
        route = route.append(this.prefix);
        for (let k of this.keys) {
            route = route
                .append(`/${k.resourceName}`)
                .appendParam(k.name);
        }
        route = route.append(this.suffix);
        return route;
    }
    public buildRoute<
        QueryT,
        BodyT,
        ResponseT,
        AccessTokenT extends sd.AccessTokenType | undefined,
        MethodT extends sd.MethodLiteral
    > (route : sd.Route<{}, sd.Empty, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>) : sd.Route<OutKeyT, StringParam<OutKeyT>, QueryT, BodyT, ResponseT, AccessTokenT, MethodT> {
        const result = this.buildRouteWithoutAssertion(route);
        return result.paramDelegate(this.buildAssertDelegate());
    }
}
