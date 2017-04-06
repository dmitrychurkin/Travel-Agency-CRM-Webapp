import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInAnimation } from '../animation';
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  animations: [slideInAnimation]
})
export class FeaturesComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  private mes = 'Features component in Action!';
  constructor() { }

  ngOnInit() {
  }

}
