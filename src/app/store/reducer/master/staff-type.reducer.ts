import { createReducer, on } from "@ngrx/store";
import { staffTypeInitialState } from "../../state/master/staff-type.state";
import * as staffTypeActions from '../../action/master/staff-type.action';

export const staffTypeReducer = createReducer(
    staffTypeInitialState,
    on(staffTypeActions.loadStaffType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffTypeActions.loadStaffTypeSuccess, (state: any, action) =>
        ({ ...state, staffType: action.staffType, loading: false, error: null })
    ),
    on(staffTypeActions.loadStaffTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(staffTypeActions.createStaffType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffTypeActions.createStaffTypeSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(staffTypeActions.createStaffTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(staffTypeActions.updateStaffType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffTypeActions.updateStaffTypeSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(staffTypeActions.updateStaffTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(staffTypeActions.deleteStaffType, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(staffTypeActions.deleteStaffTypeSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(staffTypeActions.deleteStaffTypeFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    )
)