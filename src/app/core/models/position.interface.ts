export interface Position {
    id: string;
    name: string;
    description: string;
    departmentId: string;
}

export const defaultPositionObj: Position = {
    id: '',
    name: '',
    description: '',
    departmentId: ''
}