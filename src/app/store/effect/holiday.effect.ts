import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as holidayActions from '../action/holiday.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { HolidayService } from "../../core/services/holiday.service";
import { Holiday } from "../../core/models/holiday.interface";


@Injectable()
export class HolidayEffect {

    private actions = inject(Actions);

    constructor(
        private holidayService: HolidayService,
        private message: NzMessageService
    ) { }

    getHoliday$ = createEffect(() =>
        this.actions.pipe(
            ofType(holidayActions.loadHoliday),
            mergeMap(() => {
                return this.holidayService.getAllHoliday().pipe(
                    map((holiday: Holiday[]) => holidayActions.loadHolidaySuccess({ holiday })),
                    catchError(error => of(holidayActions.loadHolidayFail({ error: error.message })))
                );
            })
        )
    );

    createHoliday$ = createEffect(() =>
        this.actions.pipe(
            ofType(holidayActions.createHoliday),
            mergeMap((action) => {
                return this.holidayService.createHoliday(action.holiday).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Create Holiday Successfully!';
                        this.message.create('success', resMsg);
                        return holidayActions.createHolidaySuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Create Holiday Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(holidayActions.createHolidayFail({ error: resErr }))
                    })
                )
            })
        )
    );

    updateHoliday$ = createEffect(() =>
        this.actions.pipe(
            ofType(holidayActions.updateHoliday),
            mergeMap((action) => {
                return this.holidayService.updateHoliday(action.holiday).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Update Holiday Successfully!';
                        this.message.create('success', resMsg);
                        return holidayActions.updateHolidaySuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Update Holiday Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(holidayActions.updateHolidayFail({ error: resErr }))
                    })
                )
            })
        )
    );

    deleteHoliday$ = createEffect(() =>
        this.actions.pipe(
            ofType(holidayActions.deleteHoliday),
            mergeMap((action) => {
                return this.holidayService.deleteHoliday(action.id).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Delete Holiday Successfully!';
                        this.message.create('success', resMsg);
                        return holidayActions.deleteHolidaySuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Delete Holiday Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(holidayActions.deleteHolidayFail({ error: resErr }))
                    })
                )
            })
        )
    );

    loadHolidayAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                holidayActions.createHolidaySuccess,
                holidayActions.updateHolidaySuccess,
                holidayActions.deleteHolidaySuccess
            ),
            map(() => {
                return holidayActions.loadHoliday();
            })
        )
    );
}
