import { Component } from '@angular/core';
import { MdChip, MdDialog } from '@angular/material';
import { ModalDialogComponent } from './modal-dialog.component';
import { BasicComponentClass } from './basic-component.class';
import { SelectedTabService } from './selected-tab.service';
import { SliderPromoModalComponent } from './slider-promo-modal.component';

const fakeModelImages = {
        data: [
            {
                type: 'slide',
                id: 1,
                attributes: {
                    backgroundImage: '/images/3d-slider-1.jpg',
                    title: 'African Safari Tours',

                    description: `Lorem ipsum dolor sit amet, 
                    consectetur adipisicing elit. 
                    Distinctio veniam minus 
                    illo debitis nihil animi facere, doloremque 
                    voluptate tempore quia. Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Distinctio veniam 
                    minus illo debitis nihil animi facere, doloremque 
                    voluptate tempore quia.`,
                    chips: [
                        {
                            destination: 'African Safari',
                            avatar: '/images/yuna.jpg',
                            starCount: 3
                        },
                        {
                            destination: 'South African Safari',
                            avatar: '/images/yuna.jpg',
                            starCount: 4
                        },
                        {
                            destination: 'Tanzania Safari',
                            avatar: '/images/yuna.jpg',
                            starCount: 2
                        },
                        {
                            destination: 'Kenia Safari',
                            avatar: '/images/yuna.jpg',
                            starCount: 5
                        }
                    ]
                }
            },
            {
                type: 'slide',
                id: 2,
                attributes: {
                    backgroundImage: '/images/3d-slider-2.jpg',
                    title: 'European Tours',
                    description: `Lorem ipsum dolor sit amet, 
                    consectetur adipisicing elit. Distinctio 
                    veniam minus illo debitis nihil animi facere, 
                    doloremque voluptate tempore quia. Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Distinctio veniam 
                    minus illo debitis nihil animi facere, doloremque
                    voluptate tempore quia.`,
                    chips: [
                        {
                            destination: 'Italy Tours',
                            avatar: '/images/yuna.jpg',
                            starCount: 3
                        },
                        {
                            destination: 'Greece Tours',
                            avatar: '/images/yuna.jpg',
                            starCount: 4
                        },
                        {
                            destination: 'Spain Tours',
                            avatar: '/images/yuna.jpg',
                            starCount: 4
                        }
                    ]
                }
            },
            {
                type: 'slide',
                id: 3,
                attributes: {
                    backgroundImage: '/images/3d-slider-3.jpg',
                    title: 'Asian Tours',
                    description: `Lorem ipsum dolor sit amet, 
                    consectetur adipisicing elit. Distinctio 
                    veniam minus illo debitis nihil animi facere, 
                    doloremque voluptate tempore quia. Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Distinctio veniam 
                    minus illo debitis nihil animi facere, doloremque
                    voluptate tempore quia.`,
                    chips: [
                        {
                            destination: 'India Tours',
                            avatar: '/images/yuna.jpg',
                            starCount: 3
                        },
                        {
                            destination: 'China Tours',
                            avatar: '/images/yuna.jpg',
                            starCount: 4
                        },
                        {
                            destination: 'Vietnam Tours',
                            avatar: '/images/yuna.jpg',
                            starCount: 3
                        },
                        {
                            destination: 'Thailand Tours',
                            avatar: '/images/yuna.jpg',
                            starCount: 5
                        }
                    ]
                }
            }
        ]
    };

const publicImagesFakeModel = {
    data: [
        {
            type: 'image',
            id: 1,
            links: {
                self: '/images/yuna.jpg'
            }
        },
        {
            type: 'image',
            id: 2,
            links: {
                self: '/images/cat1.jfif'
            }
        },
        {
            type: 'image',
            id: 3,
            links: {
                self: '/images/cat2.jfif'
            }
        },
        {
            type: 'image',
            id: 4,
            links: {
                self: '/images/cat3.jfif'
            }
        },
        {
            type: 'image',
            id: 5,
            links: {
                self: '/images/cat4.jfif'
            }
        },
        {
            type: 'image',
            id: 6,
            links: {
                self: '/images/cat5.jfif'
            }
        },
        {
            type: 'image',
            id: 7,
            links: {
                self: '/images/3d-slider-1.jpg'
            }
        },
        {
            type: 'image',
            id: 8,
            links: {
                self: '/images/3d-slider-2.jpg'
            }
        },
        {
            type: 'image',
            id: 9,
            links: {
                self: '/images/3d-slider-3.jpg'
            }
        }
    ]
};

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
export class SliderPromoSectionComponent extends BasicComponentClass {
    // private _editAction: 'TIT' | 'B_IMG' | 'DESC' | 'CHIP';
    objectRecord: string;

    isEditing = false;

    modelTitle: string;
    isTitleEditing = false;
    modelDesc: string;
    isDescEditing = false;
    modelBgImg: IModelBgSlideImg  | object = {};
    modelChips: Array<IEditedChip> = [];

