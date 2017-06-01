import { Response, RequestMethod } from '@angular/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IFileStoragePortResponse, IFileAttr, IFileEntity } from 'app/Interfaces';
import { async } from 'rxjs/scheduler/async';
import { BasicComponentClass } from './basic-component.class';
declare const System: any;

export const filesUrl = '/api/files';

export class FileStorageBasic extends BasicComponentClass {
    private _downloadFilesURL = '/api/download';
    private UPLOADER: any;
    private qq: any;
    private simpleThumbnail: SafeHtml;

    filesResponse: IFileStoragePortResponse;


    protected renameFileFields = {
       modelFileName: '',
       fileId: '',
       fileExt: '',
       cancelAll() {
           this.modelFileName = this.fileId = this.fileExt = '';
       }
    };
    constructor(private _domSanitizer: DomSanitizer, injector) {
        super(injector);
    }
    protected MOVE(file: IFileAttr, response: Response, moveToFlag: 'S' | 'P' | 'O') {
        const{ status, ok } = response;
        const dataResponse = response.json();
        if (ok && status === 200 && file.id === dataResponse.data.id) {
            file.attributes.locationFlag = moveToFlag;
            file.links.self = dataResponse.links.self;
        }
    }
    protected RENAME(file: IFileAttr, response: Response) {
        const{ status, ok } = response;
        if (ok && status === 204) {
            const{ modelFileName, fileExt } = this.renameFileFields;
            file.attributes.fileName = `${modelFileName}.${fileExt}`;
            this._notifyQQ(file, 'RENAME');
        }
    }
    protected DELETE(file: IFileAttr, response: Response, index: number) {
        const{ status, ok } = response;
        if (ok && status === 204) {
            this.filesResponse.data.splice(index, 1);

            this._notifyQQ(file, 'DELETE');
        }
    }
    protected DOWNLOAD(file: IFileAttr) {
        const { id, attributes: { fileName, locationFlag } } = file;

        return window.location.href = `${this._downloadFilesURL}?id=${id}&file=${fileName}&location=${locationFlag}`;
    }

