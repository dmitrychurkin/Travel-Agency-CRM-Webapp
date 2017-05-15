"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");
const rimraf = require("rimraf");
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
        const sourceStream = fs.createReadStream(file.path);
        const destStream = fs.createWriteStream(destinationFile);
        sourceStream
            .on("error", (err) => {
            console.error("Problem copying file: " + err.stack);
            destStream.end();
            failure();
        })
            .on("end", () => {
            destStream.end();
            const newObjectFileEntity = {
                _id: file.uuid,
                fileSize: file.size,
                storageFilename: file.storageFilename
            };
            fileStorageMongooseDoc.update({
                $inc: { currentStorageSize: file.size },
                $push: { files: newObjectFileEntity }
            })
                .then(success)
                .catch(failure);
        })
            .pipe(destStream);
    }
    _onSimpleUpload(fields, file, responseData, fileStorageMongooseDoc, res, req) {
        const { files } = fileStorageMongooseDoc;
        const fileNameWithExtension = file.originalFilename.toString();
        file.storageFilename = fileNameWithExtension;
        file.uuid = fields.qquuid.toString();
        if (!this._isFileNameUnique(files, fileNameWithExtension)) {
            const [fileName, fileExtension] = fileNameWithExtension.split(".");
            file.storageFilename = `${fileName}_${file.uuid}.${fileExtension}`;
        }
        if (this._isValidFileSize(file.size)) {
            this._moveUploadedFile(file, fileStorageMongooseDoc, () => {
                responseData = Object.assign(responseData, {
                    data: {
                        attributes: {
                            fileName: file.storageFilename,
                            fileSize: file.size,
                            isInPublic: false
                        },
                        id: file.uuid,
                        type: "files",
                        links: {
                            self: `${services_1.getResourceUrl(req)}${this._serveDestHelper(false)}${file.storageFilename}`
                        }
                    },
                    success: true
                });
                res.send(responseData);
            }, () => {
                responseData.error = "Problem copying the file!";
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
                const SelectedFileArray = yield models_1.FileStorageModel.aggregate([{
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
                    }]).exec();
                const SelectedFileEntity = SelectedFileArray[0].files[0];
                const { fileSize, storageFilename, isInPublic, _id } = SelectedFileEntity;
                return this._deleteFileHelper({ fileSize, storageFilename, isInPublic, _id }, res);
            }
            catch (err) {
                res.status(500).end();
            }
        });
    }
    _deleteFileHelper({ isInPublic, storageFilename, fileSize, _id }, res) {
        const { pathToStorage, publicPath } = FileUploadController;
        const PathToDelete = isInPublic ? path.resolve(publicPath, storageFilename) : path.resolve(pathToStorage, storageFilename);
        return rimraf(PathToDelete, err => {
            if (err) {
                return res.status(500).end();
            }
            return models_1.FileStorageModel.findByIdAndUpdate(serverConfig_1.default.FILE_STORAGE.DB_ID, {
                $inc: { currentStorageSize: -fileSize },
                $pull: { files: { _id } }
            })
                .then(() => res.status(204).end())
                .catch(() => res.status(500).end());
        });
    }
    _serveDestHelper(isInPublic) {
        return isInPublic ? serverConfig_1.default.FILE_STORAGE.SERVED_PUBLIC_PATH : serverConfig_1.default.FILE_STORAGE.SERVED_STORAGE_PATH;
    }
    fetchStoreController_JsonAPI() {
        return (...args) => {
            const [req, res] = args;
            if (!services_1.JsonAPI.validateRequest(req, res))
                return;
            return models_1.FileStorageModel.findById(serverConfig_1.default.FILE_STORAGE.DB_ID)
                .select("-_id files")
                .then(({ files }) => {
                const responseData = {
                    links: {
                        self: services_1.getResourceUrl(req) + req.originalUrl
                    },
                    data: []
                };
                files.forEach(({ _id, fileSize, storageFilename, isInPublic }) => {
                    responseData.data.push({
                        type: "files",
                        id: _id,
                        attributes: {
                            fileSize,
                            isInPublic,
                            fileName: storageFilename
                        },
                        links: {
                            self: `${services_1.getResourceUrl(req)}${this._serveDestHelper(isInPublic)}${storageFilename}`
                        }
                    });
                });
                services_1.JsonAPI.sendData(responseData, res);
            })
                .catch(() => res.status(500).end());
        };
    }
    downloadFileAsync(req, res) {
        const { pathToStorage, publicPath } = FileUploadController;
        if (req.method === "GET") {
            const { query = {} } = req;
            const { file } = query;
            return res.download(query.public === "true" ? path.resolve(publicPath, file) : path.resolve(pathToStorage, file), file, err => {
                if (err && !res.headersSent) {
                    res.status(500).end();
                }
            });
        }
    }
    actionFile_JsonAPI() {
        return (req, res) => {
            if (!services_1.JsonAPI.validateRequest(req, res))
                return;
            if (!services_1.isThisObjectSync(req, req.body, req.body.data, req.body.data.attributes, req.body.meta)) {
                return res.status(403).end();
            }
            const { data: { id, type, attributes: { fileName, isInPublic, fileSize } }, meta: { ACTION, newName } } = req.body;
            const { pathToStorage, publicPath } = FileUploadController;
            let PathFrom;
            let PathTo;
            let DB_updateSet;
            let responseData = { data: { id, type } };
            if (ACTION === "MOVE_TO_PUBLIC" || ACTION === "MOVE_TO_STORE") {
                if (isInPublic) {
                    PathFrom = path.resolve(pathToStorage, fileName);
                    PathTo = path.resolve(publicPath, fileName);
                }
                else {
                    PathFrom = path.resolve(publicPath, fileName);
                    PathTo = path.resolve(pathToStorage, fileName);
                }
                DB_updateSet = { $set: { "files.$.isInPublic": isInPublic } };
                responseData = Object.assign(responseData, { links: { self: `${services_1.getResourceUrl(req)}${this._serveDestHelper(isInPublic)}${fileName}` } });
            }
            else if (ACTION === "RENAME") {
                if (isInPublic) {
                    PathFrom = path.resolve(publicPath, fileName);
                    PathTo = path.resolve(publicPath, newName);
                }
                else {
                    PathFrom = path.resolve(pathToStorage, fileName);
                    PathTo = path.resolve(pathToStorage, newName);
                }
                DB_updateSet = { $set: { "files.$.storageFilename": newName } };
                responseData.data.attributes = { fileName: newName };
            }
            else {
                return this._deleteFileHelper({ fileSize, storageFilename: fileName, isInPublic, _id: id }, res);
            }
            return services_1.moveFileAsync(PathFrom, PathTo)
                .then(() => models_1.FileStorageModel.update({ _id: serverConfig_1.default.FILE_STORAGE.DB_ID, "files._id": id }, DB_updateSet))
                .then(({ ok, nModified, n }) => {
                if (ok && nModified && n) {
                    return services_1.JsonAPI.sendData(responseData, res);
                }
                throw new Error("Fail to update");
            })
                .catch(() => res.status(500).end());
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
FileUploadController.publicPath = serverConfig_1.default.FILE_STORAGE.PATH_TO_PUBLIC;
FileUploadController.maxFileSize = serverConfig_1.default.FILE_STORAGE.MAX_FILE_SIZE;
exports.fileUploaderController = new FileUploadController();
