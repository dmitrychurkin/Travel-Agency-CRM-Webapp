import { MdChip } from '@angular/material';
import { SafeHtml } from '@angular/platform-browser';

export interface ISomeObj {
    [key: string]: any;
}
interface IImagesProps {
    type: 'image';
    id: string;
    links: {
        self: string;
    };
}
export interface IPublicImgs {
    isRequestSent: boolean;
    forChip: boolean;
    data?: Array<IImagesProps>;
}
export interface IOkActionParams {
    flag?: 'CHIP';
    index?: number;
    subject: ISomeObj;
    prop?: keyof ISomeObj;
    model: IModelService | Array<IEditedChip>;
}
export interface IClickedImage {
    clickedImgRef?: HTMLImageElement;
}
export interface IModelService extends IClickedImage {
    sanitizedContent?: SafeHtml;
    content?: any;
    isEditing: boolean;
}
export interface IEditedChip extends IClickedImage {
    chipRef: MdChip;
    item: IChipProps;
}
export interface IChipProps {
    destination: string;
    avatar: string;
    starCount: number;
}

export class ModelBasic {
    isEditing = false;
    content: any;
    sanitizedContent?: SafeHtml;
}

export class ModelImageService extends ModelBasic {
    clickedImgRef: HTMLImageElement;
}

export class ModelChip {
    clickedImgRef: HTMLImageElement;
    item: IChipProps;
    constructor(item: IChipProps, public chipRef: MdChip) {
        this.item = Object.assign({}, item);
    }
}
