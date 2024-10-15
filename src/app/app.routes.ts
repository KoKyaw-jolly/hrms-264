import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth-pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { RoleListComponent } from './components/master/role-list/role-list.component';
import { DepartmentListComponent } from './components/master/department-list/department-list.component';
import { PositionListComponent } from './components/master/position-list/position-list.component';
import { LeaveTypeComponent } from './components/master/leave-type/leave-type.component';
import { CalendarManagementComponent } from './components/general-setting/calendar-management/calendar-management.component';
import { CustomCalendarComponent } from './share/components/custom-calendar/custom-calendar.component';
import { StaffCreateEditComponent } from './components/staff-management/staff-create-edit/staff-create-edit.component';
import { StaffListComponent } from './components/staff-management/staff-list/staff-list.component';

export const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: 'dashboard', component: MainDashboardComponent },
            {
                path: 'master', children: [
                    { path: 'role-list', component: RoleListComponent },
                    { path: 'department-list', component: DepartmentListComponent },
                    { path: 'position-list', component: PositionListComponent },
                    { path: 'leave-type', component: LeaveTypeComponent },
                ]
            },
            {
                path: 'staff-management', children: [
                    { path: 'staff-list',children: [
                        { path: '', component: StaffListComponent },
                        { path: 'staff-edit/:id', component: StaffCreateEditComponent },
                    ]
                    },
                    { path: 'staff-create', component: StaffCreateEditComponent },
                ]
            },
            {
                path: 'general-setting', children: [
                    // { path: 'calendar-management', component: CalendarManagementComponent },
                    { path: 'calendar-management', component: CustomCalendarComponent }
                ]
            },
        ]
    }
];
