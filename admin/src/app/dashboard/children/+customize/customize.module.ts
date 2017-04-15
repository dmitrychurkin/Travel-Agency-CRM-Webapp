import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './customize.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CustomizeRoutingModule,
        FlexLayoutModule
    ],
    declarations: [CustomizeComponent]
})
export class CustomizeModule {}
