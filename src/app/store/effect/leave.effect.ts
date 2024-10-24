import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as leaveAction from '../action/leave.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { LeaveRecord } from "../../core/models/leave.interface";
import { LeaveService } from "../../core/services/leave.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable()
export class LeaveEffect {

    private actions = inject(Actions);
    private leaveService = inject(LeaveService)

    constructor(private message: NzMessageService) { }

    applyLeave$ = createEffect(() =>
        this.actions.pipe(
            ofType(leaveAction.applyLeave),
            mergeMap((action: any) => {
                return this.leaveService.applyLeave(action.leaveData).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Leave Apply Successfully!';
                        this.message.create('success', resMsg);
                        return leaveAction.applyLeaveSuccess({ msg: resMsg });

                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Leave Apply Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(leaveAction.applyLeaveFail({ error: resErr }))
                    })
                );
            })
        )
    );

    getLeavesAll$ = createEffect(() =>
        this.actions.pipe(
            ofType(leaveAction.loadLeaveRecordsAll),
            mergeMap(() => {
                return this.leaveService.getAllLeaveRecords().pipe(
                    map((leaveRecordsAll: LeaveRecord[]) => leaveAction.loadLeaveRecordsAllSuccess({ leaveRecordsAll })),
                    catchError(error => of(leaveAction.loadLeaveRecordsAllFail({ error: error.error })))
                );
            })
        )
    );

    getLeavesUser$ = createEffect(() =>
        this.actions.pipe(
            ofType(leaveAction.loadLeaveRecordsUser),
            mergeMap((action) => {
                return this.leaveService.getUserLeaveRecord(action.staffID).pipe(
                    map((leaveRecordsUser: LeaveRecord[]) => leaveAction.loadLeaveRecordsUserSuccess({ leaveRecordsUser })),
                    catchError(error => of(leaveAction.loadLeaveRecordsUserFail({ error: error.error })))
                );
            })
        )
    );

    // getCalendarEvents$ = createEffect(() =>
    //     this.actions.pipe(
    //         ofType(leaveAction.loadLeaveCalendar),
    //         mergeMap(() => {
    //             return this.leaveService.getLeaveCalendar().pipe(
    //                 map((calendarEvents: any[]) => leaveAction.loadLeaveCalendarSuccess({ calendarEvents })),
    //                 catchError(error => of(leaveAction.loadLeaveCalendarFail({ error: error.error })))
    //             );
    //         })
    //     )
    // );

    // getLeaveReportData$ = createEffect(() =>
    //     this.actions.pipe(
    //         ofType(leaveAction.loadLeaveReport),
    //         mergeMap((action) => {
    //             return this.leaveService.getLeaveReportData(action.filterData).pipe(
    //                 map((leaveReportData: any[]) => leaveAction.loadLeaveReportSuccess({ leaveReportData })),
    //                 catchError(error => of(leaveAction.loadLeaveReportFail({ error: error.error })))
    //             );
    //         })
    //     )
    // );

    // approveRejectLeave$ = createEffect(() =>
    //     this.actions.pipe(
    //         ofType(leaveAction.approveRejectLeave),
    //         mergeMap((action) => {
    //             return this.leaveService.approveRejectLeave(action.leaveRecord, action.approveRejectStatus).pipe(
    //                 map((action: any) => {
    //                     const resMsg = action.msg ? action.msg : 'Approve or Reject Successfully!';
    //                     this.message.create('success', resMsg);
    //                     return leaveAction.approveRejectLeaveSuccess({ msg: resMsg });
    //                 }),
    //                 catchError(error => {
    //                     const resErr = error.message ? error.message : 'Something went wrong!';
    //                     this.message.create('error', resErr);
    //                     return of(leaveAction.approveRejectLeaveFail({ error: resErr }))
    //                 })
    //             )
    //         })
    //     )
    // )


    loadLeaveAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                leaveAction.applyLeaveSuccess
            ),
            map(() => {
                return leaveAction.loadLeaveRecordsAll(), leaveAction.loadLeaveRecordsAll();
            })
        )
    );
}