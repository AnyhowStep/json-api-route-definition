"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v = require("@anyhowstep/data-validation");
class KeyBuilder {
    constructor(keys, prefix, suffix) {
        this.keys = keys;
        this._dummyOutKeyT;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    static Create() {
        return new KeyBuilder([], "", "");
    }
    add(resourceName, k) {
        return new KeyBuilder([
            ...this.keys,
            {
                resourceName: resourceName,
                name: k,
            }
        ], this.prefix, this.suffix);
    }
    setPrefix(prefix) {
        return new KeyBuilder(this.keys, prefix, this.suffix);
    }
    setSuffix(suffix) {
        return new KeyBuilder(this.keys, this.prefix, suffix);
    }
    buildAssertDelegate() {
        return (name, mixed) => {
            const result = {};
            for (let k of this.keys) {
                const id = v.String.assertNonEmpty(`${name}[${k.name}]`, mixed[k.name]);
                result[k.name] = id;
            }
            //We have all the id keys and values we need, trust me
            return result;
        };
    }
    buildRouteWithoutAssertion(route) {
        route = route.append(this.prefix);
        for (let k of this.keys) {
            route = route
                .append(`/${k.resourceName}`)
                .appendParam(k.name);
        }
        route = route.append(this.suffix);
        return route;
    }
    buildRoute(route) {
        const result = this.buildRouteWithoutAssertion(route);
        return result.paramDelegate(this.buildAssertDelegate());
    }
}
exports.KeyBuilder = KeyBuilder;
//# sourceMappingURL=KeyBuilder.js.map