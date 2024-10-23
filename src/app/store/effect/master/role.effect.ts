import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as roleActions from '../../action/master/role.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { RoleService } from "../../../core/services/master/role.service";
import { Role } from "../../../core/models/master/role.interface";


@Injectable()
export class RoleEffect {

    private actions = inject(Actions);

    constructor(
        private roleService: RoleService,
        private message: NzMessageService
    ) { }

    getRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(roleActions.loadRole),
            mergeMap(() => {
                return this.roleService.getAllRole().pipe(
                    map((role: Role[]) => roleActions.loadRoleSuccess({ role })),
                    catchError(error => of(roleActions.loadRoleFail({ error: error.message })))
                );
            })
        )
    );

    createRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(roleActions.createRole),
            mergeMap((action) => {
                return this.roleService.createRole(action.role).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Create Role Successfully!';
                        this.message.create('success', resMsg);
                        return roleActions.createRoleSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Create Role Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(roleActions.createRoleFail({ error: resErr }))
                    })
                )
            })
        )
    );

    updateRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(roleActions.updateRole),
            mergeMap((action) => {
                return this.roleService.updateRole(action.role).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Update Role Successfully!';
                        this.message.create('success', resMsg);
                        return roleActions.updateRoleSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Update Role Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(roleActions.updateRoleFail({ error: resErr }))
                    })
                )
            })
        )
    );

    deleteRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(roleActions.deleteRole),
            mergeMap((action) => {
                return this.roleService.deleteRole(action.id).pipe(
                    map((action: any) => {
                        const resMsg = action.msg ? action.msg : 'Delete Role Successfully!';
                        this.message.create('success', resMsg);
                        return roleActions.deleteRoleSuccess({ msg: resMsg });
                    }),
                    catchError(error => {
                        const resErr = error.msg ? error.msg : 'Delete Role Fail! Please try again.';
                        this.message.create('error', resErr);
                        return of(roleActions.deleteRoleFail({ error: resErr }))
                    })
                )
            })
        )
    );

    loadRoleAfterCUDSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(
                roleActions.createRoleSuccess,
                roleActions.updateRoleSuccess,
                roleActions.deleteRoleSuccess
            ),
            map(() => {
                return roleActions.loadRole();
            })
        )
    );
}
