import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './customize.component';
import { FileStorageComponent } from './file-storage.component';
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
        FileStorageComponent
    ],
    providers: [SelectedTabService]
})
export class CustomizeModule {}
