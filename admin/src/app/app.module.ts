import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AuthGuard } from './auth-guard.guard';
import { AdminCredentialsDataResolver } from './admin-credentials-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoToHomeComponent } from './go-to-home.component';
import { GoToHomeModule } from './go-to-home-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { BackendService } from './backend.service';
import { AdminCredentialsStorageService } from './admin-credentials-storage.service';
import { AppErrorHandler, ErrorEmmiter } from './error.service';
import { ProgressBarService } from './progress-bar.service';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    GoToHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    DashboardModule,
    LoginModule,
    GoToHomeModule
  ],
  providers: [
      BackendService,
      AuthGuard,
      AdminCredentialsDataResolver,
      AdminCredentialsStorageService,
      ErrorEmmiter,
      AppErrorHandler,
      ProgressBarService,
      [{provide: ErrorHandler, useClass: AppErrorHandler}]
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
