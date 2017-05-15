import { Request, Response } from "express";
import { FileStorageModel } from "../models";
import { JsonAPI, getResourceUrl, isThisObjectSync } from "../services";
import ServerConfig from "../serverConfig";
import { IFileDbProps, IUpdatePayload } from "../interfaces";

interface IOffersAggrResult {
    files: Array<IFileDbProps>;
    maxWidth: number;
    slideShow: number;
    sliderMode: "sequensed" | "static";
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
    getOffers_JsonAPI(req: Request, res: Response) {
        if (!JsonAPI.validateRequest(req, res)) return;

        return FileStorageModel.aggregate({
            $project: {
                _id: 0,
                files: {
                    $filter: {
                        input: "$files",
                        as: "file",
                        cond: { $eq: [ "$$file.isInPublic", true ] }
                    }
                },
                maxWidth: 1,
                slideShow: 1,
                sliderMode: 1
            }
        })
        .then((result: Array<IOffersAggrResult>) => {
           const{ files, maxWidth, slideShow, sliderMode } = result[0];
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
                        self: `${getResourceUrl(req)}${ServerConfig.FILE_STORAGE.SERVED_PUBLIC_PATH}${fileName}`
                    }
                });
           }
           return JsonAPI.sendData(responseResult, res);
        })
        .catch(() => res.status(500).end());
    }
    editSliderMeta_JsonAPI(req: Request, res: Response) {
        if ( !isThisObjectSync(req, req.body) ||
            !isThisObjectSync(req.body.data) ||
            !isThisObjectSync(req.body.data.attributes) ||
            !JsonAPI.validateRequest(req, res) ) {

            return !res.headersSent ? res.status(403).end() : null;
        }

        const{ attributes } = req.body.data;

        const dbSetOptions: any = { $set: {} };
        for (const metaField in attributes) {
            if (attributes[metaField]) {
                dbSetOptions.$set[metaField] = attributes[metaField];
            }
        }
        return FileStorageModel.update({ _id: ServerConfig.FILE_STORAGE.DB_ID }, dbSetOptions)
                    .then(({ ok, nModified, n }: IUpdatePayload) => {
                        if (ok && nModified && n) {
                            return res.status(204).end();
                        }
                        throw new Error("Fail to update");
                    })
                    .catch(() => res.status(500).end());
    }
    editOffersMeta_JsonAPI(req: Request, res: Response) {
        if (!req || !req.params || !req.body || !JsonAPI.validateRequest(req, res)) {
            return !res.headersSent ? res.status(403).end() : null;
        }
        const{ data } = req.body;
        if (!data || !data.attributes || !isThisObjectSync(data, data.attributes)) {
            return res.status(403).end();
        }

        const { attributes: { meta } } = data;
        return FileStorageModel.update(
                { _id: ServerConfig.FILE_STORAGE.DB_ID, "files._id": req.params.fileid },
                { $set: { "files.$.meta": meta } }
            )
            .then(({ ok, nModified, n }: IUpdatePayload) => {
                if (ok && nModified && n) {
                    return res.status(204).end();
                }
                throw new Error("Fail to update");
            })
            .catch(() => res.status(500).end());
    }
}

export const offersImgsController = new OffersImgsController();