import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../store/state/app.state';
import { Store } from '@ngrx/store';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';
import { selectStaffLoading, selectStaffState } from '../../../store/selector/staff.selector';
import { Staff, staffEmptyInitialObj } from '../../../core/models/staff.interface';
import { APP_IMPORT } from '../../../app.import';
import { selectPosition } from '../../../store/selector/position.selector';
import { selectDepartment } from '../../../store/selector/department.selector';
import { selectRole } from '../../../store/selector/role.selector';
import { selectLeaveType } from '../../../store/selector/leave-type.selector';
import { Position } from '../../../core/models/position.interface';
import { Department } from '../../../core/models/department.interface';
import { Role } from '../../../core/models/role.interface';
import { LeaveType } from '../../../core/models/leave-type.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as staffActions from '../../../store/action/staff.action';
import { Router } from '@angular/router';
import { ModalDetailsContentComponent } from '../../../share/components/modal-details-content/modal-details-content.component';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [
    APP_IMPORT,
    ModalDetailsContentComponent
  ],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent implements OnInit, OnDestroy {

  staffLoading: boolean = false;
  staffList: Staff[] = [];

  listStyle: string = 'card';

  private unsubscribe$ = new Subject<void>();
  loadDataLoading: boolean = false;
  positionListData: Position[] = [];
  departmentListData: Department[] = [];
  roleListData: Role[] = [];
  leaveTypeListData: LeaveType[] = [];

  detailsStaffModal: boolean = false;
  selectedStaffObj: Staff = staffEmptyInitialObj;

  isLoading: boolean = this.staffLoading && this.loadDataLoading;

  constructor(
    private store: Store<AppState>,
    private modal: NzModalService,
    private router: Router
  ) { }

  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectStaffState).subscribe(res => {
        this.staffList = res.staff;
      })
    );

    this.subscribe.add(
      this.store.select(selectStaffLoading).subscribe(res => {
        this.staffLoading = res;
      })
    );

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  private loadData(): void {
    this.loadDataLoading = true;
    combineLatest([
      this.store.select(selectPosition),
      this.store.select(selectDepartment),
      this.store.select(selectRole),
      this.store.select(selectLeaveType)
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([positionRes, departmentRes, roleRes, leaveTypeRes]) => {
        this.positionListData = positionRes.position;
        this.departmentListData = departmentRes.department;
        this.roleListData = roleRes.role;
        this.leaveTypeListData = leaveTypeRes.leaveType;
        this.loadDataLoading = false;
      });
  }

  getDepartmentName(id: string): string {
    const department = this.departmentListData.find(department => department.id === id);
    return department ? department.name : '';
  }

  getPositionName(id: string): string {
    const position = this.positionListData.find(position => position.id === id);
    return position ? position.name : '';
  }

  getRoleName(id: string): string {
    const role = this.roleListData.find(role => role.id === id);
    return role ? role.name : '';
  }

  getLeaveTypeName(id: string): string {
    const leaveType = this.leaveTypeListData.find(leaveType => leaveType.id === id);
    return leaveType ? leaveType.name : '';
  }

  deleteStaff(staff: Staff): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${staff.fullName}' ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(staffActions.deleteStaff({ id: staff.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon: undefined,
      nzWidth: 500
    });
  }

  editStaff(id: string): void {
    this.router.navigate(['/staff-management/staff-list/staff-edit/'+id]);
  }

  detailsStaff(staff: Staff): void {
    this.detailsStaffModal = true;
    this.selectedStaffObj = staff;
  }

  closeModal(): void {
    this.modal.closeAll();
  }
}
