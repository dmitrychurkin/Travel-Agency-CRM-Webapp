import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/orders',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: 'app/+admin-registration/admin-registration.module#AdminRegistrationModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
