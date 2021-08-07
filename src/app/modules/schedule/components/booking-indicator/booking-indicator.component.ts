import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Booking } from 'build/openapi/model/booking';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';

@Component({
  selector: 'app-booking-indicator',
  templateUrl: './booking-indicator.component.html',
  styleUrls: ['./booking-indicator.component.scss']
})
export class BookingIndicatorComponent implements OnInit {
  @Input() booking: Booking;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openBookingDetailsDialog(): void {
    this.dialog.open(BookingDetailsComponent, {
      data: {
        id: this.booking.id,
        creationTime: this.booking.creationTime,
        startTime: this.booking.startTime,
        endTime: this.booking.endTime,
        subject: this.booking.subject,
        activityId: this.booking.activityId,
        userId: this.booking.userId
      }
    });
  }

}
