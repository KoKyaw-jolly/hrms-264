import { Holiday } from "../../core/models/holiday.interface";

export interface HolidayState {
    holiday: Holiday[];
    loading: boolean;
    error: any;
}

export const holidayInitialState: HolidayState = {
    holiday: [],
    loading: false,
    error: null
}