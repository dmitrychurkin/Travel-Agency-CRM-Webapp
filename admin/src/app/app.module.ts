import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth-guard.guard';
import { AdminCredentialsDataResolver } from './admin-credentials-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoToHomeComponent } from './go-to-home.component';
import { GoToHomeModule } from './go-to-home-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { BackendService } from './backend.service';


@NgModule({
  declarations: [
    AppComponent,
    GoToHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    DashboardModule,
    LoginModule,
    GoToHomeModule
  ],
  providers: [BackendService, AuthGuard, AdminCredentialsDataResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
