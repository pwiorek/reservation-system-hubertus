import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { UserListService } from '../../services/user-list.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, OnDestroy {
  private searchTerms: Subject<string> = new Subject<string>();
  private _subscription = new Subscription();

  constructor(
    private userList: UserListService
  ) { }

  ngOnInit(): void {
    this._subscription.add(this.searchTerms.subscribe(term => this.userList.filterUsers(term)));
  }

  ngOnDestroy(): void {
    this.searchTerm('');
    this._subscription.unsubscribe();
  }

  searchTerm(term: string): void {
    this.searchTerms.next(term);
  }
}
