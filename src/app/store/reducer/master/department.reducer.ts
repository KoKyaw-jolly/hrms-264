import { createReducer, on } from "@ngrx/store";
import { departmentInitialState } from "../../state/master/department.state";
import * as departmentActions from '../../action/master/department.action';

export const departmentReducer = createReducer(
    departmentInitialState,
    on(departmentActions.loadDepartment, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(departmentActions.loadDepartmentSuccess, (state: any, action) =>
        ({ ...state, department: action.department, loading: false, error: null })
    ),
    on(departmentActions.loadDepartmentFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(departmentActions.createDepartment, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(departmentActions.createDepartmentSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(departmentActions.createDepartmentFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(departmentActions.updateDepartment, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(departmentActions.updateDepartmentSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(departmentActions.updateDepartmentFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(departmentActions.deleteDepartment, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(departmentActions.deleteDepartmentSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(departmentActions.deleteDepartmentFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    )
)