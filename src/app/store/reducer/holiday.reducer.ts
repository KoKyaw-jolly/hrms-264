import { createReducer, on } from "@ngrx/store";
import { holidayInitialState } from "../state/holiday.state";
import * as holidayActions from '../action/holiday.action';

export const holidayReducer = createReducer(
    holidayInitialState,
    on(holidayActions.loadHoliday, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(holidayActions.loadHolidaySuccess, (state: any, action) =>
        ({ ...state, holiday: action.holiday, loading: false, error: null })
    ),
    on(holidayActions.loadHolidayFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(holidayActions.createHoliday, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(holidayActions.createHolidaySuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(holidayActions.createHolidayFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(holidayActions.updateHoliday, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(holidayActions.updateHolidaySuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(holidayActions.updateHolidayFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    ),

    on(holidayActions.deleteHoliday, (state: any) =>
        ({ ...state, loading: true, error: null })
    ),
    on(holidayActions.deleteHolidaySuccess, (state: any, action) =>
        ({ ...state, loading: false, error: null })
    ),
    on(holidayActions.deleteHolidayFail, (state: any, action) =>
        ({ ...state, loading: false, error: action.error })
    )
)