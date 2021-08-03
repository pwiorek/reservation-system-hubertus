import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Globals } from '../../globals';
import { Booking } from '../entities/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {

  constructor(
    private http: HttpClient,
    private globals: Globals,
  ) { }

  getBookings(params?: HttpParams): Observable<Booking[]> {
    const requestUrl = `${this.globals.BASE_URL}/bookings`;
    return this.http.get<Booking[]>(requestUrl, { params });
  }

  getBooking(bookingId: number): Observable<Booking> {
    const requestUrl = `${this.globals.BASE_URL}/bookings/${bookingId}`;
    return this.http.get<Booking>(requestUrl);
  }
}
