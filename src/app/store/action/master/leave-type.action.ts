import { createAction, props } from "@ngrx/store";
import { LeaveType } from "../../../core/models/master/leave-type.interface";

export const loadLeaveType = createAction('[Leave Type] Load leave type');
export const loadLeaveTypeSuccess = createAction('[Leave Type] Load leave type success', props<{ leaveType: LeaveType[] }>());
export const loadLeaveTypeFail = createAction('[Leave Type] Load leave type fail', props<{ error: any }>());

export const createLeaveType = createAction('[Leave Type] Create leave type',props<{ leaveType: LeaveType }>());
export const createLeaveTypeSuccess = createAction('[Leave Type] Create leave type success', props<{ msg: any }>());
export const createLeaveTypeFail = createAction('[Leave Type] Create leave type fail', props<{ error: any }>());

export const updateLeaveType = createAction('[Leave Type] Update leave type',props<{ leaveType: LeaveType }>());
export const updateLeaveTypeSuccess = createAction('[Leave Type] Update leave type success', props<{ msg: any }>());
export const updateLeaveTypeFail = createAction('[Leave Type] Update leave type fail', props<{ error: any }>());

export const deleteLeaveType = createAction('[Leave Type] Delete leave type',props<{ id: string }>());
export const deleteLeaveTypeSuccess = createAction('[Leave Type] Delete leave type success', props<{ msg: any }>());
export const deleteLeaveTypeFail = createAction('[Leave Type] Delete leave type fail', props<{ error: any }>());