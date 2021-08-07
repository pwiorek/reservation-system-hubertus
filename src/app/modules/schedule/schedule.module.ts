import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';

import { TimetableComponent } from './components/timetable/timetable.component';
import { MaterialModule } from '../../material.module';
import { TimeRangePickerComponent } from './components/time-range-picker/time-range-picker.component';
import { TodayButtonComponent } from './components/today-button/today-button.component';
import { BookingCreationFormComponent } from './components/booking-creation-form/booking-creation-form.component';
import { BookingIndicatorComponent} from './components/booking-indicator/booking-indicator.component';


@NgModule({
  declarations: [ TimetableComponent, TimeRangePickerComponent, TodayButtonComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder
  ]
})
export class ScheduleModule { }
