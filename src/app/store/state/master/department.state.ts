import { Department } from "../../../core/models/master/department.interface";

export interface DepartmentState {
    department: Department[];
    loading: boolean;
    error: any;
}

export const departmentInitialState: DepartmentState = {
    department: [],
    loading: false,
    error: null
}