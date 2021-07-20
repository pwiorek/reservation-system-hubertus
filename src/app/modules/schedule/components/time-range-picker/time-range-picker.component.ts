import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateHandlerService } from '../../services/date-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time-range-picker',
  templateUrl: './time-range-picker.component.html',
  styleUrls: ['./time-range-picker.component.scss']
})
export class TimeRangePickerComponent implements OnInit, OnDestroy {
  week: Date[] = [];
  private _subscription: Subscription;

  constructor(
    private dateHandler: DateHandlerService,
  ) { }

  ngOnInit(): void {
    this.week = this.dateHandler.getWeekForDate(new Date('10.04.2021'));
    this.getCurrentWeek();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getCurrentWeek(): void {
    this.week = this.dateHandler.currentWeek;
    this._subscription = this.dateHandler.currentWeekChange.subscribe(week => this.week = week);
  }

  moveToNextWeek(): void {
    const date = new Date(this.week[0]);
    date.setDate(date.getDate() + 7);
    this.dateHandler.getWeekForDate(date);
  }

  moveToPreviousWeek(): void {
    const date = new Date(this.week[0]);
    date.setDate(date.getDate() - 7);
    this.dateHandler.getWeekForDate(date);
  }
}
