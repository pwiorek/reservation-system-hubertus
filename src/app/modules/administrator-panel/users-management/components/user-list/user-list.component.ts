import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from 'build/openapi/model/user';
import { UserListService } from '../../services/user-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];

  private _subscription: Subscription = new Subscription();

  constructor(
    private userList: UserListService
  ) {
  }

  ngOnInit(): void {
    this._subscription.add(this.userList.filteredUsersChange.subscribe(users => this.users = users));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
