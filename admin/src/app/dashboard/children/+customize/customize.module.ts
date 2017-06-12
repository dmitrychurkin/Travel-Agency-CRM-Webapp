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
import { SliderPromoSectionComponent } from 'app/dashboard/children/+customize/slider-promo-section.component';
import { ModalDialogComponent } from './modal-dialog.component';
import { SiteContactsComponent } from './site-contacts.component';
import { SliderPromoModalComponent } from './slider-promo-modal.component';
import { KeyPeopleComponent } from './key-people.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { FroalaEditorService } from './froala-text-editor.service';
import { CustomerReviewsComponent } from './customer-reviews.component';
import { OurSponsoresComponent } from './our-sponsores.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        CustomizeRoutingModule,
        FlexLayoutModule,
        FroalaEditorModule,
        FroalaViewModule
    ],
    declarations: [
        CustomizeComponent,
        FileStorageComponent,
        LandingPageSettingsComponent,
        OffersSectionComponent,
        OffersModalComponent,
        SliderPromoSectionComponent,
        SliderPromoModalComponent,
        ModalDialogComponent,
        SiteContactsComponent,
        KeyPeopleComponent,
        CustomerReviewsComponent,
        OurSponsoresComponent
    ],
    entryComponents: [ OffersModalComponent, SliderPromoModalComponent, ModalDialogComponent ],
    providers: [SelectedTabService, FroalaEditorService]
})
export class CustomizeModule {}
