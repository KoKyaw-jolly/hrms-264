import { createAction, props } from "@ngrx/store";
import { Holiday } from "../../core/models/holiday.interface";

export const loadHoliday = createAction('[Holiday] Load holiday');
export const loadHolidaySuccess = createAction('[Holiday] Load holiday success', props<{ holiday: Holiday[] }>());
export const loadHolidayFail = createAction('[Holiday] Load holiday fail', props<{ error: any }>());

export const createHoliday = createAction('[Holiday] Create holiday',props<{ holiday: Holiday }>());
export const createHolidaySuccess = createAction('[Holiday] Create holiday success', props<{ msg: any }>());
export const createHolidayFail = createAction('[Holiday] Create holiday fail', props<{ error: any }>());

export const updateHoliday = createAction('[Holiday] Update holiday',props<{ holiday: Holiday }>());
export const updateHolidaySuccess = createAction('[Holiday] Update holiday success', props<{ msg: any }>());
export const updateHolidayFail = createAction('[Holiday] Update holiday fail', props<{ error: any }>());

export const deleteHoliday = createAction('[Holiday] Delete holiday',props<{ id: string }>());
export const deleteHolidaySuccess = createAction('[Holiday] Delete holiday success', props<{ msg: any }>());
export const deleteHolidayFail = createAction('[Holiday] Delete holiday fail', props<{ error: any }>());