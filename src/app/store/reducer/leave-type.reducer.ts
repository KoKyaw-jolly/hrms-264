import { createReducer, on } from "@ngrx/store";
import { leaveTypeInitialState } from "../state/leave-type.state";
import * as leaveTypeActions from '../action/leave-type.action';

export const leaveTypeReducer = createReducer(
    leaveTypeInitialState,
    on(leaveTypeActions.loadLeaveType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(leaveTypeActions.loadLeaveTypeSuccess, (state: any, action) =>
        ({ ...state, leaveType: action.leaveType, loading: false, error: null })
    ),
    on(leaveTypeActions.loadLeaveTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(leaveTypeActions.createLeaveType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(leaveTypeActions.createLeaveTypeSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(leaveTypeActions.createLeaveTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(leaveTypeActions.updateLeaveType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(leaveTypeActions.updateLeaveTypeSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(leaveTypeActions.updateLeaveTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(leaveTypeActions.deleteLeaveType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(leaveTypeActions.deleteLeaveTypeSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(leaveTypeActions.deleteLeaveTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    )
)