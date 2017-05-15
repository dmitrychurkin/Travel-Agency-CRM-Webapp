import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './customize.component';
import { FileStorageComponent } from './file-storage.component';
import { LandingPageSettingsComponent } from './landing-page-settings.component';
import { OffersSectionComponent } from './offers-section.component';
import { OffersModalComponent } from './offers-modal.component';
import { SelectedTabService } from './selected-tab.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        CustomizeRoutingModule,
        FlexLayoutModule
    ],
    declarations: [
        CustomizeComponent,
        FileStorageComponent,
        LandingPageSettingsComponent,
        OffersSectionComponent,
        OffersModalComponent
    ],
    entryComponents: [ OffersModalComponent ],
    providers: [SelectedTabService]
})
export class CustomizeModule {}
