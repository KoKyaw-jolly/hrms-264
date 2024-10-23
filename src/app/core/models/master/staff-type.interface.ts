export interface LeaveBalance {
    leaveTypeId: string;
    balance: number;
}

export interface StaffType {
    id: string;
    name: string;
    description: string;
    leaveBalance: LeaveBalance[];
}

export const defaultStaffTypeObj: StaffType = {
    id: '',
    name: '',
    description: '',
    leaveBalance: []
}