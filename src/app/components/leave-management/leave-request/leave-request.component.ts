import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';
import { Staff, staffEmptyInitialObj } from '../../../core/models/staff.interface';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectAuthUserInfo } from '../../../store/selector/auth.selector';
import { LeaveBalanceSummaryComponent } from '../../../share/components/leave-balance-summary/leave-balance-summary.component';
import { APP_IMPORT } from '../../../app.import';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectLeaveType } from '../../../store/selector/master/leave-type.selector';
import { LeaveType } from '../../../core/models/master/leave-type.interface';
import { LeaveRecord } from '../../../core/models/leave.interface';
import * as leaveActions from '../../../store/action/leave.action';
import { selectLeave } from '../../../store/selector/leave.selector';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [
    APP_IMPORT,
    LeaveBalanceSummaryComponent
  ],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})
export class LeaveRequestComponent implements OnInit, OnDestroy {

  userInfo: Staff = staffEmptyInitialObj;
  leaveTypeListData: LeaveType[] = [];
  leaveRequestLoading: boolean = false;
  leaveRequestForm: FormGroup;
  totalLeaveDays: number = 0;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.leaveRequestForm = this.fb.group({
      leaveType: ['', Validators.required],
      dateRange: [[], [Validators.required]],
      phone: [''],
      reason: ['', Validators.required],
    });
  }

  // private subscriptions: Subscription = new Subscription();
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.leaveRequestLoading = true;
    combineLatest([
      this.store.select(selectAuthUserInfo),
      this.store.select(selectLeaveType),
      this.store.select(selectLeave)
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([userInfoRes, leaveTypeRes, leaveRes]) => {
        if (userInfoRes && leaveTypeRes) {
          this.userInfo = userInfoRes.userInfo.user;
          this.leaveTypeListData = leaveTypeRes.leaveType;
          this.leaveRequestLoading= leaveRes.leaveRequestLoading;
          if (leaveRes.leaveRequestLoading == false && leaveRes.error === null) {
              this.totalLeaveDays = 0;
              this.leaveRequestForm.reset();
            }
        }
        // if (leaveRes.leaveRequestLoading) {
        //   this.leaveRequestForm.disable();
        // } else if (leaveRes.leaveRequestLoading == false && leaveRes.error === null) {
        //   this.leaveRequestForm.enable();
        //   this.totalLeaveDays = 0;
        //   this.leaveRequestForm.reset();
        // } else if (leaveRes.leaveRequestLoading == false && leaveRes.error != null) {
        //   this.leaveRequestForm.enable();
        // }
      })
  }

  dateRangeOnChange(result: any[]): void {
    if (result != null && result.length == 2) {
      const diffTime = Math.abs(result[1].getTime() - result[0].getTime());
      this.totalLeaveDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } else {
      this.totalLeaveDays = 0;
    }
  }

  onSubmit(): void {
    if (!this.leaveRequestForm.valid) {
      Object.values(this.leaveRequestForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    } else {
      // this.leaveRequestForm.disable();
      // console.log('this.leaveRequestForm.value', this.leaveRequestForm.value);
      const applyLeaveData: LeaveRecord = {
        id: '',
        staffId: this.userInfo.staffId,
        // fullName: this.userInfo.fullName,
        applyDate: new Date(),
        leaveTypeId: this.leaveRequestForm.get('leaveType')?.value || '',
        takenDays: this.totalLeaveDays,
        startDate: this.leaveRequestForm.get('dateRange')?.value[0] || '',
        endDate: this.leaveRequestForm.get('dateRange')?.value[1] || '',
        phoneDuringLeave: this.leaveRequestForm.get('phone')?.value || '',
        reason: this.leaveRequestForm.get('reason')?.value || '',
        leaveStatus: 'Pending'
      }
      this.store.dispatch(leaveActions.applyLeave({ leaveData: applyLeaveData }));
    }
  }
  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
