import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription, takeUntil } from 'rxjs';
import { APP_IMPORT } from '../../../app.import';
import { AppState } from '../../../store/state/app.state';
import { StaffLeaveBalance, Staff, staffEmptyInitialObj } from '../../../core/models/staff.interface';
import { selectStaffById, selectStaffLoading } from '../../../store/selector/staff.selector';
import { Position } from '../../../core/models/master/position.interface';
import { Role } from '../../../core/models/master/role.interface';
import { Department } from '../../../core/models/master/department.interface';
import { selectPosition } from '../../../store/selector/master/position.selector';
import { selectDepartment } from '../../../store/selector/master/department.selector';
import { selectRole } from '../../../store/selector/master/role.selector';
import { selectLeaveType } from '../../../store/selector/master/leave-type.selector';
import { LeaveType } from '../../../core/models/master/leave-type.interface';
import { Subject } from 'rxjs';
import * as staffActions from '../../../store/action/staff.action';
import { StaffType } from '../../../core/models/master/staff-type.interface';
import { selectStaffType } from '../../../store/selector/master/staff-type.selector';

@Component({
  selector: 'app-staff-create-edit',
  standalone: true,
  imports: [APP_IMPORT],
  templateUrl: './staff-create-edit.component.html',
  styleUrls: ['./staff-create-edit.component.scss']
})
export class StaffCreateEditComponent implements OnInit, OnDestroy {
  staffLoading = false;
  staffId = '';
  staffData: Staff | null = null;
  isEdit = false;
  staffForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  positionListData: Position[] = [];
  positionListByDepData: Position[] = [];
  departmentListData: Department[] = [];
  roleListData: Role[] = [];
  leaveTypeListData: LeaveType[] = [];
  staffTypeListData: StaffType[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.staffForm = this.fb.group({
      id: [''],
      staffId: [''],
      fullName: ['', Validators.required],
      image: [''],
      gender: ['', Validators.required],
      birthday: [null, Validators.required],
      positionId: ['', Validators.required],
      departmentId: ['', Validators.required],
      staffTypeId: ['', Validators.required],
      roleId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      // leaveBalance: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.staffLoading = true;
    this.route.paramMap.subscribe(params => {
      this.staffId = params.get('id') || '';
      this.isEdit = !!this.staffId;
      if (this.isEdit) {
        this.fetchStaffDetails(this.staffId);
      }
    });
    this.loadDropdownData();

    this.store.select(selectStaffLoading).subscribe(res => {
      this.staffLoading = res;
    })
  }

  private loadDropdownData(): void {
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
        this.staffLoading = false;
      });
  }

  private fetchStaffDetails(id: string): void {
    this.staffLoading = true;
    this.subscriptions.add(
      this.store.select(selectStaffById(id)).subscribe(res => {
        this.staffData = res ?? staffEmptyInitialObj;
        this.initializeCreateForm(this.staffData);
        this.staffLoading = false;
      })
    );
  }
  
  private initializeCreateForm(data: Staff): void {
    this.staffForm.setValue({
      id: data.id,
      staffId: data.staffId,
      fullName: data.fullName,
      image: data.image,
      gender: data.gender,
      birthday: new Date(data.birthday),
      positionId: data.positionId,
      departmentId: data.departmentId,
      staffTypeId: data.staffTypeId,
      roleId: data.roleId,
      email: data.email,
      phone: data.phone,
      address: data.address,
      // leaveBalance: [],
    });
  }

  onDepartmentChange(event: any): void {
    this.staffForm.controls['positionId'].reset();
    const selectedDepartmentId = event;
    this.positionListByDepData = this.positionListData.filter(position => {
      return position.departmentId === selectedDepartmentId
    });
  }

  createEditStaff(): void {
    if (this.staffForm.invalid) {
      Object.values(this.staffForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      const staffData: Staff = {
        id: this.staffForm.get('id')?.value,
        staffId: this.staffForm.get('staffId')?.value,
        fullName: this.staffForm.get('fullName')?.value,
        image: this.staffForm.get('image')?.value,
        gender: this.staffForm.get('gender')?.value,
        birthday: this.staffForm.get('birthday')?.value,
        positionId: this.staffForm.get('positionId')?.value,
        departmentId: this.staffForm.get('departmentId')?.value,
        staffTypeId: this.staffForm.get('staffTypeId')?.value,
        roleId: this.staffForm.get('roleId')?.value,
        email: this.staffForm.get('email')?.value,
        phone: this.staffForm.get('phone')?.value,
        address: this.staffForm.get('address')?.value,
        leaveBalance: [],
      }
      
      if (!this.isEdit) {
        this.store.dispatch(staffActions.createStaff({ staff: staffData }));
      } else {
        this.store.dispatch(staffActions.updateStaff({ staff: staffData }));
      }
    }
  }

  backToStaffList(): void {
    this.router.navigate(['/staff-management/staff-list']);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
