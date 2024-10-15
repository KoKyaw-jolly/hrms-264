import { Staff } from "../../core/models/staff.interface";

export interface StaffState {
    staff: Staff[];
    loading: boolean;
    error: any;
}

export const staffInitialState: StaffState = {
    staff: [],
    loading: false,
    error: null
}