import { Component, HostBinding, HostListener, OnInit, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { async } from 'rxjs/scheduler/async';
import 'rxjs/add/operator/debounceTime';
// transform: translateY(-46px);
const hostStyles = [
    'display:block',
    'background-color:#0e1312',
    'position:absolute',
    'top:0',
    'z-index:10',
    'width:100%',
    'min-width:1000px',
    'transition:1s',
    'opacity:0'
    ];
@Component({
    selector: 'app-slider-promo-modal',
    templateUrl: 'slider-promo-modal.component.html',
    styleUrls: ['slider-promo-modal.component.css'],
    host: {
        'class': 'slider-promo-mod',
        'style': hostStyles.join(';')
    }
})
export class SliderPromoModalComponent implements OnInit {
    private _initSub: Subscription;
    private _moveSub: Subscription;
    modelData: any;
    componentRef: ComponentRef<SliderPromoModalComponent>;

    @HostBinding('class.active') isActive: boolean;
    @HostBinding('style.opacity') private _modalAnimation: string;
    @HostListener('mousemove') private _onMouseMove() {
        if (!this._moveSub.closed) {
            this.isActive = true;
        }
    }
    ngOnInit() {
        this.isActive = true;
        this._modalAnimation = '1';
        this._initSub = async.schedule(() => this.isActive = false, 2000);
        this._moveSub = Observable.fromEvent(window, 'mousemove')
                                    .do(() => this._initSub.unsubscribe())
                                    .debounceTime(2000)
                                    .subscribe(() => this.isActive = false);
    }

    onCloseModal() {
        this._modalAnimation = '0';
        this._moveSub.unsubscribe();
        this.isActive = false;
        async.schedule(() => this.componentRef.destroy(), 1000);
    }
}
