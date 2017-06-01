import { Component,
        ViewChild,
        ElementRef,
        OnInit,
        AfterViewChecked,
        Injector} from '@angular/core';
import { OffersModalComponent } from './offers-modal.component';
import { BasicComponentClass } from './basic-component.class';

export const offersURL = '/offers';

@Component({
    selector: 'app-offers-section',
    templateUrl: 'offers-section.component.html'
})
export class OffersSectionComponent extends BasicComponentClass implements OnInit, AfterViewChecked {
    private _isFocused = false;
    alt: string;
    title: string;
    offers: IPortOffersResponse;
    isNeedEdit = false;
    index: number;
    @ViewChild('inputField') inputField: ElementRef;
    constructor(injector: Injector) {
        super(injector);
    }
    ngOnInit() {
        this._getResource(jsRes => this.offers = jsRes, offersURL);
    }
    ngAfterViewChecked() {
        const {inputField, _isFocused} = this;
        if (inputField && !_isFocused) {
            inputField.nativeElement.focus();
            this._isFocused = true;
        }
    }

    onEdit({ attributes: { meta: { alt, title } } }: IOfferData) {
        this.isNeedEdit = true;
        this.alt = alt;
        this.title = title;
    }
    onOk(offer: IOfferData) {
        this.isNeedEdit = this._isFocused = false;

        const{ id } = offer;
        const{ alt, title } = this;
        const resetModels = () => this.alt = this.title = '';
        if (offer.attributes.meta.alt === alt && offer.attributes.meta.title === title) {
            return resetModels();
        }
        const meta = { alt, title };

        this._patchRequest(`${offersURL}/${id}`, { id, type: 'offers', attr: { meta } })
                .then(() => Object.assign(offer.attributes.meta, meta))
                .catch(() => this._showErrMess(0))
                .then(resetModels);
    }
    openModal() {
        if (this.offers) {
            const OffersModComponent = this._selectedTabService.attachViewToDOM(OffersModalComponent);
            OffersModComponent.instance.componentRef = OffersModComponent;
            OffersModComponent.instance.offers = this.offers;
        }
    }
}

export interface IPortOffersResponse {
    data: Array<IOfferData>;
    meta: {
        maxWidth: number;
        slideShow: number;
        sliderMode: 'sequensed' | 'static';
    };
}
export interface IOfferData {
    type: 'offers';
    id: string;
    attributes: {
        fileName: string;
        fileSize: number;
        meta: {
            alt: string;
            title: string;
        };
    };
    links: {
        self: string;
    };
}
