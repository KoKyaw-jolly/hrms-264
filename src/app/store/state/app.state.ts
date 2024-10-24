import { AuthInfoState } from "./auth.state";
import { DepartmentState } from "./master/department.state";
import { HolidayState } from "./holiday.state";
import { LeaveTypeState } from "./master/leave-type.state";
import { PositionState } from "./master/position.state";
import { RoleState } from "./master/role.state";
import { StaffState } from "./staff.state";
import { StaffTypeState } from "./master/staff-type.state";
import { LeaveState } from "./leave.state";



export interface AppState {
    authInfo: AuthInfoState;
    role: RoleState;
    department: DepartmentState;
    position: PositionState;
    leaveType: LeaveTypeState;
    holiday: HolidayState;
    staff: StaffState;
    staffType: StaffTypeState;
    leave: LeaveState;
}