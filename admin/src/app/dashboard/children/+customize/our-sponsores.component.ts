import { Component, Injector, OnInit } from '@angular/core';
import { BasicActionsComponent } from './basic-actions-component.class';
import { ModelImageService } from './basic-model-types.class';
import { MdButton } from '@angular/material';


@Component({
    selector: 'app-our-sponsores',
    templateUrl: 'our-sponsores.component.html',
    styles: [`
        .tab-avatar {
            width:30px;
            height:30px;
            border-radius:50%;
            position:relative;
            top:8px
        }
        .align-cards {
            width:92%;
            margin:30px 0
        }
        .action-btn-cont {
            margin-top:10px;
            width: 155px;
        }
        .ok-btn-gap {
            margin-left:40px
        }
    `]
})
export class OurSponsoresComponent extends BasicActionsComponent implements OnInit {
    private _resourceUrl = '/api/sponsores';
    avatarModel = new ModelImageService;

    constructor(injector: Injector) {
        super(injector);
        this._setArrayOfComponentModels(this.avatarModel);
    }
    ngOnInit() {
        this._getResource(jsRes => {
            this._setModelRecord(this.componentModel = jsRes.data.attributes.sponsores);
        }, this._resourceUrl);
    }
    get templateNewSponsor() {
        return { avatarUrl: '' };
    }
    onSave(btnSaveRef: MdButton) {
        super._onSaveChanges(this._resourceUrl, this.componentModel)
        (btnSaveRef, { id: '1', type: 'sponsores', attr: { sponsores: this.componentModel } });
    }
}
