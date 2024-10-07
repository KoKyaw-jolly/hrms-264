import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { LocalStorageConfig, localStorageSync } from "ngrx-store-localstorage";
import { roleReducer } from "./role.reducer";
import { roleInitialState } from "../state/role.state";
import { authReducer } from "./auth.reducer";
import { authInitialState } from "../state/auth.state";
import * as AuthAction from '../action/auth.action';
import { departmentInitialState } from "../state/department.state";
import { departmentReducer } from "./department.reducer";
import { positionInitialState } from "../state/position.state";
import { positionReducer } from "./position.reducer";
import { leaveTypeInitialState } from "../state/leave-type.state";
import { leaveTypeReducer } from "./leave-type.reducer";

export const appReducer: ActionReducerMap<AppState> = {
    role: roleReducer,
    authInfo: authReducer,
    department: departmentReducer,
    position: positionReducer,
    leaveType: leaveTypeReducer
}

const localStorageConfig: LocalStorageConfig = {
    rehydrate: true,
    storage: sessionStorage,
    removeOnUndefined: true,
    restoreDates: false,
    keys: [
        'authInfo',
        'role',
        'department',
        'position',
        'leaveType'
    ]
}

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {

    return function (state, action) {
        if (action.type === AuthAction.logOut.type) {
            state = {
                ...state,
                authInfo: authInitialState,
                role: roleInitialState,
                department: departmentInitialState,
                position: positionInitialState,
                leaveType: leaveTypeInitialState
            }
        }
        return reducer(state, action);
    }
}

export function storageSyncReducer(reducer: ActionReducer<AppState>) {
    return localStorageSync(localStorageConfig)(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [storageSyncReducer, clearState];