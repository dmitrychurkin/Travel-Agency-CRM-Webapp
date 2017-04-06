import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminRegistrationRoutingModule } from './admin-registration-routing.module';
import { AdminRegistrationComponent } from './admin-registration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AdminRegistrationRoutingModule
  ],
  declarations: [AdminRegistrationComponent]
})
export class AdminRegistrationModule { }
