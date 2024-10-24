import { LeaveRecord } from "../../core/models/leave.interface";

export interface LeaveState {
    leaveRecordsAll: LeaveRecord[];
    leaveRecordsUser: LeaveRecord[];
    loading: boolean;
    leaveRequestLoading: boolean;
    error:any
}
export const leaveInitialState: LeaveState = {
    leaveRecordsAll: [],
    leaveRecordsUser: [],
    loading: false,
    leaveRequestLoading: false,
    error: null
}