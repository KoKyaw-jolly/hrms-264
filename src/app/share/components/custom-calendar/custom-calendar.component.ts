import { Component, Input, input, OnInit } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { selectHoliday } from '../../../store/selector/holiday.selector';
import { Subscription } from 'rxjs';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { Holiday } from '../../../core/models/holiday.interface';

@Component({
  selector: 'app-custom-calendar',
  standalone: true,
  imports: [
    APP_IMPORT
  ],
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.scss'
})
export class CustomCalendarComponent implements OnInit {

@Input() calendarType: string = 'medium';

  holidayListData: Holiday[] = [];
  holidayLoading: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }
  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectHoliday).subscribe(res => {
        this.holidayListData = res.holiday;
        this.holidayLoading = res.loading;
      })
    )
  }

  isHoliday(date: Date): boolean {
    return this.holidayListData.some(val => {
      return new Date(val.date).toDateString() === date.toDateString();
    });
  }
  isHolidayName(date: Date): Holiday | undefined {
    return this.holidayListData.find(val => new Date(val.date).toDateString() === date.toDateString());
  }

  isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

}