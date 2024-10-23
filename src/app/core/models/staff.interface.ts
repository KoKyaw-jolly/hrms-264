export interface StaffLeaveBalance {
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
    staffTypeId: string;
    roleId: string;
    email: string;
    phone: string;
    address: string;
    leaveBalance: StaffLeaveBalance[];
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
    staffTypeId: '',
    roleId: '',
    email: '',
    phone: '',
    address: '',
    leaveBalance: []
  }