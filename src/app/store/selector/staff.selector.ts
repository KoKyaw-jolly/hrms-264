import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { Staff } from "../../core/models/staff.interface";

export const selectStaffState = (state: AppState) => state.staff;

export const selectStaffList = createSelector(
    selectStaffState,
    (staffState) => staffState.staff
);

export const selectStaffLoading = createSelector(
    selectStaffState,
    (staffState) => staffState.loading
);

export const selectStaffById = (staffId: string) => createSelector(
    selectStaffList,
    (staffList: Staff[]) => staffList.find(staff => staff.id === staffId)
);
