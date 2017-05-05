import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OrdersComponent } from './children/orders.component';
// import { FeaturesComponent } from './children/features.component';
// import { DetailsComponent } from './children/details.component';
import { OrdersService } from './orders.service';
import { WebSocketService } from './web-socket.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DashboardRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    DashboardComponent,
    OrdersComponent,
    // FeaturesComponent,
    // DetailsComponent
  ],
  exports: [MaterialModule, FlexLayoutModule],
  providers: [ OrdersService, WebSocketService ]
})
export class DashboardModule { }
