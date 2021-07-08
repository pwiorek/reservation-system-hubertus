import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './layout/login/login.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ],
})
export class AuthModule { }
