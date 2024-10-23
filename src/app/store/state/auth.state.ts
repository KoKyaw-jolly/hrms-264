import { Staff } from "../../core/models/staff.interface";

export interface AuthInfo {
    user: Staff
}

export interface AuthInfoState {
    userInfo: AuthInfo;
    loading: boolean;
    error:any
}

export const authInitialState: AuthInfoState = {
    userInfo: {
        user: {
            id: '',
            staffId: '',
            fullName: '',
            image: '',
            gender: '',
            birthday: new Date(),
            positionId: '',
            departmentId: '',
            staffType: '',
            roleId: '',
            email: '',
            phone: '',
            address: '',
            leaveBalance: []
        }
    },
    loading: false,
    error: null
}