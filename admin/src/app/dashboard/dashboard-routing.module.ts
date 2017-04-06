import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { OrdersComponent } from './children/orders.component';
import { AuthGuard } from '../auth-guard.guard';
import {AdminCredentialsDataResolver} from '../admin-credentials-data.service';
import { FeaturesComponent } from './children/features.component';
import { DetailsComponent } from './children/details.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: DashboardComponent,
    resolve: {
        admin: AdminCredentialsDataResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'prefix'
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'features',
        component: FeaturesComponent
      },
      {
        path: 'details',
        component: DetailsComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
