import { FileStorageBasic } from './file-storage-basic.class';
import { Component, OnInit, DoCheck, ViewChild, ElementRef, Injector } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IFileStoragePortResponse, IFileAttr } from 'app/Interfaces';

@Component({
  selector: 'app-file-storage',
  templateUrl: 'file-storage.component.html',
  styleUrls: ['file-storage.component.css']
})
export class FileStorageComponent extends FileStorageBasic implements OnInit, DoCheck {

  private _focusResolveLink: () => void;
  $this: FileStorageComponent;

  menuModel: Array<IMenu> = [
      {
          name: 'Move to Storage',
          ico: 'storage',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.MoveFile(file, 'S');
          },
          flags: ['P', 'O']
      },
      {
          name: 'Move to Public',
          ico: 'accessibility',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.MoveFile(file, 'P');
          },
          flags: ['S', 'O']
      },
      {
          name: 'Move to Offers',
          ico: 'announcement',
          action(this: FileStorageComponent, file: IFileAttr) {
            this.MoveFile(file, 'O');
          },
          flags: ['S', 'P'],
          _offers: true
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

  constructor(injector: Injector) {
      super(injector);
      this.$this = this;
   }
  ngDoCheck() {
    const { inputRef, _isRequestSent, _focusResolveLink } = this;
    if (inputRef && !_isRequestSent && typeof _focusResolveLink === 'function') {
        _focusResolveLink();
    }
  }

  fileSorter({ attributes: { fileName, locationFlag } }: IFileAttr, tab: ITab) {
    const fileExt = this._getFileExt(fileName);
    const { images, media, docs } = this.allowedFileTypes;
    if (
        (tab.name === this.tabs[0].name && locationFlag === this.tabs[0].flag) ||
        (tab.name === this.tabs[1].name && locationFlag === this.tabs[1].flag && images.exts.includes(fileExt)) ||
        (tab.name === this.tabs[2].name && locationFlag === this.tabs[2].flag && images.exts.includes(fileExt)) ||
        (tab.name === this.tabs[3].name && locationFlag === this.tabs[3].flag && media.exts.includes(fileExt)) ||
        (tab.name === this.tabs[4].name && locationFlag === this.tabs[4].flag && docs.exts.includes(fileExt))
        ) {
        return true;
    }
    return false;
  }
  isEmpty(tab: ITab) {
    return this._FTP_Empty_flags[tab.name];
  }
  ngOnInit() {
    this._sanitizeTemplate();
    this._onFileStorageActive();
    this._fetchAllFiles()
            .then((files: IFileAttr[]) => this._setFTP_Flags_IsEmpty(files));
  }

  getMenuArray(tab: ITab, { attributes: { fileName, locationFlag } }: IFileAttr) {
    const fileExt = this._getFileExt(fileName);
    const { images, media, docs } = this.allowedFileTypes;
    return this.menuModel.filter((item, i) => {
        if ( (media.exts.includes(fileExt) ||
            docs.exts.includes(fileExt)) &&
            item._offers ) {
            return false;
        }
        if ( item.flags && !item.flags.includes(locationFlag)  ) {
            return false;
        }
        return true;
    });

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

interface IMenu {
    name: string;
    action: (...arg: Array<any>) => void;
    ico: string;
    flags?: Array<'P' | 'S' | 'O'>;
    _offers?: true;
}
interface ITab {
    name: string;
    flag: 'P' | 'S' | 'O';
}
