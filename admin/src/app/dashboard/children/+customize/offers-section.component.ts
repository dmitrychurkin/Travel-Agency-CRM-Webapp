import { Component,
        ViewChild,
        ElementRef,
        OnInit,
        AfterViewChecked } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';
import { SelectedTabService } from './selected-tab.service';
import { OffersModalComponent } from './offers-modal.component';
import { BackendService, JSON_API_HEADER_BASIC, JSON_API_HEADER_EXTENDED } from 'app/backend.service';
import { ErrorEmmiter, errorMessages } from 'app/error.service';
export const offersURL = '/offers';
@Component({
    selector: 'app-offers-section',
    templateUrl: 'offers-section.component.html'
})
export class OffersSectionComponent implements OnInit, AfterViewChecked {
    private _isFocused = false;
    alt: string;
    title: string;
    offers: IPortOffersResponse;
    isNeedEdit = false;
    index: number;
    @ViewChild('inputField') inputField: ElementRef;
    constructor(private backendService: BackendService,
                private _selectedTabService: SelectedTabService,
                private errorService: ErrorEmmiter) {}
    ngOnInit() {
        this.backendService.sendRequest(offersURL, { headers: JSON_API_HEADER_BASIC })
                            .then((response: Response) => this.offers = response.json())
                            .catch(() => this.errorService.emmiter.emit(errorMessages.load));
    }
    ngAfterViewChecked() {
        const {inputField, _isFocused} = this;
        if (inputField && !_isFocused) {
            inputField.nativeElement.focus();
            this._isFocused = true;
        }
    }
    /*private _iterateThrough(id: string, action: (offer: IOfferData) => void) {
        for (const offerImgs of this.offers.data) {
            if (id === offerImgs.id) {
                action(offerImgs);
            }
        }
    }*/
    onEdit({ /*id*/ attributes: { meta: { alt, title } } }: IOfferData) {
        this.isNeedEdit = true;
        /*this._iterateThrough(id, offer => {
            const{ attributes: { meta: { alt, title } } } = offer;
            this.alt = alt;
            this.title = title;
        });*/
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

        this.backendService.sendRequest(
                `${offersURL}/${id}`,
                {
                    method: RequestMethod.Patch,
                    headers: JSON_API_HEADER_EXTENDED,
                    body: this.backendService.serializeResource('offers', id, { meta })
                }
            )
            .then(() => Object.assign(offer.attributes.meta, meta))
            .catch((response: Response) => this.errorService.emmiter.emit(response.text()))
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