    protected _requestSender(file: IFileAttr, ACTION: string, metaInfo?: number | 'S' | 'P' | 'O') {
        if (this._isRequestSent) {
            return;
        }
        this._isRequestSent = true;

        const{ id, attributes: { fileName, locationFlag, fileSize } } = file;
        let baseObject = { fileName, locationFlag };
        let meta = { ACTION };
        let method = RequestMethod.Patch;

        switch (ACTION) {
            case 'MOVE':
                meta = Object.assign(meta, { newLocation: metaInfo });
                break;
            case 'RENAME':
                meta = Object.assign(meta, { newName: `${this.renameFileFields.modelFileName}.${this.renameFileFields.fileExt}` });
                break;
            case 'DELETE': {
                baseObject = Object.assign(baseObject, { fileSize });
                method = RequestMethod.Delete;
            }
        }
        if (ACTION !== 'RENAME') {
            this._progressBarService.emmiter.emit(true);
        }
        return this._patchRequest(`${filesUrl}/${file.id}`, { id, type: 'files', attr: baseObject, meta })
                .then((response: Response) => this[ACTION](file, response, metaInfo))
                .catch(() => this._showErrMess(0))
                .then(() => {
                    this._isRequestSent = false;
                    this.renameFileFields.cancelAll();
                    if (ACTION !== 'RENAME') {
                        this._progressBarService.emmiter.emit(false);
                    }
                });
    }
    private _notifyQQ(renamedFileProps: IFileAttr, action: 'RENAME' | 'DELETE') {
        const fileQQArray = this.UPLOADER.getUploads({status: this.qq.status.UPLOAD_SUCCESSFUL});
        for (const { id, uuid, status } of fileQQArray) {
            if (uuid === renamedFileProps.id && status === 'upload successful') {
                switch (action) {
                    case 'RENAME':
                    this.UPLOADER.setName(id, renamedFileProps.attributes.fileName);
                    break;
                    case 'DELETE':
                    this.UPLOADER.cancel(id);
                }
            }
        }
    }
    private _addFileOnComplete__QQ(uploadedFileProps: IFileEntity) {
        this.filesResponse.data.push(uploadedFileProps);
    }
    private _removeFileOnDelete__QQ(deletedPayload: Array<any>) {
        for (const deletedItem of deletedPayload) {
            const{ uuid, status } = deletedItem;
            if (uuid && status === 'deleted') {
                this.filesResponse.data.forEach((file, i, arrayFiles) => {
                    if (file.id === uuid) {
                        arrayFiles.splice(i, 1);
                    }
                });
            }
        }
    }
    protected _onFileStorageActive() {
        const $this = this;
        System.import('file-uploader.js').then(qq => {
            this.qq = qq;
            this.UPLOADER = new qq.FineUploader({
                    debug: true,
                    element: document.getElementById('fine-uploader'),
                    template: 'qq-simple-thumbnails-template',
                    thumbnails: {
                        placeholders: {
                            waitingPath: '/images/file-uploader/waiting-generic.png',
                            notAvailablePath: '/images/file-uploader/not_available-generic.png'
                        }
                    },
                    request: {
                        endpoint: '/api/uploads/'
                    },
                    deleteFile: {
                        enabled: true,
                        endpoint: '/api/uploads'
                    },
                    retry: {
                        enableAuto: true
                    },
                    validation: {
                        acceptFiles: 'image/jpeg,image/png,image/gif,image/tiff,image/bmp',
                        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'bmp']
                    },
                    callbacks: {
                        onError: (id, name, errorReason, xhrOrXdr) => {
                            this._showErrMess(errorReason);
                        },
                        onComplete(id, name, responseJSON, xhr) {
                            this.setName(id, responseJSON.data.attributes.fileName);
                            if (responseJSON.success) {
                                $this._addFileOnComplete__QQ(responseJSON.data);
                            }
                        },
                        onDeleteComplete(...args: Array<any>) {
                            const [, , isError] = args;
                            if (!isError) {
                                $this._removeFileOnDelete__QQ(
                                    this.getUploads({status: qq.status.DELETED})
                                );
                                if (this.getNetUploads() === 0) {
                                    this.reset();
                                }
                            }
                        },
                        onCancel(id, name) {
                            const dropArea = document.querySelector('.qq-upload-list-selector');
                            async.schedule(() => {
                                if (!dropArea.firstElementChild) {
                                    this.reset();
                                }
                            }, 50);

                        },
                        onSubmitDelete() {
                            if ($this._isRequestSent) {
                                return false;
                            }
                        }
                    }
                });
            this._f_u__Patch(this.UPLOADER);
        }).catch(err => this._showErrMess(err.message));
    }
    protected _sanitizeTemplate() {
        // tslint:disable-next-line:max-line-length
        const styles = `.qq-btn{box-shadow:0 1px 1px rgba(255,255,255,.37) inset,1px 0 1px rgba(255,255,255,.07) inset,0 1px 0 rgba(0,0,0,.36),0 -2px 12px rgba(0,0,0,.08) inset;padding:3px 4px;border:1px solid #ccc;border-radius:2px;color:inherit;background-color:#fff}.qq-upload-continue,.qq-upload-delete,.qq-upload-pause{display:inline}.qq-upload-delete{background-color:#e65c47;color:#fafafa;border-color:#dc523d;text-shadow:0 1px 1px rgba(0,0,0,.55)}.qq-upload-delete:hover{background-color:#f56b56}.qq-upload-cancel{background-color:#f5d7d7;border-color:#e6c8c8}.qq-upload-cancel:hover{background-color:#ffe1e1}.qq-upload-retry{background-color:#ebf6e0;border-color:#d2ddc7}.qq-upload-retry:hover{background-color:#f7ffec}.qq-upload-continue,.qq-upload-pause{background-color:#00abc7;color:#fafafa;border-color:#2dadc2;text-shadow:0 1px 1px rgba(0,0,0,.55)}.qq-upload-continue:hover,.qq-upload-pause:hover{background-color:#0fbad6}.qq-upload-button{display:inline;width:105px;margin-bottom:10px;padding:7px 10px;text-align:center;float:left;background:#00abc7;color:#fff;border-radius:2px;border:1px solid #2dadc2;box-shadow:0 1px 1px rgba(255,255,255,.37) inset,1px 0 1px rgba(255,255,255,.07) inset,0 1px 0 rgba(0,0,0,.36),0 -2px 12px rgba(0,0,0,.08) inset}.qq-upload-button-hover{background:#33b6cc}.qq-upload-button-focus{outline:1px dotted #000}.qq-uploader{position:relative;min-height:200px;max-height:490px;overflow-y:hidden;width:inherit;border-radius:6px;background-color:#fdfdfd;border:1px dashed #ccc;padding:20px}.qq-uploader:before{content:attr(qq-drop-area-text) " ";position:absolute;font-size:200%;left:0;width:100%;text-align:center;top:45%;opacity:.25}.qq-upload-drop-area,.qq-upload-extra-drop-area{position:absolute;top:0;left:0;width:100%;height:100%;min-height:30px;z-index:2;background:#f9f9f9;border-radius:4px;border:1px dashed #ccc;text-align:center}.qq-upload-drop-area span{display:block;position:absolute;top:50%;width:100%;margin-top:-8px;font-size:16px}.qq-upload-extra-drop-area{position:relative;margin-top:50px;font-size:16px;padding-top:30px;height:20px;min-height:40px}.qq-upload-drop-area-active{background:#fdfdfd;border-radius:4px;border:1px dashed #ccc}.qq-upload-list{margin:0;padding:0;list-style:none;max-height:450px;overflow-y:auto;box-shadow:0 1px 0 rgba(15,15,50,.14);clear:both}.qq-upload-list li{margin:0;padding:9px;line-height:15px;font-size:16px;color:#424242;background-color:#f6f6f6;border-top:1px solid #fff;border-bottom:1px solid #ddd}.qq-upload-list li:first-child{border-top:none}.qq-upload-list li:last-child{border-bottom:none}.qq-upload-cancel,.qq-upload-continue,.qq-upload-delete,.qq-upload-failed-text,.qq-upload-file,.qq-upload-pause,.qq-upload-retry,.qq-upload-size,.qq-upload-spinner{margin-right:12px;display:inline}.qq-upload-file{vertical-align:middle;display:inline-block;width:300px;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;height:18px}.qq-upload-spinner{display:inline-block;background:url(/images/file-uploader/loading.gif);width:15px;height:15px;vertical-align:text-bottom}.qq-drop-processing{display:block}.qq-drop-processing-spinner{display:inline-block;background:url(/images/file-uploader/processing.gif);width:24px;height:24px;vertical-align:text-bottom}.qq-upload-cancel,.qq-upload-continue,.qq-upload-delete,.qq-upload-pause,.qq-upload-retry,.qq-upload-size{font-size:12px;font-weight:400;cursor:pointer;vertical-align:middle}.qq-upload-status-text{font-size:14px;font-weight:700;display:block}.qq-upload-failed-text{display:none;font-style:italic;font-weight:700}.qq-upload-failed-icon{display:none;width:15px;height:15px;vertical-align:text-bottom}.qq-upload-fail .qq-upload-failed-text{display:inline}.qq-upload-retrying .qq-upload-failed-text{display:inline}.qq-upload-list li.qq-upload-success{background-color:#ebf6e0;color:#424242;border-bottom:1px solid #d3ded1;border-top:1px solid #f7fff5}.qq-upload-list li.qq-upload-fail{background-color:#f5d7d7;color:#424242;border-bottom:1px solid #decaca;border-top:1px solid #fce6e6}.qq-progress-bar{display:block;display:block;background:#00abc7;width:0;height:15px;border-radius:6px;margin-bottom:3px}.qq-total-progress-bar{height:25px;border-radius:9px}.qq-total-progress-bar-container{margin-left:9px;display:inline;float:right;width:500px}INPUT.qq-edit-filename{position:absolute;opacity:0;z-index:-1}.qq-upload-file.qq-editable{cursor:pointer;margin-right:4px}.qq-edit-filename-icon.qq-editable{display:inline-block;cursor:pointer}INPUT.qq-edit-filename.qq-editing{position:static;height:28px;padding:0 8px;margin-right:10px;margin-bottom:-5px;border:1px solid #ccc;border-radius:2px;font-size:16px;opacity:1}.qq-edit-filename-icon{display:none;background:url(/images/file-uploader/edit.gif);width:15px;height:15px;vertical-align:text-bottom;margin-right:16px}.qq-hide{display:none}.qq-thumbnail-selector{vertical-align:middle;margin-right:12px}.qq-uploader DIALOG{display:none}.qq-uploader DIALOG[open]{display:block}.qq-uploader DIALOG{display:none}.qq-uploader DIALOG[open]{display:block}.qq-uploader DIALOG .qq-dialog-buttons{text-align:center;padding-top:10px}.qq-uploader DIALOG .qq-dialog-buttons BUTTON{margin-left:5px;margin-right:5px}.qq-uploader DIALOG .qq-dialog-message-selector{padding-bottom:10px}.qq-uploader DIALOG::backdrop{background-color:rgba(0,0,0,.7)}`;
        const template = `
            <style>${styles}</style>
            <script type="text/template" id="qq-simple-thumbnails-template">
                <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
                    <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
                        <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" 
                        class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
                    </div>
                    <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
                        <span class="qq-upload-drop-area-text-selector"></span>
                    </div>
                    <div class="qq-upload-button-selector qq-upload-button">
                        <div>Upload a file</div>
                    </div>
                    <span class="qq-drop-processing-selector qq-drop-processing">
                        <span>Processing dropped files...</span>
                        <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
                    </span>
                    <ul class="qq-upload-list-selector qq-upload-list" aria-live="polite" aria-relevant="additions removals">
                        <li>
                            <div class="qq-progress-bar-container-selector">
                                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" 
                                class="qq-progress-bar-selector qq-progress-bar"></div>
                            </div>
                            <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                            <img class="qq-thumbnail-selector" qq-max-size="100" qq-server-scale>
                            <span class="qq-upload-file-selector qq-upload-file"></span>
                            <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
                            <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
                            <span class="qq-upload-size-selector qq-upload-size"></span>
                            <button type="button" id="f-u__cancelBtn" 
                                class="qq-btn qq-upload-cancel-selector qq-upload-cancel">Cancel</button>
                            <button type="button" id="f-u__retryBtn" 
                                class="qq-btn qq-upload-retry-selector qq-upload-retry">Retry</button>
                            <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">Delete</button>
                            <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
                        </li>
                    </ul>

                    <dialog class="qq-alert-dialog-selector">
                        <div class="qq-dialog-message-selector"></div>
                        <div class="qq-dialog-buttons">
                            <button type="button" class="qq-cancel-button-selector">Close</button>
                        </div>
                    </dialog>

                    <dialog class="qq-confirm-dialog-selector">
                        <div class="qq-dialog-message-selector"></div>
                        <div class="qq-dialog-buttons">
                            <button type="button" class="qq-cancel-button-selector">No</button>
                            <button type="button" class="qq-ok-button-selector">Yes</button>
                        </div>
                    </dialog>

                    <dialog class="qq-prompt-dialog-selector">
                        <div class="qq-dialog-message-selector"></div>
                        <input type="text">
                        <div class="qq-dialog-buttons">
                            <button type="button" class="qq-cancel-button-selector">Cancel</button>
                            <button type="button" class="qq-ok-button-selector">Ok</button>
                        </div>
                    </dialog>
                </div>
            </script>
            `;

        this.simpleThumbnail = this._domSanitizer.bypassSecurityTrustHtml(template);
    }
    private _f_u__Patch(fileUploaderLink) {
        // Patch for cancel / retry buttons
        function onClickBtnCancel(e) {
            const target = e.target;
            const fileId = target.parentNode && target.parentNode.getAttribute('qq-file-id');
            if (target.id && target.id === 'f-u__cancelBtn') {
                fileUploaderLink.cancel(+fileId);
            }else if (target.id && target.id === 'f-u__retryBtn') {
                fileUploaderLink.retry(+fileId);
            }
        }
        window.addEventListener('click', onClickBtnCancel);

    }
}
