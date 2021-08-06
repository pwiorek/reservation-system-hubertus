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
  hours: Date[] = [];
  days: string[] = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
  bookings: Booking[] = [];

  // TODO: Fetch from api
  startHour = '10:30';
  endHour = '20:30';
  interval = 30;

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
    this.hours = this.getHoursRange(this.startHour, this.endHour, this.interval);
    this.initTimetable();
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

  getHoursRange(startHour: string, endHour: string, intervalMinutes: number): Date[] {
    const hours: Date[] = [];

    const startTime = convertTimeStringToDate(startHour);
    const endTime = convertTimeStringToDate(endHour);

    while (startTime.getTime() <= endTime.getTime()) {
      hours.push(new Date(startTime));
      startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
    }

    return hours;

    function convertTimeStringToDate(time: string): Date {
      const dateTime = new Date();
      dateTime.setHours(Number(time.split(':')[0]));
      dateTime.setMinutes(Number(time.split(':')[1]));

      return dateTime;
    }
  }

  initTimetable(): void {
    this._subscription.add(this.dateHandler.currentWeekChange.subscribe(week => {
      this.week = week;
      this.getBookings(new Date(this.week[0]), new Date(this.week[6])).then(b => this.bookings = b);
    }));
  }

  async getBookings(rangeStart: Date, rangeEnd: Date): Promise<Booking[]> {
    rangeStart.setHours(+this.startHour.split(':')[0], +this.startHour.split(':')[1], 0, 0);
    rangeEnd.setHours(+this.endHour.split(':')[0], +this.endHour.split(':')[1], 0, 0);

    const rangeStartString = rangeStart.toLocalISOString();
    const rangeEndString = rangeEnd.toLocalISOString();

    const bookings = await this.bookingsApi.filterBookings(rangeStartString, rangeEndString).toPromise();
    bookings.forEach(booking => {
      booking.startTime = String(new Date(booking.startTime).getTime());
      booking.endTime = String(new Date(booking.endTime).getTime());
    });

    return bookings.sort((a, b) => +a.startTime - +b.startTime);
  }

  isCorrectTimestamp(booking: Booking, day: Date, hour: Date): boolean {
    const startTime = new Date(day);
    startTime.setHours(hour.getHours(), hour.getMinutes(), 0, 0);
    return +booking.startTime <= startTime.getTime() && +booking.endTime > startTime.getTime();
  }
}
