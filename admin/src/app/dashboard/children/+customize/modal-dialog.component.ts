import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';


@Component({
    selector: 'app-modal-dialog',
    template: `
        <h3 md-dialog-title>{{isDataObject ? data.message : data}}</h3>
        <md-dialog-content *ngIf="isDataObject">
            <div fxLayout="row">
                <md-input-container style="margin:auto">
                    <input mdInput [placeholder]="data.placeholder" [(ngModel)]="name">
                </md-input-container>
            </div>
        </md-dialog-content>
        <md-dialog-actions fxLayout="row" fxLayoutAlign="space-between">
            <button md-button md-dialog-close>CANCEL</button>
            <button md-button (click)="dialogRef.close(name || true)">OK</button>
        </md-dialog-actions>
    `
})
export class ModalDialogComponent implements OnInit {
    isDataObject: boolean;
    name: string;
    constructor(
        @Inject(MD_DIALOG_DATA) private data: string | IModalData,
        public dialogRef: MdDialogRef<ModalDialogComponent>
    ) {}
    ngOnInit() {
        this.isDataObject = typeof this.data === 'object';
    }

}

export interface IModalData {
    message: string;
    placeholder: string;
}
