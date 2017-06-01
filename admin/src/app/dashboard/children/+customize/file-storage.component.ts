import { FileStorageBasic, filesUrl } from './file-storage-basic.class';
import { Component, OnInit, DoCheck, ViewChild, ElementRef, Injector } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IFileStoragePortResponse, IFileAttr } from 'app/Interfaces';

@Component({
  selector: 'app-file-storage',
  templateUrl: 'file-storage.component.html',
  styleUrls: ['file-storage.component.css']
})
export class FileStorageComponent extends FileStorageBasic implements OnInit, DoCheck {
  static files: IFileStoragePortResponse;
  private _focusResolveLink: () => void;
  $this: FileStorageComponent;
  tabs = ['file storage', 'public files', 'offers'];
  menuModel = [
      {
          name: 'Move to Storage',
          ico: 'storage',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.MoveFile(file, 'S');
          }
      },
      {
          name: 'Move to Public',
          ico: 'accessibility',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.MoveFile(file, 'P');
          }
      },
      {
          name: 'Move to Offers',
          ico: 'announcement',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.MoveFile(file, 'O');
          }
      },
      {
          name: 'Rename',
          ico: 'loop',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.RenameFile(file);
          }
      },
      {
          name: 'Delete',
          ico: 'delete_forever',
          action(this: FileStorageComponent, file: IFileAttr, index: number) {
            this.DeleteFile(file, index);
          }
      },
      {
          name: 'Download',
          ico: 'get_app',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.DownloadFile(file);
          }
      }
  ];
  blurResolveLink: () => void;

  @ViewChild('input') inputRef: ElementRef;

  constructor(domSanitizer: DomSanitizer, injector: Injector) {
      super(domSanitizer, injector);
      this.$this = this;
   }
  ngDoCheck() {
    const { inputRef, _isRequestSent, _focusResolveLink } = this;
    if (inputRef && !_isRequestSent && typeof _focusResolveLink === 'function') {
        _focusResolveLink();
    }
  }

  isEmpty(i: number) {
      const flag: 'S' | 'P' | 'O' = i === 0 ? 'S' : i === 1 ? 'P' : 'O';
      for (const { attributes: { locationFlag } } of this.filesResponse.data) {
        if (flag === locationFlag) {
            return false;
        }
      }
      return true;
  }
  ngOnInit() {
    this._sanitizeTemplate();
    this._onFileStorageActive();
    if (FileStorageComponent.files) {
        return this.filesResponse = FileStorageComponent.files;
    }

    this._getResource(jsRes => FileStorageComponent.files = this.filesResponse = jsRes, filesUrl);
  }
  getMenuArray(indexOfTab: number) {
    return this.menuModel.filter((item, i) => indexOfTab !== i);
  }
  MoveFile(file: IFileAttr, newLocationFlag: 'S' | 'O' | 'P') {
    const ACTION = 'MOVE';
    return this._requestSender(file, ACTION, newLocationFlag);
  }

  RenameFile(file: IFileAttr) {
    this.renameFileFields.fileId = file.id;
    const splitedFileArr = file.attributes.fileName.split('.');
    this.renameFileFields.fileExt = splitedFileArr.pop();
    this.renameFileFields.modelFileName = splitedFileArr.join('.');

    const[focusPromise, blurPromise] = this._createDefersOnRename();
    focusPromise.then(() => {
        this.inputRef.nativeElement.focus();
        delete this._focusResolveLink;
    });
    blurPromise.then(() => {
        this._onInputBlur(file);
        delete this.blurResolveLink;
    });
  }
  DeleteFile(file: IFileAttr, index: number) {
    const ACTION = 'DELETE';
    this._requestSender(file, ACTION, index);
  }
  private _onInputBlur(file: IFileAttr) {
    if (this._isRequestSent) {
        return;
    }
    const{ modelFileName, fileExt } = this.renameFileFields;
    const compiledFileName = `${modelFileName}.${fileExt}`;
    if (file.attributes.fileName === compiledFileName) {
        return this.renameFileFields.cancelAll();
    }
    for (const { attributes: { fileName } } of this.filesResponse.data) {
        if (fileName === compiledFileName) {
            this.renameFileFields.cancelAll();
            return this._showErrMess('File name must to be unique in File Storage!');
        }
    }
    const ACTION = 'RENAME';
    this._requestSender(file, ACTION);
  }
  DownloadFile(file: IFileAttr) {
    this._progressBarService.autoStop();
    this.DOWNLOAD(file);
  }
  displayFileName(file: IFileAttr) {
    const{ modelFileName, fileExt, fileId } = this.renameFileFields;
    const{ id, attributes: { fileName } } = file;
    if (id === fileId) {
        const compiledFileName = `${modelFileName}.${fileExt}`;
        return compiledFileName === '.' ? fileName : compiledFileName;
    }
    return fileName;
  }
  private _createDefersOnRename() {
    return [this._promiseFactory('_focusResolveLink'), this._promiseFactory('blurResolveLink')];
  }
  private _promiseFactory(propertyName: string) {
      return new Promise(resolve => this[propertyName] = resolve);
  }

}
