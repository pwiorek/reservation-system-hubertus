import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { Globals } from './globals';
import { JwtInterceptor } from './auth/services/jwt-interceptor.service';
import { ScheduleModule } from './modules/schedule/schedule.module';


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
    MaterialModule,
    AuthModule,
    SharedModule,
    ScheduleModule,
  ],
  providers: [
    Globals,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pl'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
