
export interface Menu {
    id: string;
    name: string;
    icon: string;
    routelink: string;
    sibmenuItems: SubMenuItem[];
}

export interface SubMenuItem {
    id: string;
    name: string;
    routelink: string;
}
export const SideMenuList: Menu[] = [
    {
        id: "dashboard",
        name: "Dashboard",
        icon: "fi fi-rr-apps",
        routelink: "dashboard",
        sibmenuItems: []
    },
    {
        id: "master",
        name: "Master",
        icon: "fi fi-rr-document",
        routelink: "",
        sibmenuItems: [
            {
                id: "masterRoleList",
                name: "Role List",
                routelink: "master/role-list"
            },
            {
                id: "masterDepartmentList",
                name: "Department List",
                routelink: "master/department-list"
            },
            {
                id: "masterPositionList",
                name: "Position List",
                routelink: "master/position-list"
            },
            {
                id: "masterLeaveType",
                name: "Leave Type",
                routelink: "master/leave-type"
            }
        ]
    },
    {
        id: "staffManagement",
        name: "Staff Management",
        icon: "fi fi-rr-users",
        routelink: "",
        sibmenuItems: [
            {
                id: "staffManagementCreate",
                name: "Staff Create",
                routelink: "staff-management/staff-create"
            },
            {
                id: "staffManagementList",
                name: "Staff List",
                routelink: "staff-management/staff-list"
            },
            {
                id: "staffManagementReport",
                name: "Staff Report",
                routelink: "staff-management/staff-report"
            }
        ]
    },
    {
        id: "attendanceManagement",
        name: "Attendance Management",
        icon: "fi fi-rr-calendar-clock",
        routelink: "",
        sibmenuItems: [
            {
                id: "attendanceManagementReport",
                name: "Attendance Report",
                routelink: "attendance-management/attendance-report"
            }
        ]
    }
]