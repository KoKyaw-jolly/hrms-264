import { AuthInfoState } from "./auth.state";
import { DepartmentState } from "./department.state";
import { HolidayState } from "./holiday.state";
import { LeaveTypeState } from "./leave-type.state";
import { PositionState } from "./position.state";
import { RoleState } from "./role.state";
import { StaffState } from "./staff.state";



export interface AppState {
    authInfo: AuthInfoState;
    role: RoleState;
    department: DepartmentState;
    position: PositionState;
    leaveType: LeaveTypeState;
    holiday: HolidayState;
    staff: StaffState;
}