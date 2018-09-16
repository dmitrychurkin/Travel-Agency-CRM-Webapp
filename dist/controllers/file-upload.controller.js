"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");
const rimraf = require("rimraf");
const app_1 = require("../app");
const models_1 = require("../models");
const serverConfig_1 = require("../serverConfig");
const services_1 = require("../services");
class FileUploadController {
    _failWithTooBigFile(responseData, res) {
        responseData.error = "Too big!";
        responseData.preventRetry = true;
        res.send(responseData);
    }
    _isValidFileSize(size) {
        const { maxFileSize } = FileUploadController;
        return maxFileSize === 0 || size < maxFileSize;
    }
    _isFileNameUnique(files, fileNameWithExtension) {
        for (const file of files) {
            if (file.storageFilename === fileNameWithExtension) {
                return false;
            }
        }
        return true;
    }
    _moveUploadedFile(file, fileStorageMongooseDoc, success, failure) {
        const destinationFile = path.resolve(FileUploadController.pathToStorage, file.storageFilename);
        services_1.moveFileAsync(file.path, destinationFile)
            .then(() => {
            const newObjectFileEntity = {
                _id: file.uuid,
                fileSize: file.size,
                storageFilename: file.storageFilename
            };
            return fileStorageMongooseDoc.update({
                $inc: { currentStorageSize: file.size },
                $push: { files: newObjectFileEntity }
            });
        })
            .then(success)
            .catch(failure);
    }
    _onSimpleUpload(fields, file, responseData, fileStorageMongooseDoc, res, req) {
        const { files } = fileStorageMongooseDoc;
        const fileNameWithExtension = fields.qqfilename.toString() || file.originalFilename.toString();
        file.storageFilename = fileNameWithExtension;
        file.uuid = fields.qquuid.toString();
        if (!this._isFileNameUnique(files, fileNameWithExtension)) {
            const [fileName, fileExtension] = fileNameWithExtension.split(".");
            file.storageFilename = `${fileName}_${file.uuid}.${fileExtension}`;
        }
        if (this._isValidFileSize(file.size)) {
            this._moveUploadedFile(file, fileStorageMongooseDoc, () => {
                let serveDestination;
                try {
                    serveDestination = this._serveDestHelper("S", file.storageFilename);
                }
                catch (e) {
                    throw e;
                }
                responseData = Object.assign(responseData, {
                    data: {
                        attributes: {
                            fileName: file.storageFilename,
                            fileSize: file.size,
                            locationFlag: "S"
                        },
                        id: file.uuid,
                        type: "files",
                        links: {
                            self: `${services_1.getResourceUrl(req)}${serveDestination}${file.storageFilename}`
                        }
                    },
                    success: true
                });
                res.send(responseData);
            }, (e) => {
                responseData.error = (e && e.message) || "Problem copying the file!";
                res.send(responseData);
            });
        }
        else {
            this._failWithTooBigFile(responseData, res);
        }
    }
    onUploadController() {
        return (req, res) => {
            const form = new multiparty.Form();
            form.parse(req, (err, fields, files) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const responseObject = { success: false };
                try {
                    res.set("Content-Type", "text/plain");
                    const { qqtotalfilesize } = fields;
                    const fileSize = +qqtotalfilesize.toString();
                    const FileStorageDocument = yield models_1.FileStorageModel.findById(serverConfig_1.default.FILE_STORAGE.DB_ID)
                        .select("currentStorageSize files")
                        .exec();
                    const { currentStorageSize } = FileStorageDocument;
                    if (currentStorageSize + fileSize > FileUploadController.maxStorageSize) {
                        return res.send(Object.assign(responseObject, { error: "File size is too big", preventRetry: true }));
                    }
                    if (err) {
                        return res.send(Object.assign(responseObject, { error: err.message }));
                    }
                    return this._onSimpleUpload(fields, files[FileUploadController.fileInputName][0], responseObject, FileStorageDocument, res, req);
                }
                catch (err) {
                    return res.send(Object.assign(responseObject, { error: err.message }));
                }
            }));
        };
    }
    onDeleteController() {
        return (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const uuid = req.params.uuid;
                const SelectedFileObject = yield new Promise((resolve, reject) => models_1.FileStorageModel.aggregate([{
                        $project: {
                            _id: 0,
                            currentStorageSize: 1,
                            fileNames: 1,
                            files: {
                                $filter: {
                                    input: "$files",
                                    as: "f",
                                    cond: {
                                        $eq: ["$$f._id", uuid]
                                    }
                                }
                            }
                        }
                    }])
                    .cursor({})
                    .exec()
                    .stream()
                    .on("data", resolve)
                    .on("error", reject));
                const SelectedFileEntity = SelectedFileObject.files[0];
                if (SelectedFileEntity) {
                    const { fileSize, storageFilename, locationFlag, _id } = SelectedFileEntity;
                    return this._deleteFileHelper({ fileSize, storageFilename, locationFlag, _id }, res);
                }
                return res.status(204).end();
            }
            catch (err) {
                res.status(500).end();
            }
        });
    }
    _cacheSync(resultAfterUpdate) {
        let CACHE = app_1.default.express.get("offers");
        const { files, offers } = resultAfterUpdate;
        if (!CACHE) {
            CACHE = {};
        }
        CACHE.files = files.filter((file) => file.locationFlag === "O");
        CACHE.offers = offers;
        app_1.default.express.set("offers", CACHE);
    }
    _getAppropriateLocation(fileName, isToServe = false) {
        for (const extensionGroup of FileUploadController.fileExtensionRelation) {
            if (extensionGroup.extensions.includes(fileName.split(".")[1])) {
                return isToServe ? extensionGroup.serveLocation : extensionGroup.location;
            }
        }
        throw new Error("Invalid file extension");
    }
    _pathResolver(locationFlag, storageFilename) {
        const { pathToStorage, offersPath } = FileUploadController;
        if (locationFlag === "S") {
            return path.resolve(pathToStorage, storageFilename);
        }
        else if (locationFlag === "P") {
            return path.resolve(this._getAppropriateLocation(storageFilename), storageFilename);
        }
        return path.resolve(offersPath, storageFilename);
    }
    _deleteFileHelper({ locationFlag, storageFilename, fileSize, _id }, res) {
        try {
            const PathToDelete = this._pathResolver(locationFlag, storageFilename);
            return rimraf(PathToDelete, err => {
                if (err) {
                    return res.status(500).end();
                }
                return models_1.FileStorageModel.findByIdAndUpdate(serverConfig_1.default.FILE_STORAGE.DB_ID, {
                    $inc: { currentStorageSize: -fileSize },
                    $pull: { files: { _id } }
                }, { new: true, select: "files offers -_id" })
                    .then((resultAfterUpdate) => {
                    this._cacheSync(resultAfterUpdate);
                    res.status(204).end();
                })
                    .catch(() => res.status(500).end());
            });
        }
        catch (e) {
            res.status(500).end();
        }
    }
    _serveDestHelper(locationFlag, fileName) {
        const { SERVED_OFFERS_PATH, SERVED_STORAGE_PATH } = serverConfig_1.default.FILE_STORAGE;
        if (locationFlag === "O") {
            return SERVED_OFFERS_PATH;
        }
        else if (locationFlag === "S") {
            return SERVED_STORAGE_PATH;
        }
        return this._getAppropriateLocation(fileName, true);
    }
    fetchStoreController_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res))
                return;
            if (Object.keys(req.query).length > 0) {
                const { fields } = req.query;
                if (fields) {
                    switch (fields.locationFlag.toUpperCase()) {
                        case "P":
                            return models_1.FileStorageModel.findById(serverConfig_1.default.FILE_STORAGE.DB_ID)
                                .select("files -_id")
                                .then(({ files }) => {
                                const data = [];
                                files.forEach((file) => {
                                    if (file.locationFlag === "P" && FileUploadController.fileExtensionRelation[fields.type].extensions.includes(file.storageFilename.split(".")[1])) {
                                        let serveDestination;
                                        try {
                                            serveDestination = this._serveDestHelper("P", file.storageFilename);
                                        }
                                        catch (e) {
                                            throw e;
                                        }
                                        data.push({
                                            id: file._id,
                                            type: "image",
                                            links: {
                                                self: `${services_1.getResourceUrl(req)}${serveDestination}${file.storageFilename}`
                                            }
                                        });
                                    }
                                });
                                services_1.JsonAPI.sendData({ data }, res);
                            })
                                .catch(() => res.status(500).end());
                    }
                }
            }
            return models_1.FileStorageModel.findById(serverConfig_1.default.FILE_STORAGE.DB_ID)
                .select("-_id files offers")
                .then(({ files, offers }) => {
                let CACHE = app_1.default.express.get("offers");
                const responseData = {
                    links: {
                        self: services_1.getResourceUrl(req) + req.originalUrl
                    },
                    data: []
                };
                if (!CACHE) {
                    CACHE = {
                        files: [],
                        offers,
                        new: true
                    };
                }
                files.forEach((file) => {
                    const { _id, fileSize, storageFilename, locationFlag } = file;
                    if (CACHE.new && locationFlag === "O") {
                        CACHE.files.push(file);
                    }
                    let serveDestination;
                    try {
                        serveDestination = this._serveDestHelper(locationFlag, storageFilename);
                    }
                    catch (e) {
                        throw e;
                    }
                    responseData.data.push({
                        type: "files",
                        id: _id,
                        attributes: {
                            fileSize,
                            locationFlag,
                            fileName: storageFilename
                        },
                        links: {
                            self: `${services_1.getResourceUrl(req)}${serveDestination}${storageFilename}`
                        }
                    });
                });
                if (CACHE.new) {
                    delete CACHE.new;
                    app_1.default.express.set("offers", CACHE);
                }
                services_1.JsonAPI.sendData(responseData, res);
            })
                .catch(() => res.status(500).end());
        };
    }
    downloadFileAsync() {
        return (req, res) => {
            if (req && req.method === "GET" && req.query && req.query.file && req.query.location) {
                const { file, location } = req.query;
                let resolvedPath;
                try {
                    resolvedPath = this._pathResolver(location, file);
                }
                catch (e) {
                    return res.status(500).end();
                }
                return res.download(resolvedPath, file, err => {
                    if (err && !res.headersSent) {
                        res.status(500).end();
                    }
                });
            }
            return res.status(403).end();
        };
    }
    actionFile_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res))
                return;
            if (req && req.body && req.body.data && req.body.data.attributes && req.body.meta) {
                const { data: { id, type, attributes: { fileName, locationFlag, fileSize } }, meta: { ACTION, newName, newLocation } } = req.body;
                const { pathToStorage, offersPath } = FileUploadController;
                const getPathHelper = (currentLocationFlag, fileName) => {
                    let path;
                    switch (currentLocationFlag) {
                        case "S":
                            path = pathToStorage;
                            break;
                        case "O":
                            path = offersPath;
                            break;
                        default:
                            path = this._getAppropriateLocation(fileName);
                    }
                    return path;
                };
                let PathFrom;
                let PathTo;
                let DB_updateSet;
                let responseData;
                if (ACTION === "MOVE") {
                    let destPathFrom;
                    let destPathTo;
                    let serveDestination;
                    try {
                        destPathFrom = getPathHelper(locationFlag, fileName);
                        destPathTo = this._getAppropriateLocation(fileName);
                        serveDestination = this._serveDestHelper(newLocation, fileName);
                    }
                    catch (e) {
                        return res.status(500).end();
                    }
                    PathFrom = path.resolve(destPathFrom, fileName);
                    switch (newLocation) {
                        case "O":
                            PathTo = path.resolve(offersPath, fileName);
                            break;
                        case "P":
                            PathTo = path.resolve(destPathTo, fileName);
                            break;
                        default:
                            PathTo = path.resolve(pathToStorage, fileName);
                    }
                    DB_updateSet = { $set: { "files.$.locationFlag": newLocation } };
                    responseData = {
                        data: { id, type },
                        links: { self: `${services_1.getResourceUrl(req)}${serveDestination}${fileName}` }
                    };
                }
                else if (ACTION === "RENAME") {
                    let destPathFrom;
                    let destPathTo;
                    try {
                        destPathFrom = this._getAppropriateLocation(fileName);
                        destPathTo = this._getAppropriateLocation(newName);
                    }
                    catch (e) {
                        return res.status(500).end();
                    }
                    switch (locationFlag) {
                        case "O":
                            {
                                PathFrom = path.resolve(offersPath, fileName);
                                PathTo = path.resolve(offersPath, newName);
                            }
                            break;
                        case "P":
                            {
                                PathFrom = path.resolve(destPathFrom, fileName);
                                PathTo = path.resolve(destPathTo, newName);
                            }
                            break;
                        default: {
                            PathFrom = path.resolve(pathToStorage, fileName);
                            PathTo = path.resolve(pathToStorage, newName);
                        }
                    }
                    DB_updateSet = { $set: { "files.$.storageFilename": newName } };
                }
                else {
                    return this._deleteFileHelper({ fileSize, storageFilename: fileName, locationFlag, _id: id }, res);
                }
                return services_1.moveFileAsync(PathFrom, PathTo)
                    .then(() => models_1.FileStorageModel.findOneAndUpdate({ _id: serverConfig_1.default.FILE_STORAGE.DB_ID, "files._id": id }, DB_updateSet, { new: true, fields: "files offers -_id" }))
                    .then((resultAfterUpdate) => {
                    if (resultAfterUpdate) {
                        this._cacheSync(resultAfterUpdate);
                        return responseData ? services_1.JsonAPI.sendData(responseData, res) : res.status(204).end();
                    }
                    throw new Error("Fail to update");
                })
                    .catch(() => res.status(500).end());
            }
            return res.status(403).end();
        };
    }
    serveRequestToStorage() {
        return (req, res) => {
            const file = req.params.file;
            const pathToFile = path.resolve(FileUploadController.pathToStorage, file);
            fs.stat(pathToFile, err => {
                if (err) {
                    return res.status(404).end();
                }
                fs.createReadStream(pathToFile).pipe(res);
            });
        };
    }
}
FileUploadController.fileInputName = "qqfile";
FileUploadController.pathToStorage = serverConfig_1.default.FILE_STORAGE.PATH_TO_STORAGE;
FileUploadController.maxStorageSize = serverConfig_1.default.FILE_STORAGE.MAX_STORAGE_SIZE;
FileUploadController.offersPath = serverConfig_1.default.FILE_STORAGE.PATH_TO_OFFERS;
FileUploadController.maxFileSize = serverConfig_1.default.FILE_STORAGE.MAX_FILE_SIZE;
FileUploadController.fileExtensionRelation = [
    {
        extensions: ["jpg", "jpeg", "png", "gif", "tiff", "bmp", "jfif"],
        location: serverConfig_1.default.FILE_STORAGE.PATH_TO_PUBLIC_IMAGES,
        serveLocation: serverConfig_1.default.FILE_STORAGE.SERVED_PUBLIC_IMAGES
    },
    {
        extensions: ["avi", "mp4", "flv", "webm", "ogv", "ogg", "mp3", "weba", "wav", "oga", "aac"],
        location: serverConfig_1.default.FILE_STORAGE.PATH_TO_PUBLIC_MEDIA,
        serveLocation: serverConfig_1.default.FILE_STORAGE.SERVED_PUBLIC_MEDIA
    },
    {
        extensions: ["pdf", "txt", "doc", "docx"],
        location: serverConfig_1.default.FILE_STORAGE.PATH_TO_PUBLIC_DOCS,
        serveLocation: serverConfig_1.default.FILE_STORAGE.PATH_TO_PUBLIC_DOCS
    }
];
exports.fileUploaderController = new FileUploadController();
