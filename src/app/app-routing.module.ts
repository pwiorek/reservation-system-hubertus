import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/layout/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'app', component: NavbarComponent, canActivate: [AuthGuard], children: [

  ]},
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
