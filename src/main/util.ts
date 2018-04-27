import {AssertDelegate, nested} from "schema-decorator";

export type AssertFunc<T> = ({new():T})|((name:string, mixed:any)=>T);

export function isCtor<T> (assertFunc : AssertFunc<T>) : assertFunc is {new():T} {
    return assertFunc.length == 0;
}

export function toAssertDelegate<T> (assertFunc : AssertFunc<T>) : AssertDelegate<T> {
    if (isCtor(assertFunc)) {
        return nested(assertFunc);
    } else {
        return assertFunc;
    }
}
