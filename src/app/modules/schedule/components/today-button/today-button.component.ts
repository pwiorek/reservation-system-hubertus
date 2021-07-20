import { Component, OnInit } from '@angular/core';
import { DateHandlerService } from '../../services/date-handler.service';

@Component({
  selector: 'app-today-button',
  templateUrl: './today-button.component.html',
  styleUrls: ['./today-button.component.scss']
})
export class TodayButtonComponent implements OnInit {

  constructor(
    private dateHandler: DateHandlerService
  ) { }

  ngOnInit(): void {
  }

  setCurrentWeek(): void {
    this.dateHandler.getWeekForDate(new Date());
  }
}
