import { createReducer, on } from "@ngrx/store";
import { roleInitialState } from "../../state/master/role.state";
import * as roleActions from '../../action/master/role.action';

export const roleReducer = createReducer(
    roleInitialState,
    on(roleActions.loadRole, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(roleActions.loadRoleSuccess, (state: any, action) =>
        ({ ...state, role: action.role, loading: false, error: null })
    ),
    on(roleActions.loadRoleFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(roleActions.createRole, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(roleActions.createRoleSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(roleActions.createRoleFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(roleActions.updateRole, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(roleActions.updateRoleSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(roleActions.updateRoleFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(roleActions.deleteRole, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(roleActions.deleteRoleSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(roleActions.deleteRoleFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    )
)