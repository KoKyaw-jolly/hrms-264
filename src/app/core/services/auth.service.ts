import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { AuthInfo } from '../../store/state/auth.state';
import { Staff } from '../models/staff.interface';
import { AuthCredential } from '../models/auth.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import * as authAction from '../../store/action/auth.action';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient,
        private store: Store<AppState>,
        private router: Router
    ) { }

    login(authCredential: AuthCredential): Observable<Staff> {
        return this.http.post<any>('http://localhost:3200/api/auth/login', authCredential);
    }

    logOut(): void {
        this.store.dispatch(authAction.logOut());
    }
}
