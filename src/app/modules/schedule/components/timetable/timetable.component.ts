import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { ViewBreakpoints } from 'src/app/globals';
import { DateHandlerService } from '../../services/date-handler.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit, OnDestroy {
  week: Date[];
  hours: Date[] = [];
  days: string[] = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];

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
    this.mobileQuery = this.media.matchMedia(`(max-width: ${ ViewBreakpoints.phone })`);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  getHoursRange(startHour: string, endHour: string, intervalMinutes: number): string[] {
    const hours: string[] = [];

    const startTime = convertStringToDate(startHour);
    const endTime = convertStringToDate(endHour);

    while (startTime.getTime() <= endTime.getTime()) {
      let minutes = String(startTime.getMinutes());
      if (minutes.length === 1) { minutes += '0'; }

      hours.push(String(startTime.getHours()) + ':' + minutes);
      startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
    }

    return hours;

    function convertStringToDate(time: string): Date {
      const dateTime = new Date();
      dateTime.setHours(Number(time.split(':')[0]));
      dateTime.setMinutes(Number(time.split(':')[1]));

      return dateTime;
    }
  }

  initTimetable(): void {
    this._subscription.add(this.dateHandler.currentWeekChange.subscribe(week => {
      this.week = week;
    }));
  }
}
