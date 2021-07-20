import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './components/timetable/timetable.component';
import { MaterialModule } from '../../material.module';
import { TimeRangePickerComponent } from './components/time-range-picker/time-range-picker.component';
import { TodayButtonComponent } from './components/today-button/today-button.component';



@NgModule({
  declarations: [ TimetableComponent, TimeRangePickerComponent, TodayButtonComponent ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ScheduleModule { }
