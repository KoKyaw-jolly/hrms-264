import { Component, OnInit } from '@angular/core';
import { defaultDepartmentObj, Department } from '../../../core/models/department.interface';
import { APP_IMPORT } from '../../../app.import';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { Subscription } from 'rxjs';
import { selectDepartment } from '../../../store/selector/department.selector';
import * as departmentActions from '../../../store/action/department.action';
import { ModalDetailsContentComponent } from '../../../share/components/modal-details-content/modal-details-content.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [
    APP_IMPORT,
    ModalDetailsContentComponent
  ],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent implements OnInit {

  departmentLoading: boolean = false;
  departmentListData: Department[] = [];

  departmentForm: FormGroup;

  createEditDepartmentModal: boolean = false;
  detailsDepartmentModal: boolean = false;

  createEditState: string = "create";
  selectedDepartmentObj: Department = defaultDepartmentObj;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    this.departmentForm = this.fb.group({
      id: [''],
      prefixId: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
    });
  }

  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectDepartment).subscribe(res => {
        this.departmentListData = res.department;
        this.departmentLoading = res.loading;
        if (res.loading == false && res.error == null) {
          this.closeModal();
        }
      })
    )
  }

  createDepartment(): void {
    this.createEditState = 'create';
    this.createEditDepartmentModal = true;
    this.departmentForm.reset();
  }

  editDepartment(department: Department): void {
    this.createEditState = 'edit';
    this.createEditDepartmentModal = true;
    this.departmentForm.setValue({
      id: department.id,
      prefixId: department.prefixId,
      name: department.name,
      description: department.description
    });
  }

  createEditDepartmentConfirm(): void {
    if (this.departmentForm.invalid) {
      Object.values(this.departmentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      const departmentData: Department = {
        id: this.createEditState == 'create' ? '' : this.departmentForm.get('id')?.value,
        prefixId: this.departmentForm.get('prefixId')?.value,
        name: this.departmentForm.get('name')?.value,
        description: this.departmentForm.get('description')?.value || '',
      }
      if (this.createEditState == 'create') {
        this.store.dispatch(departmentActions.createDepartment({ department: departmentData }));
      } else {
        this.store.dispatch(departmentActions.updateDepartment({ department: departmentData }));
      }
    }
  }

  deleteDepartment(department: Department): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${department.name}' ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(departmentActions.deleteDepartment({ id: department.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon	: undefined,
      nzWidth: 500
    });
  }

  deleteDepartmentConfirm(): void {
    this.store.dispatch(departmentActions.deleteDepartment({ id: this.selectedDepartmentObj.id }));
  }

  viewDetailsDepartment(department: Department): void {
    this.detailsDepartmentModal = true;
    this.selectedDepartmentObj = department;
  }

  closeModal(): void {
    this.modal.closeAll();
    this.resetForm();
  }

  resetForm(): void {
    this.departmentForm.setValue({
      id: '',
      prefixId: '',
      name: '',
      description: ''
    });
    this.departmentForm.reset();
  }
}