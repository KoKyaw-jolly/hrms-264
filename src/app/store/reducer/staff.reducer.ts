import { createReducer, on } from "@ngrx/store";
import { staffInitialState } from "../state/staff.state";
import * as staffActions from '../action/staff.action';

export const staffReducer = createReducer(
    staffInitialState,
    on(staffActions.loadStaff, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffActions.loadStaffSuccess, (state: any, action) =>
        ({ ...state, staff: action.staff, loading: false, error: null })
    ),
    on(staffActions.loadStaffFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(staffActions.createStaff, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffActions.createStaffSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(staffActions.createStaffFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(staffActions.updateStaff, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffActions.updateStaffSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(staffActions.updateStaffFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(staffActions.deleteStaff, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffActions.deleteStaffSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(staffActions.deleteStaffFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    )
)