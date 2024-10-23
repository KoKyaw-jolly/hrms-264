import { Component } from '@angular/core';
import { defaultPositionObj, Position } from '../../../core/models/master/position.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { Subscription } from 'rxjs';
import * as positionActions from '../../../store/action/master/position.action';
import { selectPosition } from '../../../store/selector/master/position.selector';
import { APP_IMPORT } from '../../../app.import';
import { ModalDetailsContentComponent } from '../../../share/components/modal-details-content/modal-details-content.component';
import { selectDepartment } from '../../../store/selector/master/department.selector';
import { Department } from '../../../core/models/master/department.interface';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [
    APP_IMPORT,
    ModalDetailsContentComponent
  ],
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.scss'
})
export class PositionListComponent {
  positionLoading: boolean = false;
  positionListData: Position[] = [];

  departmentLoading: boolean = false;
  departmentListData: Department[] = [];

  positionForm: FormGroup;

  createEditPositionModal: boolean = false;
  detailsPositionModal: boolean = false;

  createEditState: string = "create";
  selectedPositionObj: Position = defaultPositionObj;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {
    this.positionForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
      description: [''],
    });
  }

  private subscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribe.add(
      this.store.select(selectPosition).subscribe(res => {
        this.positionListData = res.position;
        this.positionLoading = res.loading;
        if (res.loading == false && res.error == null) {
          this.closeModal();
        }
      })
    )
    this.subscribe.add(
      this.store.select(selectDepartment).subscribe(res => {
        this.departmentListData = res.department;
        this.departmentLoading = res.loading;
      })
    )
  }

  createPosition(): void {
    this.createEditState = 'create';
    this.createEditPositionModal = true;
    this.positionForm.reset();
  }

  editPosition(position: Position): void {
    this.createEditState = 'edit';
    this.createEditPositionModal = true;
    this.positionForm.setValue({
      id: position.id,
      departmentId: position.departmentId,
      name: position.name,
      description: position.description
    });
  }

  createEditPositionConfirm(): void {
    if (this.positionForm.invalid) {
      Object.values(this.positionForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      const positionData: Position = {
        id: this.createEditState == 'create' ? '' : this.positionForm.get('id')?.value,
        name: this.positionForm.get('name')?.value,
        departmentId: this.positionForm.get('departmentId')?.value,
        description: this.positionForm.get('description')?.value || ''
      }
      if (this.createEditState == 'create') {
        this.store.dispatch(positionActions.createPosition({ position: positionData }));
      } else {
        this.store.dispatch(positionActions.updatePosition({ position: positionData }));
      }
    }
  }

  deletePosition(position: Position): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${position.name}' ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(positionActions.deletePosition({ id: position.id }));
      },
      nzCancelText: 'No',
      nzCloseIcon	: undefined,
      nzWidth: 500
    });
  }

  viewDetailsPosition(position: Position): void {
    this.detailsPositionModal = true;
    this.selectedPositionObj = position;
  }

  closeModal(): void {
    this.modal.closeAll();
    this.resetForm();
  }

  resetForm(): void {
    this.positionForm.setValue({
      id: '',
      name: '',
      departmentId: '',
      description: ''
    });
    this.positionForm.reset();
  }
  departmentName(departmentId: string): string {
    return this.departmentListData.find(x => x.id == departmentId)?.name || '';
  }
}
