export interface Role {
    id: string;
    name: string;
    moduleAccess: string[];
    description: string;
}

export const defaultRoleObj: Role = {
    id: '',
    name: '',
    moduleAccess: [],
    description: ''
}