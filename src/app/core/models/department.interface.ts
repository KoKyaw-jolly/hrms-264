export interface Department {
    id: string;
    prefixID: string;
    name: string;
    description: string;
}

export const defaultDepartmentObj: Department = {
    id: '',
    prefixID: '',
    name: '',
    description: ''
}