
export interface Staff {
    staffId: string;
    fullName: string;
    image: string;
    gender: string;
    positionID: string;
    departmentID: string;
    roleID: string;
    email: string;
    phone: string;
    address: string;
    leaveBalance: [];
}

export const staffEmptyInitialObj: Staff = {
    staffId: '',
    fullName: '',
    image: '',
    gender: '',
    positionID: '',
    departmentID: '',
    roleID: '',
    email: '',
    phone: '',
    address: '',
    leaveBalance: []
  }