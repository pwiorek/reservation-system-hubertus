import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/layout/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ScheduleComponent } from './modules/schedule/layouts/schedule/schedule.component';
import { BookingCreationFormComponent } from './modules/schedule/components/booking-creation-form/booking-creation-form.component';
import { UsersComponent } from './modules/administrator-panel/users-management/layouts/users/users.component';


const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'app', component: NavbarComponent, canActivate: [AuthGuard], children: [
      { path: 'schedule', component: ScheduleComponent },
      { path: 'booking', component: BookingCreationFormComponent },
      { path: 'admin', children: [
          { path: 'users', component: UsersComponent },
          { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]},
      { path: '', redirectTo: 'schedule', pathMatch: 'full' }
  ]},
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
