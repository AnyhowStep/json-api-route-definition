import * as sd from "schema-decorator";
import { StringParam } from "./StringParam";
export interface KeyData<T> {
    resourceName: string;
    name: keyof T;
}
export declare type Key<T> = {
    [name in keyof T]?: string;
};
export declare class KeyBuilder<T, OutKeyT extends Key<T> = {}> {
    private readonly keys;
    readonly _dummyOutKeyT?: OutKeyT;
    private readonly prefix;
    private readonly suffix;
    private constructor();
    static Create<T>(): KeyBuilder<T, {}>;
    add<K extends keyof T, V extends (string) & T[K]>(resourceName: string, k: K): KeyBuilder<T, OutKeyT & { [name in K]: V; }>;
    setPrefix(prefix: string): KeyBuilder<T, OutKeyT>;
    setSuffix(suffix: string): KeyBuilder<T, OutKeyT>;
    buildAssertDelegate(): sd.AssertDelegate<StringParam<OutKeyT>>;
    buildRouteWithoutAssertion<QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral>(route: sd.Route<{}, sd.Empty, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>): sd.Route<OutKeyT, sd.Empty, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>;
    buildRoute<QueryT, BodyT, ResponseT, AccessTokenT extends sd.AccessTokenType | undefined, MethodT extends sd.MethodLiteral>(route: sd.Route<{}, sd.Empty, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>): sd.Route<OutKeyT, StringParam<OutKeyT>, QueryT, BodyT, ResponseT, AccessTokenT, MethodT>;
}
