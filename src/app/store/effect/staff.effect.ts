import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as staffActions from '../action/staff.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { StaffService } from "../../core/services/staff.service";
import { Staff } from "../../core/models/staff.interface";
import { Router } from "@angular/router";


@Injectable()
export class StaffEffect {

    private actions = inject(Actions);

    constructor(
        private staffService: StaffService,
        private message: NzMessageService,
        private router: Router
    ) { }

    getStaff$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffActions.loadStaff),
            mergeMap(() => {
                return this.staffService.getAllStaff().pipe(
                    map((staff: Staff[]) => staffActions.loadStaffSuccess({ staff })),
                    catchError(error => of(staffActions.loadStaffFail({ error: error.message })))
                );
            })
        )
    );

    createStaff$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffActions.createStaff),
            mergeMap((action) => {
                return this.staffService.createStaff(action.staff).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Create Staff Successfully!';
                        this.message.create('success', resMsg);
                        this.router.navigate(['/staff-management/staff-list']);
                        return staffActions.createStaffSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Create Staff Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(staffActions.createStaffFail({ error: resErr }))
                    })
                )
            })
        )
    );

    updateStaff$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffActions.updateStaff),
            mergeMap((action) => {
                return this.staffService.updateStaff(action.staff).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Update Staff Successfully!';
                        this.message.create('success', resMsg);
                        this.router.navigate(['/staff-management/staff-list']);
                        return staffActions.updateStaffSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Update Staff Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(staffActions.updateStaffFail({ error: resErr }))
                    })
                )
            })
        )
    );

    deleteStaff$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffActions.deleteStaff),
            mergeMap((action) => {
                return this.staffService.deleteStaff(action.id).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Delete Staff Successfully!';
                        this.message.create('success', resMsg);
                        return staffActions.deleteStaffSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Delete Staff Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(staffActions.deleteStaffFail({ error: resErr }))
                    })
                )
            })
        )
    );

    loadStaffAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                staffActions.createStaffSuccess,
                staffActions.updateStaffSuccess,
                staffActions.deleteStaffSuccess
            ),
            map(() => {
                return staffActions.loadStaff();
            })
        )
    );
}
