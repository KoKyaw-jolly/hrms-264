import { StaffType } from "../../../core/models/master/staff-type.interface";

export interface StaffTypeState {
    staffType: StaffType[];
    loading: boolean;
    error: any;
}

export const staffTypeInitialState: StaffTypeState = {
    staffType: [],
    loading: false,
    error: null
}