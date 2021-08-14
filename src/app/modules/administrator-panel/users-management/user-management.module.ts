import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './layouts/users/users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MaterialModule } from 'src/app/material.module';
import { UserSearchComponent } from './components/user-search/user-search.component';



@NgModule({
  declarations: [UsersComponent, UserListComponent, UserSearchComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class UserManagementModule { }
