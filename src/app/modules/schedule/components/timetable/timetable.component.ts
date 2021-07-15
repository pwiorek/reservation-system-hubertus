import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  week: string[] = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
  hours: string[] = [];

  startHour = '10:30';
  endHour = '20:30';

  constructor() { }

  ngOnInit(): void {
    this.hours = this.getHoursRange(this.startHour, this.endHour, 30);
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

}
