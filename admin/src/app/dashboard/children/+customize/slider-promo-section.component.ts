import { Component, OnInit, ChangeDetectorRef, Injector } from '@angular/core';
import { MdChip, MdButton } from '@angular/material';
import { BasicActionsComponent } from './basic-actions-component.class';
import { SliderPromoModalComponent } from './slider-promo-modal.component';
import { ModelBasic, ModelImageService, ModelChip, IChipProps, IEditedChip } from './basic-model-types.class';

// import { filesUrl } from './file-storage-basic.class';

@Component({
    selector: 'app-slider-promo-section',
    templateUrl: 'slider-promo-section.component.html',
    styles: [`
        h3 {
            color: rgba(0,0,0,.54);
        }
        .chip-avatar {
            background-size:cover;
            width:30px;
            height:30px;
            border-radius:50%
        }
        .action-btn-cont {
            margin-top:10px;
        }
        .ok-btn-gap {
            margin-left:40px
        }
    `]
})
export class SliderPromoSectionComponent extends BasicActionsComponent implements OnInit {

    private _slidesUrl = '/api/slider-promo/';
    // modelTitle: string;
    // isTitleEditing = false;
    modelTitle = new ModelBasic;
    // modelDesc: string;
    // isDescEditing = false;
    modelDesc = new ModelBasic;

    // modelBgImg: IModelBgSlideImg  | object = {};
    modelBgImg = new ModelImageService;

    modelChips: Array<IEditedChip> = [];

    modelButtonDesc = new ModelBasic;
    /*modelTemplate: ISlideProps = {
            type: 'slide',
            title: '',
            backgroundImage: '',
            description: '',
            chips: []
    };*/
    /*chipTemplate: IChipProps = {
            destination: '',
            avatar: '',
            starCount: 0
    };*/
    /*publicImages: {
        isRequestSent: boolean;
        forChip: boolean;
        data?: Array<{ id: string; type: 'image', links: { self: string } }>;
    } = { isRequestSent: false, forChip: false };*/

    // sliderModel: Array<ISlideProps>;

    constructor(/*private _changeDetectorRef: ChangeDetectorRef,*/ injector: Injector) {
        super(injector);
        this._setArrayOfComponentModels(
            this.modelTitle,
            this.modelDesc,
            this.modelBgImg,
            this.modelChips,
            this.modelButtonDesc
        );
    }
    ngOnInit() {
        this._getResource(jsRes => this._setModelRecord(this.componentModel = jsRes.data.attributes.slides), this._slidesUrl);
    }
    get modelTemplate(): ISlideProps {
        return {
            type: 'slide',
            title: '',
            backgroundImage: '',
            description: '',
            chips: [],
            buttonDesc: ''
        };
    }
    get chipTemplate(): IChipProps {
        return {
            destination: '',
            avatar: '',
            starCount: 0
        };
    }
    /*onOk(action: 'TIT' | 'B_IMG' | 'DESC' | 'CHIP', subject: ISlideProps | IChipProps, index?: number) {
        switch (action) {
            case 'TIT':
                (<ISlideProps>subject).title = this.modelTitle;
            break;
            case 'DESC':
                (<ISlideProps>subject).description = this.modelDesc;
            break;
            case 'B_IMG':
                (<ISlideProps>subject).backgroundImage = (<IModelBgSlideImg>this.modelBgImg).modelUrl;
            break;
            case 'CHIP':
                this.modelChips[index].chipRef.toggleSelected();
                const modelChipItem: IChipProps = this.modelChips[index].item;
                for (const prop in modelChipItem) {
                    if (prop in modelChipItem) {
                        (<IChipProps>subject)[prop] = modelChipItem[prop];
                    }
                }
                delete this.modelChips[index];
        }

        this.onCancelEdit(action);
    }*/
    /*onBackgroundImgClick(image: IImagesProps, slideImgRef: HTMLImageElement) {
        (<IModelBgSlideImg>this.modelBgImg).modelUrl = image.links.self;
        this._clickImageHelper(this.modelBgImg, slideImgRef);
    }*/
    /*onEdit(slide: ISlideProps, action: 'TIT' | 'B_IMG' | 'DESC') {
        switch (action) {
            case 'TIT':
                this.isTitleEditing = true;
                this.modelTitle = slide.title;
            break;
            case 'DESC':
                this.isDescEditing = true;
                this.modelDesc = slide.description;
            break;
            case 'B_IMG':
                (<IModelBgSlideImg>this.modelBgImg).modelUrl = slide.backgroundImage || '';
                this._getPublicImages();
        }
        this._isEditing = true;
    }*/
    /*onCancelEdit(action: 'TIT' | 'B_IMG' | 'DESC' | 'CHIP') {
        switch (action) {
            case 'TIT': {
                delete this.modelTitle;
                this.isTitleEditing = false;
            }
            break;
            case 'DESC': {
                delete this.modelDesc;
                this.isDescEditing = false;
            }
            break;
            case 'B_IMG':
                this.modelBgImg = {};
        }

        this._checkEditingState();
    }*/
    /*addNewTour(slide: ISlideProps) {
        const newChipProps: IChipProps = {
            destination: '',
            avatar: '',
            starCount: 0
        };
        slide.chips.push(newChipProps);
    }*/
    /*getNaturalSize(imgRef: HTMLImageElement, property: string) {
        if (!imgRef[property] && !imgRef.onload) {
            imgRef.onload = () => this._changeDetectorRef.detectChanges();
        }else if (imgRef[property] && imgRef.onload) {
            imgRef.onload = null;
        }
        return imgRef[property];
    }*/
    /*getAvatarImage(chip: IChipProps, index: number) {
        const fn = avatarUrl => avatarUrl ? `url(${avatarUrl})` : !!avatarUrl;
        if (this.modelChips[index]) {
            console.log('index i = ', index, this.modelChips[index].item);
            return fn(this.modelChips[index].item.avatar);
        }
        return fn(chip.avatar);
    }*/
    getChipStarCount(chip: IChipProps, index: number) {
        const modelChipItem: IEditedChip = this.modelChips[index];
        if (modelChipItem) {
            return modelChipItem.item.starCount;
        }
        return chip.starCount;
    }
    onAvatarImageClick(index: number, imageLink: string, imgRef: HTMLImageElement) {
        this.modelChips[index].item.avatar = imageLink;
        this._clickImageHelper(this.modelChips[index], imgRef);
    }
    onChipClick(chipRef: MdChip, item: IChipProps, index: number) {
        if (this.modelChips[index]) {
            return;
        }
        this.modelChips[index] = new ModelChip(item, chipRef);
        chipRef.toggleSelected();
        this._getPublicImages(true);
        this._isEditing = true;
    }

