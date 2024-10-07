import { createAction, props } from "@ngrx/store";
import { AuthCredential } from "../../core/models/auth.interface";
import { Staff } from "../../core/models/staff.interface";

export const login = createAction('[Auth] Login',props<{authCredential:AuthCredential}>());
export const loginSuccess = createAction('[Auth] Login Success',props<{user:Staff}>());
export const loginFail = createAction('[Auth] Login Fail',props<{errorInfo:any}>());
export const logOut = createAction('[Auth] LogOut');