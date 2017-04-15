import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomizeComponent } from './customize.component';

const ROUTES: Routes = [
    {
        path: '',
        component: CustomizeComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [RouterModule]
})
export class CustomizeRoutingModule {}
