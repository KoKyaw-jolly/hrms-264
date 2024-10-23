import { Component, OnInit } from '@angular/core';
import { APP_IMPORT } from '../../app.import';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { SideMenuList } from '../../core/models/menu.interface';
import { IMAGES } from '../../core/constants/images-url';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import * as roleActions from '../../store/action/master/role.action';
import * as departmentActions from '../../store/action/master/department.action';
import * as positionActions from '../../store/action/master/position.action';
import * as leaveTypeActions from '../../store/action/master/leave-type.action';
import * as holidayActions from '../../store/action/holiday.action';
import * as staffActions from '../../store/action/staff.action';
import * as staffTypeActions from '../../store/action/master/staff-type.action';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    APP_IMPORT,
    HeaderComponent,
    RouterModule
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  images= IMAGES;

  sideMenuList = SideMenuList;
  menuCollapsed = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(roleActions.loadRole());
    this.store.dispatch(departmentActions.loadDepartment());
    this.store.dispatch(positionActions.loadPosition());
    this.store.dispatch(leaveTypeActions.loadLeaveType());
    this.store.dispatch(holidayActions.loadHoliday());
    this.store.dispatch(staffActions.loadStaff());
    this.store.dispatch(staffTypeActions.loadStaffType());
  }

}