    publicImagesFakeModel = publicImagesFakeModel;
    fakeModelSlides = fakeModelImages;

    constructor(_mdDialog: MdDialog, private _selectedTabService: SelectedTabService) {
        super(_mdDialog);
        // dev only
        this.objectRecord = JSON.stringify(this.fakeModelSlides);
    }
    onOk(action: 'TIT' | 'B_IMG' | 'DESC' | 'CHIP', subject: ISlideProps | IChipProps, index?: number) {
        switch (action) {
            case 'TIT':
                (<ISlideProps>subject).attributes.title = this.modelTitle;
            break;
            case 'DESC':
                (<ISlideProps>subject).attributes.description = this.modelDesc;
            break;
            case 'B_IMG':
                (<ISlideProps>subject).attributes.backgroundImage = (<IModelBgSlideImg>this.modelBgImg).modelUrl;
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
    }
    onBackgroundImgClick(image: IImagesProps, slideImgRef: HTMLImageElement) {
        (<IModelBgSlideImg>this.modelBgImg).modelUrl = image.links.self;
        this._clickImageHelper(this.modelBgImg, slideImgRef);
    }
    onEdit(slide: ISlideProps, action: 'TIT' | 'B_IMG' | 'DESC') {
        switch (action) {
            case 'TIT':
                this.isTitleEditing = true;
                this.modelTitle = slide.attributes.title;
            break;
            case 'DESC':
                this.isDescEditing = true;
                this.modelDesc = slide.attributes.description;
            break;
            case 'B_IMG':
                (<IModelBgSlideImg>this.modelBgImg).modelUrl = slide.attributes.backgroundImage;
        }
        this.isEditing = true;
    }
    onCancelEdit(action: 'TIT' | 'B_IMG' | 'DESC' | 'CHIP') {
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
    }
    addNewTour(slide: ISlideProps) {
        const newChipProps: IChipProps = {
            destination: '',
            avatar: '',
            starCount: 0
        };
        slide.attributes.chips.push(newChipProps);
    }
    getAvatarImage(chip: IChipProps, index: number) {
        if (this.modelChips[index]) {
            return this.modelChips[index].item.avatar;
        }
        return chip.avatar;
    }
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
        this.modelChips[index] = { chipRef, item: Object.assign({}, item) };
        chipRef.toggleSelected();
        this.isEditing = true;
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
    onEditChipCancel(chip: IChipProps, index: number) {
        this.modelChips[index].chipRef.toggleSelected();
        delete this.modelChips[index];
        this._checkEditingState();
    }
    onAddNewSlide() {
        const lastElem = this.fakeModelSlides.data.length - 1;
        const addBaseObject = {
            type: 'slide',
            id: this.fakeModelSlides.data[lastElem] ? this.fakeModelSlides.data[lastElem].id + 1 : 1,
            attributes: {
                title: '',
                backgroundImage: '',
                description: '',
                chips: []
            }
        };
        this.fakeModelSlides.data.push(addBaseObject);
    }
    onViewSlides() {
        const sliderPromoModal = this._selectedTabService.attachViewToDOM(SliderPromoModalComponent);
        sliderPromoModal.instance.modelData = this.fakeModelSlides;
        sliderPromoModal.instance.componentRef = sliderPromoModal;
        console.log(sliderPromoModal);
    }
    private _clickImageHelper(assignTarget: any, imgRef: HTMLImageElement) {
        if (assignTarget.clickedImgRef) {
            assignTarget.clickedImgRef.style.opacity = '';
        }
        assignTarget.clickedImgRef = imgRef;
        imgRef.style.opacity = .5.toString();
    }
    private _checkEditingState() {
        if (!this.isTitleEditing &&
            !this.isDescEditing &&
            Object.keys(this.modelBgImg).length === 0 &&
            this._isEditComplete<IEditedChip>(this.modelChips)) {

            this.isEditing = false;
        }
    }

    deleteSubject(slideIndex: number, chipIndex?: number) {
        return (subject: 'slide' | 'tour') => {
                switch (subject) {
                    case 'slide': {
                        this.fakeModelSlides.data.splice(slideIndex, 1);
                        this.modelChips.length = 0;
                    }
                    break;
                    case 'tour': {
                        this.fakeModelSlides
                            .data[slideIndex]
                            .attributes
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
interface IModelBgSlideImg {
    clickedImgRef: HTMLImageElement;
    modelUrl: string;
}
interface IEditedChip {
    chipRef: MdChip;
    item: IChipProps;
    clickedImgRef?: HTMLImageElement;
}
interface IImagesProps {
    type: 'image';
    id: number;
    links: {
        self: string;
    };
}
interface ISlideProps {
    type: 'slide';
    id?: number;
    attributes: {
        backgroundImage: string;
        title: string;
        description: string;
        chips: IChipProps[];
    };
}
interface IChipProps {
    destination: string;
    avatar: string;
    starCount: number;
}
