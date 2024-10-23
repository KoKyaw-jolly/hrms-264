import { LeaveType } from "../../../core/models/leave-type.interface";

export interface LeaveTypeState {
    leaveType: LeaveType[];
    loading: boolean;
    error: any;
}

export const leaveTypeInitialState: LeaveTypeState = {
    leaveType: [],
    loading: false,
    error: null
}