import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoToHomeComponent } from './go-to-home.component';

const routes: Routes = [
  {
    path: '**',
    component: GoToHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoToHomeModule { }
