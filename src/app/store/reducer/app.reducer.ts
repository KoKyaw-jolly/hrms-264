import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { LocalStorageConfig, localStorageSync } from "ngrx-store-localstorage";
import { roleReducer } from "./master/role.reducer";
import { roleInitialState } from "../state/master/role.state";
import { authReducer } from "./auth.reducer";
import { authInitialState } from "../state/auth.state";
import * as AuthAction from '../action/auth.action';
import { departmentInitialState } from "../state/master/department.state";
import { departmentReducer } from "./master/department.reducer";
import { positionInitialState } from "../state/master/position.state";
import { positionReducer } from "./master/position.reducer";
import { leaveTypeInitialState } from "../state/master/leave-type.state";
import { leaveTypeReducer } from "./master/leave-type.reducer";
import { holidayReducer } from "./holiday.reducer";
import { holidayInitialState } from "../state/holiday.state";
import { staffInitialState } from "../state/staff.state";
import { staffReducer } from "./staff.reducer";

// export const appReducer: ActionReducerMap<AppState> = {
//     role: roleReducer,
//     authInfo: authReducer,
//     department: departmentReducer,
//     position: positionReducer,
//     leaveType: leaveTypeReducer,
//     holiday:holidayReducer,
//     staff: staffReducer
// }

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
        'leaveType',
        'holiday',
        'staff'
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
                leaveType: leaveTypeInitialState,
                holiday: holidayInitialState,
                staff: staffInitialState
            }
        }
        return reducer(state, action);
    }
}

export function storageSyncReducer(reducer: ActionReducer<AppState>) {
    return localStorageSync(localStorageConfig)(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [storageSyncReducer, clearState];