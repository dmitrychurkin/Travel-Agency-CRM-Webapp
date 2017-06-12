import { MdChip, MdButton } from '@angular/material';
import { BasicComponentClass } from './basic-component.class';
import { Injector } from '@angular/core';
import { ModelChip,
        ISomeObj,
        IModelService,
        IOkActionParams,
        IChipProps,
        IEditedChip,
        IClickedImage,
        ModelBasic} from './basic-model-types.class';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
// interface IClickedImage {
//     clickedImgRef?: HTMLImageElement;
// }
// interface IModelService extends IClickedImage {
//     content?: any;
//     isEditing: boolean;
// }
// export interface IEditedChip extends IClickedImage {
//     chipRef: MdChip;
//     item: IChipProps;
// }
// export interface IChipProps {
//     destination: string;
//     avatar: string;
//     starCount: number;
// }
// interface IOkActionParams {
//     flag?: 'CHIP';
//     index?: number;
//     subject: ISomeObj;
//     prop?: keyof ISomeObj;
//     model: IModelService | Array<IEditedChip>;
// }

// export class ModelBasic {
//     isEditing = false;
//     content: any;
// }

// export class ModelImageService extends ModelBasic {
//     clickedImgRef: HTMLImageElement;
// }

// export class ModelChip {
//     item: IChipProps;
//     constructor(item: IChipProps, public chipRef: MdChip) {
//         this.item = Object.assign({}, item);
//     }
// }

export class BasicActionsComponent extends BasicComponentClass {

    onEdit(slideProp: string, model: IModelService, flag?: 'i' | null, isEditingMark= true, forChipFlag= false) {
        // if (flag === 'i') {
        //     this._getPublicImages();
        // }
        if (typeof model !== 'object') {
            throw new Error('Model must to be an object');
        }
        this._isEditing = model.isEditing = true;
        if (flag === 'i') {
            this._getPublicImages(forChipFlag);
        }
        if (!isEditingMark) {
            this._isEditing = false;
        }
        model.content = slideProp;
    }
    onBackgroundImgClick(model: IModelService, image: IImagesProps, slideImgRef: HTMLImageElement) {
        model.content = image.links.self;
        this._clickImageHelper(model, slideImgRef);
    }
    onOk({ subject, prop, model, flag, index }: IOkActionParams) {
        switch (flag) {
            case 'CHIP': {
                const modelChipItem: IChipProps = model[index].item;
                for (const p in modelChipItem) {
                    if (p in modelChipItem) {
                        subject[p] = modelChipItem[p];
                    }
                }
            }
            break;
            default: {
                subject[prop] = (<IModelService>model).content;
            }

        }

        this.onCancelEdit(model, flag, index);
    }
    onCancelEdit(model: IModelService | Array<IEditedChip>, flag?, index?: number) {
        switch (flag) {
            case 'CHIP': {
                (<IEditedChip>model[index]).chipRef.toggleSelected();
                delete model[index];
            }
            break;
            default:
                /*for (const prop in model) {
                    if (typeof model[prop] === 'boolean') {
                        model[prop] = false;
                    }else if (typeof model[prop] === 'object' && !(model[prop] instanceof HTMLImageElement)) {
                        continue;
                    }else {
                        delete model[prop];
                    }
                }*/
                this._clearModel(<IModelService>model);

        }
       this._checkEditingState();
    }
    onCancelEditSan(model: IModelService, source?: string) {
        this.onCancelEdit(model);
        model.sanitizedContent = this._sanitize(source || this.notSpecifiedMessage);
    }
    onAddNewItem(subjectModel: Array<ISomeObj>, modelTemplate: ISomeObj) {
        subjectModel.push(modelTemplate);
    }
    onFroalaModelChange(e: any, model: IModelService) {
        model.content = e;
        model.sanitizedContent = this._sanitize(model.content);
    }
    deleteSubjectBasic(personIndex: number, componentModelArray?: Array<any>) {
        return () => {
            (componentModelArray || this.componentModel).splice(personIndex, 1);
            this._resetAllModels();
        };
    }


    protected _clickImageHelper(model: IClickedImage, imgRef: HTMLImageElement) {
        if (model.clickedImgRef) {
            model.clickedImgRef.style.opacity = '';
        }
        model.clickedImgRef = imgRef;
        imgRef.style.opacity = .5.toString();
    }

    protected _checkEditingState() {
        const mode = this._componentModelsArray.length > 0 ? 'defined' : null;
        switch (mode) {
            case 'defined': {
                if (this._isArrayOfModelEditing()) {
                    return;
                }
            }
            break;
            default: {
                const OwnPropertyNamesArr = Object.getOwnPropertyNames(this);

                for (const item of OwnPropertyNamesArr) {
                    const objProp: /*IModelService | Array<IEditedChip | IModelService>*/ any = this[item];
                    if ( (Array.isArray(objProp) && this._isArrayOfModelEditing(objProp)) ||
                        (objProp instanceof ModelBasic && (<IModelService>objProp).isEditing) ) {

                        return;
                    }
                }
            }
        }

        this._isEditing = false;
    }

}


/*
interface ISlideProps {
    type: 'slide';
    id?: number | string;

    backgroundImage: string;
    title: string;
    description: string;
    chips: IChipProps[];

}*/


export interface IImagesProps {
    type: 'image';
    id: number;
    links: {
        self: string;
    };
}
