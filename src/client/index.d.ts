//declare const IntersectionObserver: any;
declare const WebFont: any;
declare const XDomainRequest: any;
//declare const fetch: any;

declare const actionsOnSuccess: any;
declare const actionsOnFail: any;
declare const actionsOnAlways: any;

declare interface WFW {}
declare interface FormModule {
    new (subject?: string): FormModule;
}
declare interface FunctionConstructor {
    isFn: (...fns: Array<any>) => boolean;
}
declare interface Window {
    _WFW_: WFW;
    _FM_: FormModule;
    SITE_LANG?: string;
    decodeURIComponent: (arg?: any) => string;
}
declare type IS = { [i: string]: any };
declare type Parallax = any;
declare type PromiseResolverFn = ((value?: {} | PromiseLike<{}> | undefined) => void) | null;
declare type XDomainRequest = any;

declare module "parallax";

