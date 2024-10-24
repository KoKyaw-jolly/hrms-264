import { createAction, props } from "@ngrx/store";
import { LeaveRecord } from "../../core/models/leave.interface";

export const applyLeave = createAction('[Leave] Apply leave', props<{ leaveData: LeaveRecord }>());
export const applyLeaveSuccess = createAction('[Leave] Apply leave success', props<{ msg: any }>());
export const applyLeaveFail = createAction('[Leave] Apply leave fail', props<{ error: any }>());

export const loadLeaveRecordsAll = createAction('[Leave] Load leave records all');
export const loadLeaveRecordsAllSuccess = createAction('[Leave] Load leave records all success', props<{ leaveRecordsAll: LeaveRecord[] }>());
export const loadLeaveRecordsAllFail = createAction('[Leave] Load leave records all fail', props<{ error: any }>());

export const loadLeaveRecordsUser = createAction('[Leave] Load leave records user', props<{ staffID: string }>());
export const loadLeaveRecordsUserSuccess = createAction('[Leave] Load leave records user success', props<{ leaveRecordsUser: LeaveRecord[] }>());
export const loadLeaveRecordsUserFail = createAction('[Leave] Load leave records User fail', props<{ error: any }>());

// export const loadLeaveCalendar = createAction('[Leave] Load leave calendar');
// export const loadLeaveCalendarSuccess = createAction('[Leave] Load leave calendar success', props<{ calendarEvents: any[] }>());
// export const loadLeaveCalendarFail = createAction('[Leave] Load leave calendar fail', props<{ error: any }>());

// export const loadLeaveReport = createAction('[Leave] Load leave report', props<{ filterData: any }>());
// export const loadLeaveReportSuccess = createAction('[Leave] Load leave report success', props<{ leaveReportData: LeaveRecord[] }>());
// export const loadLeaveReportFail = createAction('[Leave] Load leave report fail', props<{ error: any }>());

export const approveRejectLeave = createAction('[Leave] Approve reject leave', props<{ leaveRecord: LeaveRecord, approveRejectStatus: string }>());
export const approveRejectLeaveSuccess = createAction('[Leave] Approve reject leave success', props<{ msg: any }>());
export const approveRejectLeaveFail = createAction('[Leave] Approve reject leave fail', props<{ error: any }>());