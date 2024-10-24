import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeaveRecord } from '../../../core/models/leave.interface';
import { APP_IMPORT } from '../../../app.import';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectLeave } from '../../../store/selector/leave.selector';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { selectAuthUserInfo } from '../../../store/selector/auth.selector';
import { selectLeaveType } from '../../../store/selector/master/leave-type.selector';
import { Staff, staffEmptyInitialObj } from '../../../core/models/staff.interface';
import { LeaveType } from '../../../core/models/master/leave-type.interface';
import { selectStaffList, selectStaffState } from '../../../store/selector/staff.selector';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as leaveActions from '../../../store/action/leave.action';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [
    APP_IMPORT
  ],
  templateUrl: './leave-list.component.html',
  styleUrl: './leave-list.component.scss'
})
export class LeaveListComponent implements OnInit, OnDestroy {

  leaveLoading: boolean = false;
  staffListData: Staff[] = [];
  userInfo: Staff = staffEmptyInitialObj;
  leaveRecordAllListData: LeaveRecord[] = [];
  leaveTypeListData: LeaveType[] = [];
  leaveListTableData: LeaveRecord[] = [];
  leaveRecordStatus: string = '';

  dateRange = null;
  selectDate: Date | null = null;

  constructor(
    private store: Store<AppState>,
    private modal: NzModalService
  ) { }

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectStaffState),
      this.store.select(selectAuthUserInfo),
      this.store.select(selectLeaveType),
      this.store.select(selectLeave)
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([staffListRes, userInfoRes, leaveTypeRes, leaveRes]) => {

        this.staffListData = staffListRes.staff;
        this.userInfo = userInfoRes.userInfo.user;
        this.leaveTypeListData = leaveTypeRes.leaveType;
        this.leaveRecordAllListData = leaveRes.leaveRecordsAll;

        this.leaveLoading = staffListRes.loading || userInfoRes.loading || leaveTypeRes.loading || leaveRes.loading;
        this.search();
      })
  }

  approveLeave(leaveRecord: LeaveRecord) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to approve this leave request?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.store.dispatch(leaveActions.approveLeave({ leaveRecordId: leaveRecord.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon: undefined,
      nzWidth: 500
    });
  }

  rejectLeave(leaveRecord: LeaveRecord) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to reject this leave request?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(leaveActions.rejectLeave({ leaveRecordId: leaveRecord.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon: undefined,
      nzWidth: 500
    });
  }

  // details(leaveRecord: LeaveRecord): void {
  //   console.log('Details');
  // }

  getStaffName(staffId: string): string {
    const staff = this.staffListData.find(staff => staff.id === staffId);
    return staff ? staff.fullName : '';
  }

  getLeaveTypeName(leaveTypeId: string): string {
    const leaveType = this.leaveTypeListData.find(type => type.id === leaveTypeId);
    return leaveType ? leaveType.name : '';
  }

  search() {
      this.leaveListTableData = this.leaveRecordAllListData.filter(leaveRecord => {
        return (
          (this.selectDate === null || this.selectDate >= new Date(leaveRecord.startDate)) &&
          (this.selectDate === null || this.selectDate <= new Date(leaveRecord.endDate)) &&
          (this.leaveRecordStatus === null|| this.leaveRecordStatus === '' || this.leaveRecordStatus === leaveRecord.leaveStatus)
        )
      });
  }

  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
