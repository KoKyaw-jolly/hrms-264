import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as staffTypeActions from '../../action/master/staff-type.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { StaffTypeService } from "../../../core/services/master/staff-type.service";
import { StaffType } from "../../../core/models/master/staff-type.interface";


@Injectable()
export class StaffTypeEffect {

    private actions = inject(Actions);

    constructor(
        private staffTypeService: StaffTypeService,
        private message: NzMessageService
    ) { }

    getStaffType$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffTypeActions.loadStaffType),
            mergeMap(() => {
                return this.staffTypeService.getAllStaffType().pipe(
                    map((staffType: StaffType[]) => staffTypeActions.loadStaffTypeSuccess({ staffType })),
                    catchError(error => of(staffTypeActions.loadStaffTypeFail({ error: error.message })))
                );
            })
        )
    );

    createStaffType$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffTypeActions.createStaffType),
            mergeMap((action) => {
                return this.staffTypeService.createStaffType(action.staffType).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Create Staff Type Successfully!';
                        this.message.create('success', resMsg);
                        return staffTypeActions.createStaffTypeSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Create Staff Type fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(staffTypeActions.createStaffTypeFail({ error: resErr }))
                    })
                )
            })
        )
    );

    updateStaffType$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffTypeActions.updateStaffType),
            mergeMap((action) => {
                return this.staffTypeService.updateStaffType(action.staffType).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Update Staff Type Successfully!';
                        this.message.create('success', resMsg);
                        return staffTypeActions.updateStaffTypeSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Update Staff Type fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(staffTypeActions.updateStaffTypeFail({ error: resErr }))
                    })
                )
            })
        )
    );

    deleteStaffType$ = createEffect(() =>
        this.actions.pipe(
            ofType(staffTypeActions.deleteStaffType),
            mergeMap((action) => {
                return this.staffTypeService.deleteStaffType(action.id).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Delete Staff Type Successfully!';
                        this.message.create('success', resMsg);
                        return staffTypeActions.deleteStaffTypeSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Delete Staff Type Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(staffTypeActions.deleteStaffTypeFail({ error: resErr }))
                    })
                )
            })
        )
    );

    loadStaffTypeAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                staffTypeActions.createStaffTypeSuccess,
                staffTypeActions.updateStaffTypeSuccess,
                staffTypeActions.deleteStaffTypeSuccess
            ),
            map(() => {
                return staffTypeActions.loadStaffType();
            })
        )
    );
}
