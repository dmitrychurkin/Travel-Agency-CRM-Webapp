"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const services_1 = require("../services");
const serverConfig_1 = require("../serverConfig");
class OffersImgsController {
    getOffers_JsonAPI(req, res) {
        if (!services_1.JsonAPI.validateRequest(req, res))
            return;
        return models_1.FileStorageModel.aggregate({
            $project: {
                _id: 0,
                files: {
                    $filter: {
                        input: "$files",
                        as: "file",
                        cond: { $eq: ["$$file.isInPublic", true] }
                    }
                },
                maxWidth: 1,
                slideShow: 1,
                sliderMode: 1
            }
        })
            .then((result) => {
            const { files, maxWidth, slideShow, sliderMode } = result[0];
            const responseResult = {
                data: [],
                meta: { maxWidth, slideShow, sliderMode }
            };
            let attributesFields = [];
            const fieldName = req.path.slice(1, -1);
            let isWithQuery = false;
            if (req.query && req.query.fields && req.query.fields[fieldName]) {
                attributesFields = req.query.fields[fieldName].split(",");
                isWithQuery = true;
            }
            for (const file of files) {
                const { _id: id, storageFilename: fileName, fileSize, meta } = file;
                const attributes = {};
                if (isWithQuery) {
                    for (const attrName of attributesFields) {
                        let pseudonim;
                        switch (attrName) {
                            case "fileName":
                                pseudonim = "storageFilename";
                                break;
                            default:
                                pseudonim = attrName;
                        }
                        attributes[attrName] = file[pseudonim];
                    }
                }
                else {
                    attributes.fileName = fileName;
                    attributes.fileSize = fileSize;
                    attributes.meta = meta;
                }
                responseResult.data.push({
                    type: "offers",
                    id,
                    attributes,
                    links: {
                        self: `${services_1.getResourceUrl(req)}${serverConfig_1.default.FILE_STORAGE.SERVED_PUBLIC_PATH}${fileName}`
                    }
                });
            }
            return services_1.JsonAPI.sendData(responseResult, res);
        })
            .catch(() => res.status(500).end());
    }
    editSliderMeta_JsonAPI(req, res) {
        if (!services_1.isThisObjectSync(req, req.body) ||
            !services_1.isThisObjectSync(req.body.data) ||
            !services_1.isThisObjectSync(req.body.data.attributes) ||
            !services_1.JsonAPI.validateRequest(req, res)) {
            return !res.headersSent ? res.status(403).end() : null;
        }
        const { attributes } = req.body.data;
        const dbSetOptions = { $set: {} };
        for (const metaField in attributes) {
            if (attributes[metaField]) {
                dbSetOptions.$set[metaField] = attributes[metaField];
            }
        }
        return models_1.FileStorageModel.update({ _id: serverConfig_1.default.FILE_STORAGE.DB_ID }, dbSetOptions)
            .then(({ ok, nModified, n }) => {
            if (ok && nModified && n) {
                return res.status(204).end();
            }
            throw new Error("Fail to update");
        })
            .catch(() => res.status(500).end());
    }
    editOffersMeta_JsonAPI(req, res) {
        if (!req || !req.params || !req.body || !services_1.JsonAPI.validateRequest(req, res)) {
            return !res.headersSent ? res.status(403).end() : null;
        }
        const { data } = req.body;
        if (!data || !data.attributes || !services_1.isThisObjectSync(data, data.attributes)) {
            return res.status(403).end();
        }
        const { attributes: { meta } } = data;
        return models_1.FileStorageModel.update({ _id: serverConfig_1.default.FILE_STORAGE.DB_ID, "files._id": req.params.fileid }, { $set: { "files.$.meta": meta } })
            .then(({ ok, nModified, n }) => {
            if (ok && nModified && n) {
                return res.status(204).end();
            }
            throw new Error("Fail to update");
        })
            .catch(() => res.status(500).end());
    }
}
exports.offersImgsController = new OffersImgsController();
