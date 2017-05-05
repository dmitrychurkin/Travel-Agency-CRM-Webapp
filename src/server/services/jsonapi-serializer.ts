import { Request, Response } from "express";
interface IAnyData {
    [key: string]: any;
}
interface Ijsonapi {
    version: string;
}
interface ILink {
    self?: string | { href: string; meta: IAnyData };
    related?: string | { href: string; meta: IAnyData };
}
interface IResourceIdentifier {
    id: string;
    type: string;
    meta?: IAnyData;
}
export interface IResource {
    id: string;
    type: string;
    attributes?: IAnyData;
    relationships?: {
        data: IResourceIdentifier;
        links?: ILink;
        meta?: IAnyData;
    };
    links?: ILink;
    meta?: IAnyData;
};
export interface IJsonAPISpec {
    data: Array<IResourceIdentifier> | Array<IResource> | Array<undefined> | IResourceIdentifier | IResource | null;
    meta?: IAnyData;
    jsonapi?: Ijsonapi;
    links?: ILink;
    included?: Array<IResourceIdentifier> | Array<IResource> | Array<undefined> | IResourceIdentifier | IResource | null;
};
export namespace JsonAPI {
    function serializeDATA(DATA: IJsonAPISpec) {
        return JSON.stringify(DATA);
    }
    function setHeader(res: Response) {
        res.set("Content-Type", "application/vnd.api+json");
        return res;
    }
    export function validateRequest(req: Request, res: Response) {
        const MEDIA_TYPE = "application/vnd.api+json";
        if (req.get("Content-Type") && req.get("Content-Type") !== MEDIA_TYPE) {
            res.status(415).end(); // Unsupported Media Type
            return false;
        }
        if (req.get("Accept") && req.get("Accept") !== MEDIA_TYPE) {
            res.status(406).end(); // Not Acceptable
            return false;
        }
        return true;
    }
    export function sendData(DATA: IJsonAPISpec, res: Response) {
        setHeader(res)
                .send( serializeDATA(DATA) );
    }
}
