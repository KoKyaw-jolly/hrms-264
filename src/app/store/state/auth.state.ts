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
            staffId: '',
            fullName: '',
            image: '',
            gender: '',
            positionID: '',
            departmentID: '',
            email: '',
            phone: '',
            address: '',
            roleID: '',
            leaveBalance: []
        }
    },
    loading: false,
    error: null
}