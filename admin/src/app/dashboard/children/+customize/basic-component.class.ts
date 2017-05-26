import { MdDialog } from '@angular/material';
import { IModalData, ModalDialogComponent } from './modal-dialog.component';

export class BasicComponentClass {
    modalData: IModalData = { message: 'Please specify group name', placeholder: 'Group name' };

    notSpecifiedMessage = '[Not Specified]';

    constructor(private _dialog: MdDialog) {}
    protected _getModalMessage(subject: string) {
        return `Are you sure to delete ${subject}?`;
    }

    protected _isEditComplete<T>(modelIterableObject: Array<T>) {
        for (const item of modelIterableObject) {
            if (item) {
                return false;
            }
        }
        return true;
    }
    protected _cloneObj(obj: any) {
        const objStr = JSON.stringify(obj);
        return JSON.parse(objStr);
    }
    isNeedSaveChanges(source: string, current: { [key: string]: any }) {
        return source !== JSON.stringify(current);
    }
    // subject: 'contact' | 'group' | 'slide' | 'tour'
    openDialog(action: (subject: string | IModalData, result?: boolean | string) => void, subject: string | IModalData) {
        const data = typeof subject === 'object' ? this.modalData : this._getModalMessage(subject);
        const dialogRef = this._dialog.open(ModalDialogComponent, { data });
        const sub = dialogRef
                    .afterClosed()
                    .subscribe((result: boolean | string) => {
                        if (result) {
                            action(subject, result);
                            sub.unsubscribe();
                        }
                    });
    }
}
