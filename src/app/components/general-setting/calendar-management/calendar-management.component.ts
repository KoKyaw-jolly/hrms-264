import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultHolidayObj, Holiday } from '../../../core/models/holiday.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { selectHoliday } from '../../../store/selector/holiday.selector';
import * as holidayActions from'../../../store/action/holiday.action';
import { APP_IMPORT } from '../../../app.import';
import { ModalDetailsContentComponent } from '../../../share/components/modal-details-content/modal-details-content.component';

@Component({
  selector: 'app-calendar-management',
  standalone: true,
  imports: [
    APP_IMPORT,
    ModalDetailsContentComponent
  ],
  templateUrl: './calendar-management.component.html',
  styleUrl: './calendar-management.component.scss'
})
export class CalendarManagementComponent implements OnInit, OnDestroy {

  holidayLoading: boolean = false;
  holidayListData: Holiday[] = [];

  holidayForm: FormGroup;

  createEditHolidayModal: boolean = false;
  detailsHolidayModal: boolean = false;

  createEditState: string = "create";
  selectedHolidayObj: Holiday = defaultHolidayObj;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    this.holidayForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      date: [new Date(), Validators.required],
      description: [''],
    });
  }

  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectHoliday).subscribe(res => {
        this.holidayListData = res.holiday;
        this.holidayLoading = res.loading;
        if (res.loading == false && res.error == null) {
          this.closeModal();
        }
      })
    )
  }

  createHoliday(): void {
    this.createEditState = 'create';
    this.createEditHolidayModal = true;
    this.holidayForm.reset();
  }

  editHoliday(holiday: Holiday): void {
    this.createEditState = 'edit';
    this.createEditHolidayModal = true;
    this.holidayForm.setValue({
      id: holiday.id,
      name: holiday.name,
      date: holiday.date,
      description: holiday.description
    });
  }

  createEditHolidayConfirm(): void {
    if (this.holidayForm.invalid) {
      Object.values(this.holidayForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      const holidayData: Holiday = {
        id: this.createEditState == 'create' ? '' : this.holidayForm.get('id')?.value,
        name: this.holidayForm.get('name')?.value,
        date: this.holidayForm.get('date')?.value,
        description: this.holidayForm.get('description')?.value || '',
      }
      if (this.createEditState == 'create') {
        this.store.dispatch(holidayActions.createHoliday({ holiday: holidayData }));
      } else {
        this.store.dispatch(holidayActions.updateHoliday({ holiday: holidayData }));
      }
    }
  }

  deleteHoliday(holiday: Holiday): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${holiday.name}' ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(holidayActions.deleteHoliday({ id: holiday.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon	: undefined,
      nzWidth: 500
    });
  }

  deleteHolidayConfirm(): void {
    this.store.dispatch(holidayActions.deleteHoliday({ id: this.selectedHolidayObj.id }));
  }

  viewDetailsHoliday(holiday: Holiday): void {
    this.detailsHolidayModal = true;
    this.selectedHolidayObj = holiday;
  }

  closeModal(): void {
    this.modal.closeAll();
    this.resetForm();
  }

  resetForm(): void {
    this.holidayForm.setValue({
      id: '',
      name: '',
      date: new Date(),
      description: ''
    });
    this.holidayForm.reset();
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}