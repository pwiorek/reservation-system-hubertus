import { Injectable } from '@angular/core';
import { BookingApiService } from '../../../data/api/booking-api.service';
import { HttpParams } from '@angular/common/http';
import { Booking } from '../../../data/entities/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private bookingsApi: BookingApiService
  ) { }

  getBookingsForRange(rangeStart: Date, rangeEnd: Date): Promise<Booking[]> {
    const params = new HttpParams()
      .set('rangeStart', rangeStart.toISOString().split('.')[0])
      .set('rangeEnd', rangeEnd.toISOString().split('.')[0]);

    return this.bookingsApi.getBookings(params).toPromise();
  }
}
