import { createAction, props } from "@ngrx/store";
import { StaffType } from "../../../core/models/master/staff-type.interface";

export const loadStaffType = createAction('[Staff Type] Load staff type');
export const loadStaffTypeSuccess = createAction('[Staff Type] Load staff type success', props<{ staffType: StaffType[] }>());
export const loadStaffTypeFail = createAction('[Staff Type] Load staff type fail', props<{ error: any }>());

export const createStaffType = createAction('[Staff Type] Create staff type',props<{ staffType: StaffType }>());
export const createStaffTypeSuccess = createAction('[Staff Type] Create staff type success', props<{ msg: any }>());
export const createStaffTypeFail = createAction('[Staff Type] Create staff type fail', props<{ error: any }>());

export const updateStaffType = createAction('[Staff Type] Update staff type',props<{ staffType: StaffType }>());
export const updateStaffTypeSuccess = createAction('[Staff Type] Update staff type success', props<{ msg: any }>());
export const updateStaffTypeFail = createAction('[Staff Type] Update staff type fail', props<{ error: any }>());

export const deleteStaffType = createAction('[Staff Type] Delete staff type',props<{ id: string }>());
export const deleteStaffTypeSuccess = createAction('[Staff Type] Delete staff type success', props<{ msg: any }>());
export const deleteStaffTypeFail = createAction('[Staff Type] Delete staff type fail', props<{ error: any }>());