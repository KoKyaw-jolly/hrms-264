export interface Holiday {
    id: string;
    name: string;
    date: Date;
    description?: string;
}

export const defaultHolidayObj: Holiday = {
    id: '',
    name: '',
    date: new Date(),
    description: ''
}