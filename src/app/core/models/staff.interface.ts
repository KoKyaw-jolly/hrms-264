export interface LeaveBalance {
    leaveTypeId: string;
    leaveBalance: number;
    leaveTaken: number;
    leaveRemaining: number;
}

export interface Staff {
    id: string;
    staffId: string;
    fullName: string;
    image: string;
    gender: string;
    birthday: Date;
    positionId: string;
    departmentId: string;
    roleId: string;
    email: string;
    phone: string;
    address: string;
    leaveBalance: LeaveBalance[];
}

export const staffEmptyInitialObj: Staff = {
    id: '',
    staffId: '',
    fullName: '',
    image: '',
    gender: '',
    birthday: new Date(),
    positionId: '',
    departmentId: '',
    roleId: '',
    email: '',
    phone: '',
    address: '',
    leaveBalance: []
  }