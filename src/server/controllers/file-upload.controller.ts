import * as fs from "fs";
import * as path from "path";
import * as multiparty from "multiparty";
import * as rimraf from "rimraf";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { FileStorageModel } from "../models";
import ServerConfig from "../serverConfig";
import { JsonAPI, IJsonAPISpec, IResource, moveFileAsync, isThisObjectSync, getResourceUrl } from "../services";
import {
    IResponseData,
    IMultipartyParsedFields,
    IMultipartyParsedFiles,
    IFileEntity,
    IFileDbProps } from "../interfaces";

class FileUploadController {
    static fileInputName = "qqfile";
    static pathToStorage = ServerConfig.FILE_STORAGE.PATH_TO_STORAGE; // path.resolve(__dirname, "../fileUploads");
    static maxStorageSize = ServerConfig.FILE_STORAGE.MAX_STORAGE_SIZE; // 30000 * 1024;

    static publicPath = ServerConfig.FILE_STORAGE.PATH_TO_PUBLIC; // path.resolve(__dirname, "../public/offers");
    static maxFileSize = ServerConfig.FILE_STORAGE.MAX_FILE_SIZE;

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
    private _moveUploadedFile(file: IFileEntity, fileStorageMongooseDoc: Document, success: () => void, failure: () => void) {

        const destinationFile = path.resolve(FileUploadController.pathToStorage, file.storageFilename);
        const sourceStream = fs.createReadStream(file.path);
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
                    .pipe(destStream);
    }
    private _onSimpleUpload(fields: IMultipartyParsedFields, file: IFileEntity, responseData: IResponseData, fileStorageMongooseDoc: Document, res: Response, req: Request) {
        const{ files } = <any>fileStorageMongooseDoc;

        const fileNameWithExtension = file.originalFilename.toString();
        file.storageFilename = fileNameWithExtension;
        file.uuid = fields.qquuid.toString();
        if ( !this._isFileNameUnique(files, fileNameWithExtension) ) {
            const [ fileName, fileExtension ] = fileNameWithExtension.split(".");
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
                                    self: `${getResourceUrl(req)}${this._serveDestHelper(false)}${file.storageFilename}`
                                }
                            },
                            success: true
                        });
                        res.send(responseData);
                    },
                    () => {
                        responseData.error = "Problem copying the file!";
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
                const { fileSize, storageFilename, isInPublic, _id } = SelectedFileEntity;
                return this._deleteFileHelper({fileSize, storageFilename, isInPublic, _id}, res);

            }catch (err) {
                res.status(500).end();
            }
        };
    }
    private _deleteFileHelper({ isInPublic, storageFilename, fileSize, _id }: { isInPublic: boolean, storageFilename: string, fileSize: number, _id: string }, res: Response) {
        const { pathToStorage, publicPath } = FileUploadController;
        const PathToDelete = isInPublic ? path.resolve(publicPath, storageFilename) : path.resolve(pathToStorage, storageFilename);
        return rimraf(PathToDelete, err => {
                if (err) {
                    return res.status(500).end();
                }
            return FileStorageModel.findByIdAndUpdate(ServerConfig.FILE_STORAGE.DB_ID, {
                    $inc: { currentStorageSize: -fileSize },
                    $pull: { files: { _id } }
                })
                .then(() => res.status(204).end())
                .catch(() => res.status(500).end());
        });
    }
    // private _endPointStartUrl(req: Request) {
    //     return req.protocol + "://" + req.get("host");
    // }
    private _serveDestHelper(isInPublic: boolean) {
        return isInPublic ? ServerConfig.FILE_STORAGE.SERVED_PUBLIC_PATH : ServerConfig.FILE_STORAGE.SERVED_STORAGE_PATH;
    }
    fetchStoreController_JsonAPI() {
        return (...args: Array<any>) => {
            const [ req, res ] = args;
            if (!JsonAPI.validateRequest(req, res)) return;

            return FileStorageModel.findById(ServerConfig.FILE_STORAGE.DB_ID)
                                    .select("-_id files")
                                    .then(({ files }: any) => {
                                        const responseData: IJsonAPISpec = {
                                            links: {
                                                self:  getResourceUrl(req) + req.originalUrl
                                            },
                                            data: []
                                        };
                                        files.forEach(({ _id, fileSize, storageFilename, isInPublic }: any) => {
                                            (<IResource[]>responseData.data).push(
                                                {
                                                    type: "files",
                                                    id: _id,
                                                    attributes: {
                                                        fileSize,
                                                        isInPublic,
                                                        fileName: storageFilename
                                                    },
                                                    links: {
                                                        self: `${getResourceUrl(req)}${this._serveDestHelper(isInPublic)}${storageFilename}`
                                                    }
                                                }
                                            );
                                        });

                                        JsonAPI.sendData(responseData, res);
                                    })
                                    .catch(() => res.status(500).end());
        };
    }
    downloadFileAsync(req: Request, res: Response) {
        const { pathToStorage, publicPath } = FileUploadController;
        if (req.method === "GET") {
                const { query= {} } = req;
                const { file } = query;

                return res.download(query.public === "true" ? path.resolve(publicPath, file) : path.resolve(pathToStorage, file), file, err => {
                    if (err && !res.headersSent) {
                        res.status(500).end();
                    }
                });
            }
    }
    actionFile_JsonAPI() {
        return (req: Request, res: Response) => {
            if (!JsonAPI.validateRequest(req, res)) return;

            if (!isThisObjectSync(req, req.body, req.body.data, req.body.data.attributes, req.body.meta)) {
                return res.status(403).end();
            }
            const { data: { id, type, attributes: { fileName, isInPublic, fileSize } }, meta: { ACTION, newName } } = req.body;

            const { pathToStorage, publicPath } = FileUploadController;
            let PathFrom: string;
            let PathTo: string;
            let DB_updateSet: { $set: { [key: string]: any } };
            let responseData: IJsonAPISpec = { data: { id, type } };
            if (ACTION === "MOVE_TO_PUBLIC" || ACTION === "MOVE_TO_STORE") {
                    if (isInPublic) {
                        PathFrom = path.resolve(pathToStorage, fileName);
                        PathTo = path.resolve(publicPath, fileName);
                    }else {
                        PathFrom = path.resolve(publicPath, fileName);
                        PathTo = path.resolve(pathToStorage, fileName);
                    }
                DB_updateSet = { $set: { "files.$.isInPublic": isInPublic } };
                responseData = Object.assign(responseData, { links: { self: `${getResourceUrl(req)}${this._serveDestHelper(isInPublic)}${fileName}` } });

            }else if (ACTION === "RENAME") {
                if (isInPublic) {
                    PathFrom = path.resolve(publicPath, fileName);
                    PathTo = path.resolve(publicPath, newName);
                }else {
                    PathFrom = path.resolve(pathToStorage, fileName);
                    PathTo = path.resolve(pathToStorage, newName);
                }

                DB_updateSet = { $set: { "files.$.storageFilename": newName } };
                (<IResource>responseData.data).attributes = { fileName: newName };
            }else /*if (ACTION === "DELETE")*/ {
                return this._deleteFileHelper({fileSize, storageFilename: fileName, isInPublic, _id: id}, res);
            }

            return moveFileAsync(PathFrom, PathTo)
                            .then(() => FileStorageModel.update({ _id: ServerConfig.FILE_STORAGE.DB_ID, "files._id": id }, DB_updateSet))
                            .then(({ ok, nModified, n }: any) => {
                                if (ok && nModified && n) {
                                    return JsonAPI.sendData(responseData, res);
                                }
                                throw new Error("Fail to update");
                            })
                            .catch(() => res.status(500).end());
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
*/

