import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as authAction from '../action/auth.action';
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthInfo } from "../state/auth.state";
import { Staff } from "../../core/models/staff.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Injectable()
export class AuthEffect {

    private actions = inject(Actions);

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    authLogin$ = createEffect(() =>
        this.actions.pipe(
            ofType(authAction.login),
            mergeMap((action) => {
                return this.authService
                    .login(action.authCredential)
                    .pipe(
                        map((user: Staff) => {
                            this.router.navigate(['/dashboard']);
                            return authAction.loginSuccess({ user })
                        }),
                        catchError((errorInfo: HttpErrorResponse) => {
                            return of(authAction.loginFail({ errorInfo: errorInfo }))
                        })
                    );
            })
        )
    );

    authLogout$ = createEffect(() =>
        this.actions.pipe(
            ofType(authAction.logOut),
            tap(() => {
                this.router.navigate(['/login']);
            })
        ),
        {dispatch: false}
    )

}