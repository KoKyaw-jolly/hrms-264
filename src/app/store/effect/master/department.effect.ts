import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as departmentActions from '../../action/master/department.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { DepartmentService } from "../../../core/services/department.service";
import { Department } from "../../../core/models/department.interface";


@Injectable()
export class DepartmentEffect {

    private actions = inject(Actions);

    constructor(
        private departmentService: DepartmentService,
        private message: NzMessageService
    ) { }

    getDepartment$ = createEffect(() =>
        this.actions.pipe(
            ofType(departmentActions.loadDepartment),
            mergeMap(() => {
                return this.departmentService.getAllDepartment().pipe(
                    map((department: Department[]) => departmentActions.loadDepartmentSuccess({ department })),
                    catchError(error => of(departmentActions.loadDepartmentFail({ error: error.message })))
                );
            })
        )
    );

    createDepartment$ = createEffect(() =>
        this.actions.pipe(
            ofType(departmentActions.createDepartment),
            mergeMap((action) => {
                return this.departmentService.createDepartment(action.department).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Create Department Successfully!';
                        this.message.create('success', resMsg);
                        return departmentActions.createDepartmentSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Create Department Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(departmentActions.createDepartmentFail({ error: resErr }))
                    })
                )
            })
        )
    );

    updateDepartment$ = createEffect(() =>
        this.actions.pipe(
            ofType(departmentActions.updateDepartment),
            mergeMap((action) => {
                return this.departmentService.updateDepartment(action.department).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Update Department Successfully!';
                        this.message.create('success', resMsg);
                        return departmentActions.updateDepartmentSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Update Department Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(departmentActions.updateDepartmentFail({ error: resErr }))
                    })
                )
            })
        )
    );

    deleteDepartment$ = createEffect(() =>
        this.actions.pipe(
            ofType(departmentActions.deleteDepartment),
            mergeMap((action) => {
                return this.departmentService.deleteDepartment(action.id).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Delete Department Successfully!';
                        this.message.create('success', resMsg);
                        return departmentActions.deleteDepartmentSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Delete Department Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(departmentActions.deleteDepartmentFail({ error: resErr }))
                    })
                )
            })
        )
    );

    loadDepartmentAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                departmentActions.createDepartmentSuccess,
                departmentActions.updateDepartmentSuccess,
                departmentActions.deleteDepartmentSuccess
            ),
            map(() => {
                return departmentActions.loadDepartment();
            })
        )
    );
}
