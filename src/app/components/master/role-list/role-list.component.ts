import { Component, OnDestroy, OnInit } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { defaultRoleObj, Role } from '../../../core/models/master/role.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { Subscription } from 'rxjs';
import { selectRole } from '../../../store/selector/master/role.selector';
import * as roleActions from '../../../store/action/master/role.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDetailsContentComponent } from '../../../share/components/modal-details-content/modal-details-content.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    APP_IMPORT,
    ModalDetailsContentComponent
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit, OnDestroy {

  roleLoading: boolean = false;
  roleListData: Role[] = [];

  roleForm: FormGroup;
  moduleOptions = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'master', label: 'Master' },
    { value: 'staffManagement', label: 'Staff Management' },
    { value: 'attendanceManagement', label: 'Attendance Management' },
    { value: 'leaveManagement', label: 'Leave Management' },
    { value: 'payrollManagement', label: 'Payroll Management' },
    { value: 'generalSetting', label: 'General Setting' }
  ];

  createEditRoleModal: boolean = false;
  detailsRoleModal: boolean = false;

  createEditState: string = 'create';
  selectedRoleObj: Role = defaultRoleObj;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    this.roleForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      moduleAccess: [[], Validators.required],
      description: [''],
    });
  }
  
  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectRole).subscribe(res => {
        this.roleListData = res.role;
        this.roleLoading = res.loading;
        if (res.loading == false && res.error == null) {
          this.closeModal();
        }
      })
    )
  }

  createRole(): void {
    this.createEditState = 'create';
    this.createEditRoleModal = true;
    this.roleForm.reset();
  }

  editRole(role: Role): void {
    this.createEditState = 'edit';
    this.createEditRoleModal = true;
    this.roleForm.setValue({
      id: role.id,
      name: role.name,
      moduleAccess: role.moduleAccess,
      description: role.description
    });
  }

  createEditRoleConfirm(): void {
    if (this.roleForm.invalid) {
      Object.values(this.roleForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      const roleData: Role = {
        id: this.createEditState=='create'? '': this.roleForm.get('id')?.value,
        name: this.roleForm.get('name')?.value,
        moduleAccess: this.roleForm.get('moduleAccess')?.value,
        description: this.roleForm.get('description')?.value || '',
      }
      if (this.createEditState == 'create') {
        this.store.dispatch(roleActions.createRole({ role: roleData }));
      } else {
        this.store.dispatch(roleActions.updateRole({ role: roleData }));
      }
    }
  }

  deleteRole(role: Role): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${role.name}' ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(roleActions.deleteRole({ id: role.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon	: undefined,
      nzWidth: 500
    });
  }

  viewDetailsRole(role: Role): void {
    this.detailsRoleModal = true;
    this.selectedRoleObj = role;
  }

  closeModal(): void {
    this.modal.closeAll();
    this.resetForm();
  }

  resetForm(): void {
    this.roleForm.setValue({
      id: '',
      name: '',
      moduleAccess: [],
      description: ''
    });
    this.roleForm.reset();
  }

  onModuleAccessChange(event: any): void {
    const selectedModules = event.map((e: any) => e.nzValue);
    this.roleForm.get('moduleAccess')?.setValue(selectedModules);
  }

  isChecked(moduleValue: string): boolean {
    return this.roleForm.get('moduleAccess')?.value ? this.roleForm.get('moduleAccess')?.value.includes(moduleValue) : false;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
