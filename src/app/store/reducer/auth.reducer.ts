import { createReducer, on } from "@ngrx/store";
import { authInitialState } from "../state/auth.state";
import * as authAction from "../action/auth.action";

export const authReducer = createReducer(
    authInitialState,
    on(authAction.login, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(authAction.loginSuccess, (state: any, action) =>
        ({ ...state, userInfo: { user: action.user }, error: null, loading: false })
    ),
    on(authAction.loginFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.errorInfo.error })
    ),
)