import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { LeaveType } from '../../../core/models/master/leave-type.interface';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectLeaveType } from '../../../store/selector/master/leave-type.selector';
import { StaffLeaveBalance } from '../../../core/models/staff.interface';
import { selectAuthUserInfo } from '../../../store/selector/auth.selector';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-leave-balance-summary',
  standalone: true,
  imports: [
    APP_IMPORT
  ],
  templateUrl: './leave-balance-summary.component.html',
  styleUrl: './leave-balance-summary.component.scss'
})
export class LeaveBalanceSummaryComponent implements OnInit, OnDestroy {

  leaveTypeList: LeaveType[] = [];
  leaveBalanceList: StaffLeaveBalance[] = [];
  loading: boolean = false;
  today: Date = new Date();
  // noLeaveBalance: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.loading = true;
    combineLatest([
      this.store.select(selectLeaveType),
      this.store.select(selectAuthUserInfo)
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([leaveTypeRes, userInfoRes]) => {
        this.leaveTypeList = leaveTypeRes.leaveType;
        this.leaveBalanceList = userInfoRes.userInfo.user.leaveBalance;
        console.log(this.leaveBalanceList);
        this.loading = false;
        // this.noLeaveBalance = this.leaveBalanceList.length == 0;
      });
  }

  getLeaveType(id: string): string {
    const leaveType = this.leaveTypeList.find(item => item.id === id);
    return leaveType ? leaveType.name : '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