    onStartCountChange(e, index: number) {
        const count = +e;
        if (count < 0) {
            this.modelChips[index].item.starCount = 0;
        }else if (count > 5) {
            this.modelChips[index].item.starCount = 5;
        }else {
            this.modelChips[index].item.starCount = count;
        }
    }
    /*onEditChipCancel(chip: IChipProps, index: number) {
        this.modelChips[index].chipRef.toggleSelected();
        delete this.modelChips[index];
        this._checkEditingState();
    }*/
    /*onAddNewSlide() {
        const lastElem = this.sliderModel.length - 1;
        const addBaseObject: ISlideProps = {
            type: 'slide',
            title: '',
            backgroundImage: '',
            description: '',
            chips: []
        };
        this.sliderModel.push(addBaseObject);
    }*/
    onViewSlides() {
        const sliderPromoModal = this._selectedTabService.attachViewToDOM(SliderPromoModalComponent);
        sliderPromoModal.instance.modelData = this.componentModel;
        sliderPromoModal.instance.componentRef = sliderPromoModal;
    }
    onSave(btnRef: MdButton) {
        super._onSaveChanges<Array<ISlideProps>>(this._slidesUrl, this.componentModel)
        (btnRef, { id: '1', type: 'slides', attr: { slides: this.componentModel } });
    }
    /*private _clickImageHelper(assignTarget: any, imgRef: HTMLImageElement) {
        if (assignTarget.clickedImgRef) {
            assignTarget.clickedImgRef.style.opacity = '';
        }
        assignTarget.clickedImgRef = imgRef;
        imgRef.style.opacity = .5.toString();
    }*/
    /*private _checkEditingState() {
        if (!this.isTitleEditing &&
            !this.isDescEditing &&
            Object.keys(this.modelBgImg).length === 0 &&
            this._isEditComplete<IEditedChip>(this.modelChips)) {

            this._isEditing = false;
        }
    }*/
    /*private _getPublicImages(forChip= false) {
        if (!this.publicImages.data) {
            if (forChip) {
                this.publicImages.forChip = true;
            }
            this.publicImages.isRequestSent = true;
            this._getResource(res => this.publicImages.data = res.data, filesUrl, { params: 'fields[locationFlag]=P' })
                .then(() => this.publicImages.isRequestSent = false);
        }
    }*/
    deleteSubject(slideIndex: number, chipIndex?: number) {
        return (...args) => {
            const[, subject] = args;
                switch (subject) {
                    case 'slide': {
                        this.componentModel.splice(slideIndex, 1);
                        this._resetAllModels();
                        this.modelChips.length = 0;
                    }
                    break;
                    case 'tour': {
                        this.componentModel
                            [slideIndex]
                            .chips
                            .splice(chipIndex, 1);
                        delete this.modelChips[chipIndex];
                    }
                    break;
                }
                this._checkEditingState();

        };
    }

}
/*interface IModelBgSlideImg {
    clickedImgRef: HTMLImageElement;
    modelUrl: string;
}*/
/*interface IEditedChip {
    chipRef: MdChip;
    item: IChipProps;
    clickedImgRef?: HTMLImageElement;
}*/
/*interface IImagesProps {
    type: 'image';
    id: number;
    links: {
        self: string;
    };
}*/
interface ISlideProps {
    type: 'slide';
    id?: number | string;

    backgroundImage: string;
    title: string;
    description: string;
    chips: IChipProps[];
    buttonDesc: string;
}
/*interface IChipProps {
    destination: string;
    avatar: string;
    starCount: number;
}*/
