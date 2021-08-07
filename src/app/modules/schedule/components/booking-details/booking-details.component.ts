import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Booking } from 'build/openapi/model/booking';
import { User} from 'build/openapi/model/user';
import { Activity } from 'build/openapi/model/activity';
import { ActivitiesApiService } from 'build/openapi/api/activities-api.service';
import { UsersApiService } from 'build/openapi/api/users-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit, OnDestroy {
  user: User;
  activity: Activity;

  private _subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public booking: Booking,
    private userApi: UsersApiService,
    private activityApi: ActivitiesApiService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getActivity();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getUser(): void {
    this._subscription.add(this.userApi.getUserById(this.booking.userId).subscribe(user => this.user = user));
  }

  getActivity(): void {
    this._subscription.add(this.activityApi.getActivityById(this.booking.activityId).subscribe(activity => this.activity = activity));
  }

}
