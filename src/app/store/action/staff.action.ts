import { createAction, props } from "@ngrx/store";
import { Staff } from "../../core/models/staff.interface";

export const loadStaff = createAction('[Staff] Load staff');
export const loadStaffSuccess = createAction('[Staff] Load staff success', props<{ staff: Staff[] }>());
export const loadStaffFail = createAction('[Staff] Load staff fail', props<{ error: any }>());

export const createStaff = createAction('[Staff] Create staff',props<{ staff: Staff }>());
export const createStaffSuccess = createAction('[Staff] Create staff success', props<{ msg: any }>());
export const createStaffFail = createAction('[Staff] Create staff fail', props<{ error: any }>());

export const updateStaff = createAction('[Staff] Update staff',props<{ staff: Staff }>());
export const updateStaffSuccess = createAction('[Staff] Update staff success', props<{ msg: any }>());
export const updateStaffFail = createAction('[Staff] Update staff fail', props<{ error: any }>());

export const deleteStaff = createAction('[Staff] Delete staff',props<{ id: string }>());
export const deleteStaffSuccess = createAction('[Staff] Delete staff success', props<{ msg: any }>());
export const deleteStaffFail = createAction('[Staff] Delete staff fail', props<{ error: any }>());