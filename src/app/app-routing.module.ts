import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/layout/login/login.component';


const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'app', component: NavbarComponent, children: [

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
