import { AssertDelegate } from "schema-decorator";
export declare type AssertFunc<T> = ({
    new (): T;
}) | ((name: string, mixed: any) => T);
export declare function isCtor<T>(assertFunc: AssertFunc<T>): assertFunc is {
    new (): T;
};
export declare function toAssertDelegate<T>(assertFunc: AssertFunc<T>): AssertDelegate<T>;
