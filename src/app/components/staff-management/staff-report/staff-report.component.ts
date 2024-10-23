import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { APP_IMPORT } from '../../../app.import';
import { Staff } from '../../../core/models/staff.interface';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';
import { Position } from '../../../core/models/master/position.interface';
import { Department } from '../../../core/models/master/department.interface';
import { Role } from '../../../core/models/master/role.interface';
import { LeaveType } from '../../../core/models/master/leave-type.interface';
import { selectStaffLoading } from '../../../store/selector/staff.selector';
import { selectPosition } from '../../../store/selector/master/position.selector';
import { selectDepartment } from '../../../store/selector/master/department.selector';
import { selectRole } from '../../../store/selector/master/role.selector';
import { selectLeaveType } from '../../../store/selector/master/leave-type.selector';
import { StaffType } from '../../../core/models/master/staff-type.interface';
import { selectStaffType } from '../../../store/selector/master/staff-type.selector';

@Component({
  selector: 'app-staff-report',
  standalone: true,
  imports: [
    APP_IMPORT
  ],
  templateUrl: './staff-report.component.html',
  styleUrl: './staff-report.component.scss'
})
export class StaffReportComponent implements OnInit, OnDestroy {

  staffListData: Staff[] = [];
  staffListDataForTable: Staff[] = [];
  staffLoading: boolean = false;
  loadDataLoading: boolean = false;
  positionListData: Position[] = [];
  departmentListData: Department[] = [];
  roleListData: Role[] = [];
  leaveTypeListData: LeaveType[] = [];
  staffTypeListData: StaffType[] = [];
  isLoading: boolean = this.staffLoading && this.loadDataLoading;

  //search field
  gender: string|null = null;
  position: string|null = null;
  department: string|null = null;
  role: string|null = null;

  private subscribe: Subscription = new Subscription();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(state => state.staff.staff).subscribe(res => {
        this.staffListData = res;
        this.staffListDataForTable = res;
      })
    );

    this.subscribe.add(
      this.store.select(selectStaffLoading).subscribe(res => {
        this.staffLoading = res;
      })
    );

    this.loadData();
  }

  private loadData(): void {
    this.loadDataLoading = true;
    combineLatest([
      this.store.select(selectPosition),
      this.store.select(selectDepartment),
      this.store.select(selectRole),
      this.store.select(selectLeaveType),
      this.store.select(selectStaffType)
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([positionRes, departmentRes, roleRes, leaveTypeRes, staffTypeRes]) => {
        this.positionListData = positionRes.position;
        this.departmentListData = departmentRes.department;
        this.roleListData = roleRes.role;
        this.leaveTypeListData = leaveTypeRes.leaveType;
        this.staffTypeListData = staffTypeRes.staffType;
        this.loadDataLoading = false;
      });
  }

  getDepartmentName(id: string): string {
    const department = this.departmentListData.find(department => department.id === id);
    return department ? department.name : '';
  }

  getPositionName(id: string): string {
    const position = this.positionListData.find(position => position.id === id);
    return position ? position.name : '-';
  }

  getRoleName(id: string): string {
    const role = this.roleListData.find(role => role.id === id);
    return role ? role.name : '-';
  }

  getLeaveTypeName(id: string): string {
    const leaveType = this.leaveTypeListData.find(leaveType => leaveType.id === id);
    return leaveType ? leaveType.name : '-';
  }

  getStaffTypeName(id: string): string {
    const staffType = this.staffTypeListData.find(staffType => staffType.id === id);
    return staffType ? staffType.name : '-';
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  search() {
    this.staffListDataForTable = this.staffListData.filter(staff => {
      return (
        (this.gender === null || staff.gender === this.gender) &&
        (this.position === null || staff.positionId === this.position) &&
        (this.department === null || staff.departmentId === this.department) &&
        (this.role === null || staff.roleId === this.role)
      );
    });
  }
}
