import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRegistrationComponent } from './admin-registration.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRegistrationRoutingModule { }
