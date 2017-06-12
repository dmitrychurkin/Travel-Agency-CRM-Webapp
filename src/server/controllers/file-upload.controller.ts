import * as fs from "fs";
import * as path from "path";
import * as multiparty from "multiparty";
import * as rimraf from "rimraf";
import { Application } from "../app";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { FileStorageModel } from "../models";
import ServerConfig from "../serverConfig";
import { JsonAPI, IJsonAPISpec, IResource, moveFileAsync, getResourceUrl } from "../services";
import {
    IResponseData,
    IMultipartyParsedFields,
    IMultipartyParsedFiles,
    IFileEntity,
    IFileDbProps } from "../interfaces";

class FileUploadController {
    static fileInputName = "qqfile";
    static pathToStorage = ServerConfig.FILE_STORAGE.PATH_TO_STORAGE; // path.resolve(__dirname, "../fileUploads");
    static maxStorageSize = ServerConfig.FILE_STORAGE.MAX_STORAGE_SIZE; // 100000 * 1024;

    static offersPath = ServerConfig.FILE_STORAGE.PATH_TO_OFFERS; // path.resolve(__dirname, "../public/offers");
    // static publicPath__IMAGES = ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC_IMAGES;
    // static publicPath__MEDIA = ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC_MEDIA;
    // static publicPath__DOCS = ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC_DOCS;
    static maxFileSize = ServerConfig.FILE_STORAGE.MAX_FILE_SIZE;

    static fileExtensionRelation = [
        {
            extensions: ["jpg", "jpeg", "png", "gif", "tiff", "bmp", "jfif"],
            location: ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC_IMAGES,
            serveLocation: ServerConfig.FILE_STORAGE.SERVED_PUBLIC_IMAGES
        },
        {
            extensions: ["avi", "mp4", "mpeg", "webm", "ogv", "ogg", "mp3", "weba", "wav", "oga", "aac"],
            location: ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC_MEDIA,
            serveLocation: ServerConfig.FILE_STORAGE.SERVED_PUBLIC_MEDIA
        },
        {
            extensions: ["pdf", "txt", "doc", "docx"],
            location: ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC_DOCS,
            serveLocation: ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC_DOCS
        }
    ];

    private _failWithTooBigFile(responseData: IResponseData, res: Response) {
        responseData.error = "Too big!";
        responseData.preventRetry = true;
        res.send(responseData);
    }
    private _isValidFileSize(size: number) {
        const { maxFileSize } = FileUploadController;
        return maxFileSize === 0 || size < maxFileSize;
    }
    private _isFileNameUnique(files: Array<IFileDbProps>, fileNameWithExtension: string): boolean {
        for (const file of files) {
            if (file.storageFilename === fileNameWithExtension) {
                return false;
            }
        }
        return true;
    }
    private _moveUploadedFile(file: IFileEntity, fileStorageMongooseDoc: Document, success: () => void, failure: (e?: Error) => void) {
        const destinationFile = path.resolve(FileUploadController.pathToStorage, file.storageFilename);
        /*const sourceStream = fs.createReadStream(file.path);
        const destStream = fs.createWriteStream(destinationFile);
        sourceStream
                    .on("error", (err: Error) => {
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
                    .pipe(destStream);*/
        moveFileAsync(file.path, destinationFile)
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
    private _onSimpleUpload(fields: IMultipartyParsedFields, file: IFileEntity, responseData: IResponseData, fileStorageMongooseDoc: Document, res: Response, req: Request) {
        const{ files } = <any>fileStorageMongooseDoc;

        const fileNameWithExtension = fields.qqfilename.toString() || file.originalFilename.toString();
        file.storageFilename = fileNameWithExtension;
        file.uuid = fields.qquuid.toString();
        if ( !this._isFileNameUnique(files, fileNameWithExtension) ) {
            const [ fileName, fileExtension ] = fileNameWithExtension.split(".");
            file.storageFilename = `${fileName}_${file.uuid}.${fileExtension}`;
        }

        if (this._isValidFileSize(file.size)) {
            this._moveUploadedFile(file, fileStorageMongooseDoc, () => {
                        let serveDestination: string;
                        try {
                            serveDestination = this._serveDestHelper("S", file.storageFilename);
                        }catch (e) {
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
                                    self: `${getResourceUrl(req)}${serveDestination}${file.storageFilename}`
                                }
                            },
                            success: true
                        });
                        res.send(responseData);
                    },
                    (e: Error) => {
                        responseData.error = (e && e.message) || "Problem copying the file!";
                        res.send(responseData);
                    });
        }else {
            this._failWithTooBigFile(responseData, res);
        }
    }

    onUploadController() {
        return (req: Request, res: Response) => {
            const form = new multiparty.Form();

            form.parse(req, async (err, fields: IMultipartyParsedFields, files: IMultipartyParsedFiles) => {
                const responseObject: IResponseData = {success: false};
                try {
                    res.set("Content-Type", "text/plain");

                    const { qqtotalfilesize } = fields;
                    const fileSize = + qqtotalfilesize.toString();
                    const FileStorageDocument: any = await FileStorageModel.findById(ServerConfig.FILE_STORAGE.DB_ID)
                                                                        .select("currentStorageSize files")
                                                                        .exec();
                    const { currentStorageSize } = FileStorageDocument;

                    if (currentStorageSize + fileSize > FileUploadController.maxStorageSize) {
                        return res.send(Object.assign(responseObject, {error: "File size is too big", preventRetry: true}));
                    }
                    if (err) {
                        return res.send(Object.assign(responseObject, {error: err.message}));
                    }

                    return this._onSimpleUpload(fields, files[ FileUploadController.fileInputName ][0], responseObject, FileStorageDocument, res, req);

                }catch (err) {
                    return res.send(Object.assign(responseObject, {error: err.message}));
                }

            });
        };
    }
    onDeleteController() {
        return async (req: Request, res: Response) => {
            try {
                const uuid = req.params.uuid;
                const SelectedFileArray = await FileStorageModel.aggregate([{
                    $project: {
                        _id: 0,
                        currentStorageSize: 1,
                        fileNames: 1,
                        files: {
                            $filter: {
                                input: "$files",
                                as: "f",
                                cond: {
                                    $eq: [ "$$f._id", uuid ]
                                }
                            }
                        }
                    }
                }]).exec();

                const SelectedFileEntity = SelectedFileArray[0].files[0];
                if (SelectedFileEntity) {
                    const { fileSize, storageFilename, locationFlag, _id } = SelectedFileEntity;
                    return this._deleteFileHelper({fileSize, storageFilename, locationFlag, _id}, res);
                }
                return res.status(204).end();
            }catch (err) {
                res.status(500).end();
            }
        };
    }
    private _cacheSync(resultAfterUpdate: any) {
        let CACHE = Application.express.get("offers");
        const{ files, offers } = <any>resultAfterUpdate;
        if (!CACHE) {
            CACHE = {};
        }
        CACHE.files = files.filter((file: any) => file.locationFlag === "O");
        CACHE.offers = offers;
        Application.express.set("offers", CACHE);
    }
    private _getAppropriateLocation(fileName: string, isToServe= false) {
        for (const extensionGroup of FileUploadController.fileExtensionRelation) {
            if ( extensionGroup.extensions.includes( fileName.split(".")[1] ) ) {
                return isToServe ? extensionGroup.serveLocation : extensionGroup.location;
            }
        }
            throw new Error("Invalid file extension");
    }
    private _pathResolver(locationFlag: "S" | "P" | "O", storageFilename: string) {
        const { pathToStorage, offersPath } = FileUploadController;
        if (locationFlag === "S") {
            return path.resolve(pathToStorage, storageFilename);
        }else if (locationFlag === "P") {
            return path.resolve( this._getAppropriateLocation( storageFilename ), storageFilename );
        }
        return path.resolve(offersPath, storageFilename);
    }
    private _deleteFileHelper({ locationFlag , storageFilename, fileSize, _id }: { locationFlag: "S" | "P" | "O", storageFilename: string, fileSize: number, _id: string }, res: Response) {
        try {
            const PathToDelete = this._pathResolver(locationFlag, storageFilename);
            return rimraf(PathToDelete, err => {
                    if (err) {
                        return res.status(500).end();
                    }
                return FileStorageModel.findByIdAndUpdate(ServerConfig.FILE_STORAGE.DB_ID, {
                        $inc: { currentStorageSize: -fileSize },
                        $pull: { files: { _id } }
                    }, { new: true, select: "files offers -_id" })
                    .then((resultAfterUpdate: any) => {
                        this._cacheSync(resultAfterUpdate);
                        res.status(204).end();
                    })
                    .catch(() => res.status(500).end());
            });
        }catch (e) {
            res.status(500).end();
        }
    }

    private _serveDestHelper(locationFlag: "S" | "O" | "P", fileName: string) {
        const{ SERVED_OFFERS_PATH, SERVED_STORAGE_PATH } = ServerConfig.FILE_STORAGE;
        if (locationFlag === "O") {
            return SERVED_OFFERS_PATH;
        }else if (locationFlag === "S") {
            return SERVED_STORAGE_PATH;
        }
        return this._getAppropriateLocation(fileName, true);
    }
    fetchStoreController_JsonAPI() {
        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) return;
            if (Object.keys(req.query).length > 0) {
                const{ fields } = req.query;
                if (fields) {
                    switch (fields.locationFlag.toUpperCase()) {
                        case "P":
                            /*return FileStorageModel.aggregate({
                                                    $project: {
                                                        _id: 0,
                                                        files: {
                                                            $filter: {
                                                                input: "$files",
                                                                as: "file",
                                                                cond: { $eq: [ "$$file.locationFlag", "P" ] }
                                                            }
                                                        }
                                                    }
                                                })*/
                            return FileStorageModel.findById(ServerConfig.FILE_STORAGE.DB_ID)
                                                .select("files -_id")
                                                .then(({ files }: any) => {
                                                    const data: any = [];
                                                    files.forEach((file: any) => {
                                                        if ( file.locationFlag === "P" && FileUploadController.fileExtensionRelation[ fields.type ].extensions.includes(file.storageFilename.split(".")[1]) ) {
                                                            let serveDestination: string;
                                                            try {
                                                                serveDestination = this._serveDestHelper("P", file.storageFilename);
                                                            }catch (e) {
                                                                throw e;
                                                            }
                                                            data.push({
                                                                id: file._id,
                                                                type: "image",
                                                                links: {
                                                                    self: `${getResourceUrl(req)}${serveDestination}${file.storageFilename}`
                                                                }
                                                            });
                                                        }
                                                    });

                                                    JsonAPI.sendData({ data }, res);
                                                })
                                                .catch(() => res.status(500).end());
                    }
                }
            }
            return FileStorageModel.findById(ServerConfig.FILE_STORAGE.DB_ID)
                                    .select("-_id files offers")
                                    .then(({ files, offers}: any) => {
                                        let CACHE = Application.express.get("offers");

                                        const responseData: IJsonAPISpec = {
                                            links: {
                                                self:  getResourceUrl(req) + req.originalUrl
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
                                        files.forEach((file: any) => {
                                            const{ _id, fileSize, storageFilename, locationFlag } = file;
                                            if (CACHE.new && locationFlag === "O") {
                                                CACHE.files.push(file);
                                            }
                                            let serveDestination: string;
                                            try {
                                                serveDestination = this._serveDestHelper(locationFlag, storageFilename);
                                            }catch (e) {
                                                throw e;
                                            }
                                            (<IResource[]>responseData.data).push(
                                                {
                                                    type: "files",
                                                    id: _id,
                                                    attributes: {
                                                        fileSize,
                                                        locationFlag,
                                                        fileName: storageFilename
                                                    },
                                                    links: {
                                                        self: `${getResourceUrl(req)}${serveDestination}${storageFilename}`
                                                    }
                                                }
                                            );
                                        });
                                        if (CACHE.new) {
                                            delete CACHE.new;
                                            Application.express.set("offers", CACHE);
                                        }

                                        JsonAPI.sendData(responseData, res);
                                    })
                                    .catch(() => res.status(500).end());
        };
    }
    downloadFileAsync() {

        return (req: Request, res: Response) => {
            if (req && req.method === "GET" && req.query && req.query.file && req.query.location) {
                    const { file, location } = req.query;
                    let resolvedPath: string;
                    try {
                        resolvedPath = this._pathResolver(location, file);
                    }catch (e) {
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
        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) return;

            if (req && req.body && req.body.data && req.body.data.attributes && req.body.meta) {

                    const { data: { id, type, attributes: { fileName, locationFlag, fileSize } }, meta: { ACTION, newName, newLocation } } = req.body;

                    const { pathToStorage, offersPath } = FileUploadController;

                    const getPathHelper = (currentLocationFlag: "S" | "O" | "P", fileName: string) => {
                        let path: string;
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
                    let PathFrom: string;
                    let PathTo: string;
                    let DB_updateSet: { $set: { [key: string]: any } };

                    let responseData: IJsonAPISpec;
                    if (ACTION === "MOVE") {
                            let destPathFrom: string;
                            let destPathTo: string;
                            let serveDestination: string;
                            try {
                                destPathFrom = getPathHelper(locationFlag, fileName);
                                destPathTo = this._getAppropriateLocation(fileName);
                                serveDestination = this._serveDestHelper(newLocation, fileName);
                            }catch (e) {
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
                            links: { self: `${getResourceUrl(req)}${serveDestination}${fileName}` }
                        };

                    }else if (ACTION === "RENAME") {
                        let destPathFrom: string;
                        let destPathTo: string;
                        try {
                            destPathFrom = this._getAppropriateLocation(fileName);
                            destPathTo = this._getAppropriateLocation(newName);
                        }catch (e) {
                            return res.status(500).end();
                        }
                        switch (locationFlag) {
                            case "O": {
                                PathFrom = path.resolve(offersPath, fileName);
                                PathTo = path.resolve(offersPath, newName);
                            }
                            break;
                            case "P": {
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

                    }else /*if (ACTION === "DELETE")*/ {
                        return this._deleteFileHelper({fileSize, storageFilename: fileName, locationFlag, _id: id}, res);
                    }

                    return moveFileAsync(PathFrom, PathTo)
                                    .then(() => FileStorageModel.findOneAndUpdate({ _id: ServerConfig.FILE_STORAGE.DB_ID, "files._id": id }, DB_updateSet, { new: true, fields: "files offers -_id" }))
                                    .then((resultAfterUpdate) => {

                                        if (resultAfterUpdate) {
                                            this._cacheSync(resultAfterUpdate);
                                            return responseData ? JsonAPI.sendData(responseData, res) : res.status(204).end();
                                        }

                                        throw new Error("Fail to update");
                                    })
                                    .catch(() => res.status(500).end());
                }
                return res.status(403).end();
            };

    }

    serveRequestToStorage() {
        return (req: Request, res: Response) => {
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
export const fileUploaderController = new FileUploadController();

/*
Debug form.parse fields, files =>   { qquuid: [ '823d4c53-9be1-47b0-95e5-af18049e74d5' ],
  qqfilename: [ 'ranthilini.gif' ],
  qqtotalfilesize: [ '214523' ] } { qqfile:
   [ { fieldName: 'qqfile',
       originalFilename: 'ranthilini.gif',
       path: 'C:\\Users\\AACE~1\\AppData\\Local\\Temp\\OCxUeaR9BFtjwRREl3Lztxd5.gif',
       headers: [Object],
       size: 214523 } ] }

Debug form.parse => headers {
    'content-disposition': 'form-data; name="qqfile"; filename="BrianPrince-200w.jpg"',
    'content-type': 'image/jpeg'
}
*/

