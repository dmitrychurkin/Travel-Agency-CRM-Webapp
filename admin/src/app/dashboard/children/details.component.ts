import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInAnimation } from '../animation';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  animations: [slideInAnimation]
})
export class DetailsComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display')   display = 'block';
    @HostBinding('style.position')  position = 'absolute';
    private mes = 'Details component in Action!';
    constructor() { }

    ngOnInit() {
    }

}
