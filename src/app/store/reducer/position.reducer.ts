import { createReducer, on } from "@ngrx/store";
import { positionInitialState } from "../state/position.state";
import * as positionActions from '../action/position.action';

export const positionReducer = createReducer(
    positionInitialState,
    on(positionActions.loadPosition, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(positionActions.loadPositionSuccess, (state: any, action) =>
        ({ ...state, position: action.position, loading: false, error: null })
    ),
    on(positionActions.loadPositionFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(positionActions.createPosition, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(positionActions.createPositionSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(positionActions.createPositionFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(positionActions.updatePosition, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(positionActions.updatePositionSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(positionActions.updatePositionFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(positionActions.deletePosition, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(positionActions.deletePositionSuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(positionActions.deletePositionFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    )
)