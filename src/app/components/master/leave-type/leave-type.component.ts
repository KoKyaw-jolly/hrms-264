import { Component } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { ModalDetailsContentComponent } from '../../../share/components/modal-details-content/modal-details-content.component';
import { defaultLeaveTypeObj, LeaveType } from '../../../core/models/leave-type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { Subscription } from 'rxjs';
import { selectLeaveType } from '../../../store/selector/master/leave-type.selector';
import * as leaveTypeActions from '../../../store/action/master/leave-type.action';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-leave-type',
  standalone: true,
  imports: [
    APP_IMPORT,
    ModalDetailsContentComponent
  ],
  templateUrl: './leave-type.component.html',
  styleUrl: './leave-type.component.scss'
})
export class LeaveTypeComponent {

  leaveTypeLoading: boolean = false;
  leaveTypeListData: LeaveType[] = [];

  leaveTypeForm: FormGroup;

  createEditLeaveTypeModal: boolean = false;
  detailsLeaveTypeModal: boolean = false;

  createEditState: string = "create";
  selectedLeaveTypeObj: LeaveType = defaultLeaveTypeObj;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    this.leaveTypeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      allowDaysPerYear: [0],
    });
  }

  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectLeaveType).subscribe(res => {
        this.leaveTypeListData = res.leaveType;
        this.leaveTypeLoading = res.loading;
        if (res.loading == false && res.error == null) {
          this.closeModal();
        }
      })
    )
  }

  createLeaveType(): void {
    this.createEditState = 'create';
    this.createEditLeaveTypeModal = true;
    this.leaveTypeForm.reset();
  }

  editLeaveType(leaveType: LeaveType): void {
    this.createEditState = 'edit';
    this.createEditLeaveTypeModal = true;
    this.leaveTypeForm.setValue({
      id: leaveType.id,
      name: leaveType.name,
      description: leaveType.description,
      allowDaysPerYear: leaveType.allowDaysPerYear
    });
  }

  createEditLeaveTypeConfirm(): void {
    if (this.leaveTypeForm.invalid) {
      Object.values(this.leaveTypeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      const leaveTypeData: LeaveType = {
        id: this.createEditState == 'create' ? '' : this.leaveTypeForm.get('id')?.value,
        name: this.leaveTypeForm.get('name')?.value,
        description: this.leaveTypeForm.get('description')?.value || '',
        allowDaysPerYear: this.leaveTypeForm.get('allowDaysPerYear')?.value || 0
      }
      if (this.createEditState == 'create') {
        this.store.dispatch(leaveTypeActions.createLeaveType({ leaveType: leaveTypeData }));
      } else {
        this.store.dispatch(leaveTypeActions.updateLeaveType({ leaveType: leaveTypeData }));
      }
    }
  }

  deleteLeaveType(leaveType: LeaveType): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${leaveType.name}' ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(leaveTypeActions.deleteLeaveType({ id: leaveType.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon	: undefined,
      nzWidth: 500
    });
  }

  viewDetailsLeaveType(leaveType: LeaveType): void {
    this.detailsLeaveTypeModal = true;
    this.selectedLeaveTypeObj = leaveType;
  }

  closeModal(): void {
    this.modal.closeAll();
    this.resetForm();
  }

  resetForm(): void {
    this.leaveTypeForm.setValue({
      id: '',
      name: '',
      description: '',
      allowDaysPerYear: 0
    });
    this.leaveTypeForm.reset();
  }
}
