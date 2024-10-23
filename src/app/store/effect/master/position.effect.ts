import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as positionActions from '../../action/master/position.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { PositionService } from "../../../core/services/position.service";
import { Position } from "../../../core/models/position.interface";


@Injectable()
export class PositionEffect {

    private actions = inject(Actions);

    constructor(
        private positionService: PositionService,
        private message: NzMessageService
    ) { }

    getPosition$ = createEffect(() =>
        this.actions.pipe(
            ofType(positionActions.loadPosition),
            mergeMap(() => {
                return this.positionService.getAllPosition().pipe(
                    map((position: Position[]) => positionActions.loadPositionSuccess({ position })),
                    catchError(error => of(positionActions.loadPositionFail({ error: error.message })))
                );
            })
        )
    );

    createPosition$ = createEffect(() =>
        this.actions.pipe(
            ofType(positionActions.createPosition),
            mergeMap((action) => {
                return this.positionService.createPosition(action.position).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Create Position Successfully!';
                        this.message.create('success', resMsg);
                        return positionActions.createPositionSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Create Position Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(positionActions.createPositionFail({ error: resErr }))
                    })
                )
            })
        )
    );

    updatePosition$ = createEffect(() =>
        this.actions.pipe(
            ofType(positionActions.updatePosition),
            mergeMap((action) => {
                return this.positionService.updatePosition(action.position).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Update Position Successfully!';
                        this.message.create('success', resMsg);
                        return positionActions.updatePositionSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Update Position Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(positionActions.updatePositionFail({ error: resErr }))
                    })
                )
            })
        )
    );

    deletePosition$ = createEffect(() =>
        this.actions.pipe(
            ofType(positionActions.deletePosition),
            mergeMap((action) => {
                return this.positionService.deletePosition(action.id).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Delete Position Successfully!';
                        this.message.create('success', resMsg);
                        return positionActions.deletePositionSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Delete Position Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(positionActions.deletePositionFail({ error: resErr }))
                    })
                )
            })
        )
    );

    loadPositionAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                positionActions.createPositionSuccess,
                positionActions.updatePositionSuccess,
                positionActions.deletePositionSuccess
            ),
            map(() => {
                return positionActions.loadPosition();
            })
        )
    );
}
