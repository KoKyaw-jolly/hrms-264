import { AuthInfoState } from "./auth.state";
import { DepartmentState } from "./department.state";
import { LeaveTypeState } from "./leave-type.state";
import { PositionState } from "./position.state";
import { RoleState } from "./role.state";



export interface AppState {
    authInfo: AuthInfoState;
    role: RoleState;
    department: DepartmentState;
    position: PositionState;
    leaveType: LeaveTypeState;
}