import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as leaveTypeActions from '../../action/master/leave-type.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { LeaveTypeService } from "../../../core/services/leave-type.service";
import { LeaveType } from "../../../core/models/leave-type.interface";


@Injectable()
export class LeaveTypeEffect {

    private actions = inject(Actions);

    constructor(
        private leaveTypeService: LeaveTypeService,
        private message: NzMessageService
    ) { }

    getLeaveType$ = createEffect(() =>
        this.actions.pipe(
            ofType(leaveTypeActions.loadLeaveType),
            mergeMap(() => {
                return this.leaveTypeService.getAllLeaveType().pipe(
                    map((leaveType: LeaveType[]) => leaveTypeActions.loadLeaveTypeSuccess({ leaveType })),
                    catchError(error => of(leaveTypeActions.loadLeaveTypeFail({ error: error.message })))
                );
            })
        )
    );

    createLeaveType$ = createEffect(() =>
        this.actions.pipe(
            ofType(leaveTypeActions.createLeaveType),
            mergeMap((action) => {
                return this.leaveTypeService.createLeaveType(action.leaveType).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Create Leave Type Successfully!';
                        this.message.create('success', resMsg);
                        return leaveTypeActions.createLeaveTypeSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Create Leave Type fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(leaveTypeActions.createLeaveTypeFail({ error: resErr }))
                    })
                )
            })
        )
    );

    updateLeaveType$ = createEffect(() =>
        this.actions.pipe(
            ofType(leaveTypeActions.updateLeaveType),
            mergeMap((action) => {
                return this.leaveTypeService.updateLeaveType(action.leaveType).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Update Leave Type Successfully!';
                        this.message.create('success', resMsg);
                        return leaveTypeActions.updateLeaveTypeSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Update Leave Type fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(leaveTypeActions.updateLeaveTypeFail({ error: resErr }))
                    })
                )
            })
        )
    );

    deleteLeaveType$ = createEffect(() =>
        this.actions.pipe(
            ofType(leaveTypeActions.deleteLeaveType),
            mergeMap((action) => {
                return this.leaveTypeService.deleteLeaveType(action.id).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Delete Leave Type Successfully!';
                        this.message.create('success', resMsg);
                        return leaveTypeActions.deleteLeaveTypeSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Delete Leave Type Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(leaveTypeActions.deleteLeaveTypeFail({ error: resErr }))
                    })
                )
            })
        )
    );

    loadLeaveTypeAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                leaveTypeActions.createLeaveTypeSuccess,
                leaveTypeActions.updateLeaveTypeSuccess,
                leaveTypeActions.deleteLeaveTypeSuccess
            ),
            map(() => {
                return leaveTypeActions.loadLeaveType();
            })
        )
    );
}
