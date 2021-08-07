import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from 'build/openapi/api.module';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { Globals } from './globals';
import { JwtInterceptor } from './auth/services/jwt-interceptor.service';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { MyDateAdapter } from './utilities/my-date-adapter';

import 'src/app/utilities/date-utilities';



registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule,
    MaterialModule,
    AuthModule,
    SharedModule,
    ScheduleModule,
  ],
  providers: [
    Globals,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: DateAdapter, useClass: MyDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
