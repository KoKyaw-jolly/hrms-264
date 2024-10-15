export interface Department {
    id: string;
    prefixId: string;
    name: string;
    description: string;
}

export const defaultDepartmentObj: Department = {
    id: '',
    prefixId: '',
    name: '',
    description: ''
}