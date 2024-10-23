import { Component } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { ModalDetailsContentComponent } from '../../../share/components/modal-details-content/modal-details-content.component';
import { defaultStaffTypeObj, LeaveBalance, StaffType } from '../../../core/models/master/staff-type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { Subscription } from 'rxjs';
import { selectStaffType } from '../../../store/selector/master/staff-type.selector';
import * as staffTypeActions from '../../../store/action/master/staff-type.action';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LeaveType } from '../../../core/models/master/leave-type.interface';
import { selectLeaveType } from '../../../store/selector/master/leave-type.selector';

@Component({
  selector: 'app-staff-type',
  standalone: true,
  imports: [
    APP_IMPORT,
    ModalDetailsContentComponent
  ],
  templateUrl: './staff-type.component.html',
  styleUrl: './staff-type.component.scss'
})
export class StaffTypeComponent {

  staffTypeLoading: boolean = false;
  staffTypeListData: StaffType[] = [];

  staffTypeForm: FormGroup;

  //for leave balance list
  leaveTypeListData: LeaveType[] = [];
  leaveTypeId: string = '';
  leaveBalance: number = 0;
  leaveBalanceList: LeaveBalance[] = [];

  createEditStaffTypeModal: boolean = false;
  detailsStaffTypeModal: boolean = false;

  createEditState: string = "create";
  selectedStaffTypeObj: StaffType = defaultStaffTypeObj;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    this.staffTypeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['']
    });
  }

  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectStaffType).subscribe(res => {
        this.staffTypeListData = res.staffType;
        this.staffTypeLoading = res.loading;
        if (res.loading == false && res.error == null) {
          this.closeModal();
        }
      })
    );
    this.subscribe.add(
      this.store.select(selectLeaveType).subscribe(res => {
        this.leaveTypeListData = res.leaveType;
      })
    );
  }

  createStaffType(): void {
    this.createEditState = 'create';
    this.createEditStaffTypeModal = true;
    this.staffTypeForm.reset();
  }

  editStaffType(staffType: StaffType): void {
    this.createEditState = 'edit';
    this.createEditStaffTypeModal = true;
    this.staffTypeForm.setValue({
      id: staffType.id,
      name: staffType.name,
      description: staffType.description
    });
  }

  createEditStaffTypeConfirm(): void {
    if (this.staffTypeForm.invalid) {
      Object.values(this.staffTypeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      const staffTypeData: StaffType = {
        id: this.createEditState == 'create' ? '' : this.staffTypeForm.get('id')?.value,
        name: this.staffTypeForm.get('name')?.value,
        description: this.staffTypeForm.get('description')?.value || '',
        leaveBalance: this.leaveBalanceList.length == 0 ? [] : this.leaveBalanceList
      }
      if (this.createEditState == 'create') {
        this.store.dispatch(staffTypeActions.createStaffType({ staffType: staffTypeData }));
      } else {
        this.store.dispatch(staffTypeActions.updateStaffType({ staffType: staffTypeData }));
      }
    }
  }

  deleteStaffType(staffType: StaffType): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${staffType.name}' ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(staffTypeActions.deleteStaffType({ id: staffType.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon: undefined,
      nzWidth: 500
    });
  }

  viewDetailsStaffType(staffType: StaffType): void {
    this.detailsStaffTypeModal = true;
    this.selectedStaffTypeObj = staffType;
  }

  closeModal(): void {
    this.modal.closeAll();
    this.resetForm();
  }

  resetForm(): void {
    this.staffTypeForm.setValue({
      id: '',
      name: '',
      description: ''
    });
    this.staffTypeForm.reset();
    this.leaveBalanceList = [];
    this.leaveTypeId = '';
    this.leaveBalance = 0;
  }

  //leave balance
  getLeaveTypeName(id: string): string {
    const leaveType = this.leaveTypeListData.find(leaveType => leaveType.id === id);
    return leaveType ? leaveType.name : '';
  }
  addToLeaveBalanceList(): void {
    if (this.leaveBalanceList.find(item => item.leaveTypeId === this.leaveTypeId)) {
      this.deleteFromLeaveBalanceList(this.leaveTypeId);
    }
    this.leaveBalanceList.push(
      {
        leaveTypeId: this.leaveTypeId,
        balance: this.leaveBalance ? this.leaveBalance : 0
      }
    );
    console.log(this.leaveBalanceList);
  }
  deleteFromLeaveBalanceList(id: string): void {
    this.leaveBalanceList = this.leaveBalanceList.filter(item => item.leaveTypeId != id);
    console.log(this.leaveBalanceList);
  }
}
