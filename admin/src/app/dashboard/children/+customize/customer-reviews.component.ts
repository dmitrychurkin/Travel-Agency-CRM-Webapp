import { Component, Injector, OnInit } from '@angular/core';
import { BasicActionsComponent } from './basic-actions-component.class';
import { ModelImageService, ModelBasic, IModelService } from './basic-model-types.class';
import { TextEditorOptions } from './froala-text-editor.service';
import { MdTabChangeEvent, MdButton } from '@angular/material';

@Component({
    selector: 'app-customer-reviews',
    templateUrl: 'customer-reviews.component.html',
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
        h3 {
            color: rgba(0,0,0,.54);
        }
        .action-btn-cont {
            margin-top:10px;
        }
        .ok-btn-gap {
            margin-left:40px
        }
    `]
})
export class CustomerReviewsComponent extends BasicActionsComponent implements OnInit {
    private _resourceUrl = '/api/customer-reviews';

    editorOpts = TextEditorOptions;
    avatarModel = new ModelImageService;
    nameModel = new ModelBasic;
    designationModel = new ModelBasic;
    reviewModel = new ModelBasic;

    constructor(injector: Injector) {
        super(injector);
        this._setArrayOfComponentModels(
            this.avatarModel,
            this.nameModel,
            this.designationModel,
            this.reviewModel
        );
    }
    ngOnInit() {

        this._getResource(jsRes => {
            this._setModelRecord(this.componentModel = jsRes.data.attributes.customerReviews);
            const selectedTab = Array.isArray(this.componentModel) && this.componentModel[this.tabIndex];
            this.reviewModel.sanitizedContent = this._sanitize((selectedTab && selectedTab.review) || this.notSpecifiedMessage);
        }, this._resourceUrl);

    }
    get templateNewPerson() {
        return { avatarUrl: '', name: '', designation: '', review: '' };
    }
    onTabChange({ index }: MdTabChangeEvent) {
        this.reviewModel.sanitizedContent = this._sanitize(this.componentModel[index].review || this.notSpecifiedMessage);
    }
    onSave(btnSaveRef: MdButton) {
        super._onSaveChanges(this._resourceUrl, this.componentModel)
        (btnSaveRef, { id: '1', type: 'customer_reviews', attr: { customerReviews: this.componentModel } });
    }
    deleteSubjectBasic(reviewIndex: number, componentModelArray?: Array<any>) {
        return () => {
            super.deleteSubjectBasic(reviewIndex, componentModelArray)();
            const arrayItem = this.componentModel[this.tabIndex];
            this.reviewModel.sanitizedContent = this._sanitize((arrayItem && arrayItem.review) || this.notSpecifiedMessage);
        };
    }
}
