export interface LeaveType {
    id: string;
    name: string;
    description: string;
    allowDaysPerYear: number;
}

export const defaultLeaveTypeObj: LeaveType = {
    id: '',
    name: '',
    description: '',
    allowDaysPerYear: 0
}