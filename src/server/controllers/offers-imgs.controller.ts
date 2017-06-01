import { Request, Response } from "express";
import { Application } from "../app";
import { FileStorageModel } from "../models";
import { JsonAPI, getResourceUrl } from "../services";
import ServerConfig from "../serverConfig";
import { IFileDbProps, IUpdatePayload } from "../interfaces";

interface IOffersAggrResult {
    files: Array<IFileDbProps>;
    offers: {
        maxWidth: number;
        slideShow: number;
        sliderMode: "sequensed" | "static";
    };
}
interface IAttrs {
    fileName: string;
    fileSize: number;
    meta: {
        alt: string;
        title: string;
    } | undefined;
}
interface IPortOffersResponse {
    data: Array<{
        type: "offers",
        id: string;
        links: {
            self: string;
        }
        attributes: IAttrs
    }>;
    meta: {
        maxWidth: number;
        slideShow: number;
        sliderMode: "sequensed" | "static"
    };
}
class OffersImgsController {
    private _offersFetcher(): Promise<IOffersAggrResult> {
        const CACHE: IOffersAggrResult = Application.express.get("offers");
        if (CACHE) {
            return Promise.resolve(CACHE);
        }
        return FileStorageModel.aggregate({
            $project: {
                _id: 0,
                files: {
                    $filter: {
                        input: "$files",
                        as: "file",
                        cond: { $eq: [ "$$file.locationFlag", "O" ] }
                    }
                },
                offers: 1
            }
        })
        .then((result: Array<IOffersAggrResult>) => {
            const resultObject = result[0];
            if (!CACHE) {
                Application.express.set("offers", resultObject);
            }
            return resultObject;
        });
    }
    getOffers_JsonAPI() {
        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) return;

            this._offersFetcher()
            .then((result: IOffersAggrResult) => {

                const{ files, offers: { maxWidth, slideShow, sliderMode } } = result;
                const responseResult: IPortOffersResponse = {
                    data: [],
                    meta: { maxWidth, slideShow, sliderMode }
                };
                let attributesFields: Array<keyof IAttrs> = [];
                const fieldName = req.path.slice(1, -1);
                let isWithQuery = false;
                if (req.query && req.query.fields && req.query.fields[fieldName]) {
                        attributesFields = req.query.fields[fieldName].split(",");
                        isWithQuery = true;
                }
                for (const file of files) {
                        const { _id: id, storageFilename: fileName, fileSize, meta } = file;
                        const attributes = <IAttrs>{};
                        if (isWithQuery) {
                            for (const attrName of attributesFields) {
                                let pseudonim: keyof IFileDbProps;
                                switch (attrName) {
                                    case "fileName":
                                        pseudonim = "storageFilename";
                                    break;
                                    default:
                                        pseudonim = attrName;
                                }
                                attributes[attrName] = file[pseudonim];
                            }
                        }else {
                            attributes.fileName = fileName;
                            attributes.fileSize = fileSize;
                            attributes.meta = meta;
                        }
                        responseResult.data.push({
                            type: "offers",
                            id,
                            attributes,
                            links: {
                                self: `${getResourceUrl(req)}${ServerConfig.FILE_STORAGE.SERVED_OFFERS_PATH}${fileName}`
                            }
                        });
                }
                return JsonAPI.sendData(responseResult, res);
            })
            .catch(() => res.status(500).end());
        };
    }
    editSliderMeta_JsonAPI(req: Request, res: Response) {
        if (!JsonAPI.validateRequest(req, res)) return;
        if ( req && req.body && req.body.data && req.body.data.attributes ) {

            const{ attributes } = req.body.data;

            const dbSetOptions: any = { $set: {} };

            const CACHE = Application.express.get("offers");

            for (const metaField in attributes) {
                if (attributes[metaField]) {
                    dbSetOptions.$set[`offers.${metaField}`] = attributes[metaField];
                    if (CACHE) {
                        CACHE.offers[metaField] = attributes[metaField];
                    }
                }
            }

            return FileStorageModel.update({ _id: ServerConfig.FILE_STORAGE.DB_ID }, dbSetOptions)
                        .then(({ ok, nModified, n }: IUpdatePayload) => {
                            if (ok && nModified && n) {
                                if (CACHE) {
                                    Application.express.set("offers", CACHE);
                                }
                                return res.status(204).end();
                            }
                            throw new Error("Fail to update");
                        })
                        .catch(() => res.status(500).end());
        }
        return res.status(403).end();
    }
    editOffersMeta_JsonAPI(req: Request, res: Response) {
        if (!JsonAPI.validateRequest(req, res)) return;
        if ( req && req.params && req.params.fileid && req.body && req.body.data && req.body.data.attributes ) {

            const{ data: { attributes: { meta } } } = req.body;
            const{ fileid } = req.params;
            const CACHE = Application.express.get("offers");


            return FileStorageModel.update(
                    { _id: ServerConfig.FILE_STORAGE.DB_ID, "files._id": fileid },
                    { $set: { "files.$.meta": meta } }
                )
                .then(({ ok, nModified, n }: IUpdatePayload) => {
                    if (ok && nModified && n) {
                        if (CACHE) {
                            for (const file of CACHE.files) {
                                if (file._id === fileid) {
                                    file.meta = meta;
                                }
                            }
                            Application.express.set("offers", CACHE);
                        }
                        return res.status(204).end();
                    }
                    throw new Error("Fail to update");
                })
                .catch(() => res.status(500).end());
        }
        return res.status(403).end();
    }
}

export const offersImgsController = new OffersImgsController();