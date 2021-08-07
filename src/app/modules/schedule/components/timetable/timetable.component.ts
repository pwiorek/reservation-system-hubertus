import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { ViewBreakpoints } from 'src/app/globals';
import { DateHandlerService } from '../../services/date-handler.service';
import { Subscription } from 'rxjs';
import { BookingsApiService } from 'build/openapi/api/bookings-api.service';
import { Booking } from 'build/openapi/model/booking';



@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit, OnDestroy {
  week: Date[];
  hours: string[] = [];
  days: string[] = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
  bookings: Booking[] = [];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private _subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private dateHandler: DateHandlerService,
    private bookingsApi: BookingsApiService
  ) { }

  ngOnInit(): void {
    this.detectMediaQuery();
    this._subscription.add(this.bookingsApi.getBookingTimes().subscribe(hours => {
      this.hours = hours;
      this.initTimetable();
    }));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this._subscription.unsubscribe();
  }

  private detectMediaQuery(): void {
    this.mobileQuery = this.media.matchMedia(`(max-width: ${ViewBreakpoints.phone})`);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  initTimetable(): void {
    this._subscription.add(this.dateHandler.currentWeekChange.subscribe(week => {
      this.week = week;
      this.getBookings(new Date(this.week[0]), new Date(this.week[6])).then(b => this.bookings = b);
    }));
  }

  async getBookings(rangeStart: Date, rangeEnd: Date): Promise<Booking[]> {
    const startHour = this.hours[0].split(':');
    const endHour = this.hours[this.hours.length - 1].split(':');

    rangeStart.setHours(+startHour[0], +startHour[1], 0, 0);
    rangeEnd.setHours(+endHour[0], +endHour[1], 0, 0);

    const rangeStartString = rangeStart.toLocalISOString();
    const rangeEndString = rangeEnd.toLocalISOString();

    const bookings = await this.bookingsApi.filterBookings(rangeStartString, rangeEndString).toPromise();
    bookings.forEach(booking => {
      booking.startTime = String(new Date(booking.startTime).getTime());
      booking.endTime = String(new Date(booking.endTime).getTime());
    });

    return bookings.sort((a, b) => +a.startTime - +b.startTime);
  }

  isCorrectTimestamp(booking: Booking, day: Date, hour: string): boolean {
    const startTime = new Date(day);
    startTime.setHours(+hour.split(':')[0], +hour.split(':')[1], 0, 0);
    return +booking.startTime <= startTime.getTime() && +booking.endTime > startTime.getTime();
  }
}
