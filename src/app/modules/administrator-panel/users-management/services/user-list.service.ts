import { Injectable } from '@angular/core';
import { User } from 'build/openapi/model/user';
import { UsersApiService } from 'build/openapi/api/users-api.service';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  users: User[];

  filteredUsers: User[];
  filteredUsersChange: Subject<User[]> = new ReplaySubject(1);

  constructor(
    private usersApi: UsersApiService
  ) {
    this.getUsers();
  }

  getUsers(): void {
    this.usersApi.getUsers().subscribe(users => {
        this.users = users;
        this.setFilteredUsers(this.users);
    });
  }

  filterUsers(term: string): void {
    const users = this.users.filter(value => value.name.toLowerCase().includes(term.toLowerCase()));
    this.setFilteredUsers(users);
  }

  setFilteredUsers(users: User[]): void {
    this.filteredUsers = users;
    this.filteredUsersChange.next(this.filteredUsers);
  }
}
