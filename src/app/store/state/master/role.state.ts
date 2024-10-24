import { Role } from "../../../core/models/master/role.interface";

export interface RoleState {
    role: Role[];
    loading: boolean;
    error: any;
}

export const roleInitialState: RoleState = {
    role: [],
    loading: false,
    error: null
}