import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-calendar-full-view',
  standalone: true,
  imports: [
    NzCalendarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './calendar-full-view.component.html',
  styleUrl: './calendar-full-view.component.scss'
})
export class CalendarFullViewComponent {

  todayDate = new Date();
  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ]
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
