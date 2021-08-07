import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookingsApiService } from 'build/openapi/api/bookings-api.service';
import { ActivitiesApiService } from 'build/openapi/api/activities-api.service';
import { Activity } from 'build/openapi/model/activity';
import { Booking } from 'build/openapi/model/booking';


@Component({
  selector: 'app-booking-creation-form',
  templateUrl: './booking-creation-form.component.html',
  styleUrls: ['./booking-creation-form.component.scss']
})
export class BookingCreationFormComponent implements OnInit {
  hours: string[] = [];
  activities: Activity[] = [];

  bookingForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required)
  });

  constructor(
    private bookingsApi: BookingsApiService,
    private activitiesApi: ActivitiesApiService
  ) { }

  ngOnInit(): void {
    this.getHours();
    this.getActivities();
  }

  getHours(): void {
    this.bookingsApi.getBookingTimes().subscribe(times => this.hours = times);
  }

  getActivities(): void {
    this.activitiesApi.getActivities().subscribe(activities => this.activities = activities);
  }

  createBooking(): void {
    const startHour = (this.bookingForm.get('startTime').value).split(':');
    const endHour = (this.bookingForm.get('endTime').value).split(':');

    const startTime = new Date(this.bookingForm.get('date').value);
    startTime.setHours(+startHour[0], +startHour[1], 0, 0);

    const endTime = new Date(this.bookingForm.get('date').value);
    endTime.setHours(+endHour[0], +endHour[1], 0, 0);

    const booking: Booking = {
      startTime: startTime.toLocalISOString(),
      endTime: endTime.toLocalISOString(),
      subject: this.bookingForm.get('subject').value,
      activityId: this.bookingForm.get('activity').value,
    };

    this.bookingsApi.createBooking(booking).subscribe();
  }
}
