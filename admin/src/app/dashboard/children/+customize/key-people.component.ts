import { Component, OnInit, Injector } from '@angular/core';
import { TextEditorOptions } from './froala-text-editor.service';

import { BasicActionsComponent } from './basic-actions-component.class';
import { ModelImageService, ModelBasic, IModelService } from './basic-model-types.class';
import { MdButton, MdTabChangeEvent } from '@angular/material';

/*const TestReview = `Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;*/

@Component({
    selector: 'app-key-people',
    templateUrl: 'key-people.component.html',
    styles: [`
        .align-cards {
            width:92%;
            margin:30px 0
        }
        .tab-avatar {
            width:30px;
            height:30px;
            border-radius:50%;
            position:relative;
            top:8px
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
export class KeyPeopleComponent extends BasicActionsComponent implements OnInit {
    private _resourceUrl = '/api/key-people';

    editorOpts = TextEditorOptions;

    /*mainContent = {
        title: 'Who we are?',
        article: `The travel agency <strong>wings for world</strong> was born in 2009, and
        within a few years of growth and success, shows a considerable growth
        record that is phenomenal by any standard. This success proves that the
        principle of the service with efficiency creates an environment in
        which you can achieve the goals of large dimensions. Today, Wings for
        World is a major conglomerate with diverse interests in air ticketing,
        travel, travel-related services, tours in and out, and package tours,
        travel and leisure cruise tour. <span style="font-family: Indie Flower,cursive;">​<strong>​<em>Hello world</em></strong></span>`
    };
    peoples = [
        {
            avatarUrl: '/images/cat1.jfif',
            name: 'Suchintha Fernando',
            position: 'CEO',
            review: TestReview
        },
        {
            avatarUrl: '',
            name: 'Summudu Fernando',
            position: 'VP',
            review: TestReview
        },
        {
            avatarUrl: '/images/cat3.jfif',
            name: 'Somebody Else',
            position: 'Janitor',
            review: TestReview
        }
    ];*/

    titleModel = new ModelBasic;
    articleModel = new ModelBasic;

    // avatarModel: Array<ModelImageService>;
    avatarModel = new ModelImageService;

    nameModel = new ModelBasic;
    positionModel = new ModelBasic;
    reviewModel = new ModelBasic;


    // sanitizedContent: SafeHtml;

    constructor(/*private _sanitizer: DomSanitizer,*/ injector: Injector) {
        super(injector);
        this._setArrayOfComponentModels(
            this.avatarModel,
            this.nameModel,
            this.positionModel,
            this.reviewModel);
    }
    // private _sanitize(content: string): SafeHtml {
    //     return this._sanitizer.bypassSecurityTrustHtml(content);
    // }

    ngOnInit() {
        this._getResource(jsRes => {
            this._setModelRecord(this.componentModel = jsRes.data.attributes.keyPeople);
            // this.avatarModel = this._setArrayOfModels<ModelImageService>(ModelImageService, this.componentModel.people.length);
            // this.sanitizedContent =
            this.articleModel.sanitizedContent = this._sanitize(this.componentModel.article || this.notSpecifiedMessage);
            const selectedTab = Array.isArray(this.componentModel.people) && this.componentModel.people[this.tabIndex];
            this.reviewModel.sanitizedContent =
            this._sanitize((selectedTab && selectedTab.review) || this.notSpecifiedMessage);
        }, this._resourceUrl);
    }
    get templateNewPerson() {
        return { avatarUrl: '', name: '', position: '', review: '' };
    }
    /*onFroalaModelChange(e) {
        this.articleModel.content = e;
        this.sanitizedContent = this._sanitize(this.articleModel.content);
    }*/
    /*deleteSubject(personIndex: number) {
        return () => this.componentModel.people.splice(personIndex, 1);
    }*/
    /*onEditMain(slideProp, model) {
        super.onEdit(slideProp, model);
        this._isEditing = false;
    }*/
    /*onCancelEditMain(model: IModelService, source?: string) {
        super.onCancelEdit(model);
        // this.sanitizedContent =
        model.sanitizedContent = this._sanitize(source || this.notSpecifiedMessage);
    }*/

    // onAddNewItem() {
        // this.avatarModel.push(new ModelImageService);
        // super.onAddNewItem(this.componentModel.people, this.templateNewPerson);
    // }
    onTabChange({ index }: MdTabChangeEvent) {
        console.log('onTabChange ', index);
        this.reviewModel.sanitizedContent = this._sanitize(this.componentModel.people[index].review || this.notSpecifiedMessage);
    }
    onSave(btnSaveRef: MdButton) {
        super._onSaveChanges(this._resourceUrl, this.componentModel)
        (btnSaveRef, { id: '1', type: 'keypeople', attr: { keyPeople: this.componentModel } });
    }
    deleteSubjectBasic(personIndex: number, componentModelArray: Array<any>) {
        return () => {
            super.deleteSubjectBasic(personIndex, componentModelArray)();
            const arrayItem = componentModelArray[this.tabIndex];
            this.reviewModel.sanitizedContent = this._sanitize((arrayItem && arrayItem.review) || this.notSpecifiedMessage);
        };
    }
}

