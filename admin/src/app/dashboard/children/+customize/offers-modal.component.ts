import { Component,
        ComponentRef,
        AfterViewInit,
        OnDestroy,
        AfterViewChecked,
        Inject,
        ViewChildren,
        ViewChild,
        QueryList,
        ElementRef,
        Injector} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdSliderChange, MdSelect, MdOption, MdSelectChange, MdButton } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import { asap } from 'rxjs/scheduler/asap';
import 'rxjs/add/observable/timer';
import { IPortOffersResponse, IOfferData, offersURL } from './offers-section.component';
import { BasicComponentClass } from './basic-component.class';

const enum MenuActions {
    Resize = 1,
    Timeout,
    Mode
};

@Component({
    selector: 'app-modal-section',
    templateUrl: 'offers-modal.component.html',
    styleUrls: ['offers-modal.component.css'],
    host: {
        'style': 'display:block;position:absolute;z-index:100;top:0;width:100%;min-width:1000px',
        '[@appear]': 'true'
    },
    animations: [
        trigger('appear', [
            transition('void=>*', [
                style({opacity: 0}),
                animate('1s', style({opacity: 1}))
            ]),
            transition('*=>void', [
                style({opacity: 1}),
                animate('1s', style({opacity: 0}))
            ])
        ]),
        trigger('menuItemAppear', [
            state('active', style({opacity: 1, transform: 'translateY(0)'})),
            state('inactive', style({opacity: 0, transform: 'translateY(-100%)'})),
            transition('inactive=>active', [
                animate('300ms 300ms ease-in')
            ]),
            transition('active=>inactive', [
                animate('300ms ease-out')
            ])
        ])
    ]
})
export class OffersModalComponent extends BasicComponentClass implements AfterViewInit, OnDestroy, AfterViewChecked {
    private _sub: Subscription;
    private _slideShow: number;
    private _sliderMode: 'sequensed' | 'static';
    componentRef: ComponentRef<OffersModalComponent>;
    currentImg: HTMLImageElement;
    previousImg: HTMLImageElement;
    resizedMaxWidth: number;

    @ViewChildren('imgRef') imgs: QueryList<ElementRef>;
    @ViewChild(MdSelect) private _mdSelect: MdSelect;

    offers: IPortOffersResponse;
    selectedMenuItem: MenuActions = MenuActions.Resize;
    constructor(@Inject(DOCUMENT) public document: Document, injector: Injector) {
        super(injector);
    }
    get currentMaxWidth() {
        const{ maxWidth } = this.offers.meta;
        if (typeof maxWidth === 'number') {
            return maxWidth;
        }
        return parseInt(maxWidth, 10);
    }

    selectedMenuAnimHelper(value: number) {
        return this.selectedMenuItem === value ? 'active' : 'inactive';
    }
    ngAfterViewChecked() {
        if (this._mdSelect && !this._mdSelect.selected) {
            asap.schedule(() => {
                this._mdSelect.options.forEach((mdOption: MdOption) => {
                    if (mdOption.value === this.offers.meta.sliderMode) {
                        mdOption.select();
                    }
                });
            });
        }
        this._center();
    }
    ngAfterViewInit() {
        const{ slideShow, sliderMode } = this.offers.meta;
        this._startSideshow(slideShow, sliderMode);
    }
    ngOnDestroy() {
        this._clearTimeout();
    }
    private _startSideshow(timeout: number, mode: 'sequensed' | 'static') {
        const ModeTimeResolution = mode === 'static' ? 0 : 2000;
        const { length } = this.imgs;
        if (length === 0) {
            return;
        }else if (length === 1) {
            this.currentImg = this.imgs.first.nativeElement;
            return this.currentImg.classList.add('S14__vis');
        }
        let it = this.imgs.toArray()[Symbol.iterator]();
        this._sub = this.initializeSlider(timeout)
                            .subscribe(() => {
                                async.schedule(() => {
                                    let result = it.next();
                                    if (result.done) {
                                        it = this.imgs.toArray()[Symbol.iterator]();
                                        result = it.next();
                                    }
                                    this.currentImg = result.value.nativeElement;
                                    this.currentImg.classList.add('S14__vis');
                                }, !this.currentImg ? 0 : ModeTimeResolution);
                            });
    }
    onSliderInput(e: MdSliderChange) {
        this.resizedMaxWidth = e.value;
    }

    initializeSlider(timeout: number) {

        return Observable.timer(0, timeout * 1000)
                        .do(() => {
                            if (this.previousImg = this.currentImg) {
                                this.previousImg.classList.remove('S14__vis');
                            }
                        });
    }
    private _clearTimeout() {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }
    private _center() {
        if (this.imgs) {
            this.imgs.forEach((elRef) => {
                const img = elRef.nativeElement;
                img.style.left = `${(this.document.body.offsetWidth - 18 - img.offsetWidth) / 2}px`;
            });
        }
    }
    onSliderModeChange({ value }: MdSelectChange) {
        this._sliderMode = value;
        this._clearTimeout();
        this._startSideshow(this._slideShow || this.offers.meta.slideShow, value);
    }
    onSlideShowChange(e) {
        if (this._slideShow === e) {
            return;
        }
        this._slideShow = e;
        this._clearTimeout();
        this._startSideshow(e, this._sliderMode || this.offers.meta.sliderMode);
    }
    onCancel() {
        if (!this._isRequestSent) {
            this.componentRef.destroy();
        }
    }
    isButtonSaveShow() {
        const{ resizedMaxWidth, _slideShow, _sliderMode } = this;
        const{ maxWidth, slideShow, sliderMode } = this.offers.meta;
        if (
            (resizedMaxWidth && maxWidth !== resizedMaxWidth) ||
            (_slideShow && slideShow !== _slideShow) ||
            (_sliderMode && sliderMode !== _sliderMode)
            ) {
            return true;
        }
        return false;
    }
    onSaveChanges(btnSaveRef: MdButton) {
        const{ _isRequestSent, resizedMaxWidth, _slideShow, _sliderMode } = this;
        const{ maxWidth, slideShow, sliderMode } = this.offers.meta;

        if (!_isRequestSent) {
            const attributesObject: { maxWidth?: number, slideShow?: number, sliderMode?: 'sequensed' | 'static' } = {};
            if (resizedMaxWidth && maxWidth !== resizedMaxWidth) {
                attributesObject.maxWidth = resizedMaxWidth;
            }
            if (_slideShow && slideShow !== _slideShow) {
                attributesObject.slideShow = _slideShow;
            }
            if (_sliderMode && sliderMode !== _sliderMode) {
                attributesObject.sliderMode = _sliderMode;
            }

            if (Object.keys(attributesObject).length > 0) {
                this._setBtn(btnSaveRef, true);
                return this._patchRequest(offersURL, { id: '1', type: 'offers', attr: attributesObject })
                        .then(() => {
                            this._showSucMess();
                            for (const metaField in attributesObject) {
                                if (attributesObject[metaField]) {
                                    this.offers.meta[metaField] = attributesObject[metaField];
                                }
                            }
                            delete this._sliderMode;
                            delete this._slideShow;
                            delete this.resizedMaxWidth;
                        })
                        .catch( () => this._showErrMess(0) )
                        .then(() => {
                            this._setBtn(btnSaveRef, false);
                        });
            }
        }
    }
}
