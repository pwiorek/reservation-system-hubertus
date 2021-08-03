import { Injectable } from '@angular/core';
import { ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {
  currentWeek: Date[] = [];
  currentWeekChange: Subject<Date[]> = new ReplaySubject<Date[]>(1);

  constructor() {
    this.getWeekForDate(new Date());
  }

  getWeekForDate(date: Date): Date[] {
    const week: Date[] = [];
    const monday = this.getLastMonday(date);

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(day.getDate() + i);
      week.push(day);
    }

    this.setCurrentWeek(week);
    return week;
  }

  getLastMonday(date: Date): Date {
    const monday = new Date(date);
    const isSunday: boolean = date.getDay() === 0;

    if (isSunday) {
      monday.setDate(date.getDate() - date.getDay() - 6);
    } else {
      monday.setDate(date.getDate() - (date.getDay() - 1));
    }

    return monday;
  }

  setCurrentWeek(week: Date[]): void {
    this.currentWeek = week;
    this.currentWeekChange.next(this.currentWeek);
  }
}

