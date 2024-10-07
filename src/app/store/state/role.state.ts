import { Role } from "../../core/models/role.interface";

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