import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth-pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { RoleListComponent } from './components/master/role-list/role-list.component';
import { DepartmentListComponent } from './components/master/department-list/department-list.component';
import { PositionListComponent } from './components/master/position-list/position-list.component';
import { LeaveTypeComponent } from './components/master/leave-type/leave-type.component';

export const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: 'dashboard', component: MainDashboardComponent },
            { path: 'master/role-list', component: RoleListComponent },
            { path: 'master/department-list', component: DepartmentListComponent },
            { path: 'master/position-list', component: PositionListComponent },
            { path: 'master/leave-type', component: LeaveTypeComponent },
            
        ]
    }
];
