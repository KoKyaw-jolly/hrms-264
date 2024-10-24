import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { metaReducers } from './store/reducer/app.reducer';
import { provideNzIcons } from './icons-provider';
import { StoreModule } from '@ngrx/store';
import { roleReducer } from './store/reducer/master/role.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoleEffect } from './store/effect/master/role.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/reducer/auth.reducer';
import { AuthEffect } from './store/effect/auth.effect';
import { departmentReducer } from './store/reducer/master/department.reducer';
import { DepartmentEffect } from './store/effect/master/department.effect';
import { positionReducer } from './store/reducer/master/position.reducer';
import { PositionEffect } from './store/effect/master/position.effect';
import { leaveTypeReducer } from './store/reducer/master/leave-type.reducer';
import { LeaveTypeEffect } from './store/effect/master/leave-type.effect';
import { holidayReducer } from './store/reducer/holiday.reducer';
import { HolidayEffect } from './store/effect/holiday.effect';
import { staffReducer } from './store/reducer/staff.reducer';
import { StaffEffect } from './store/effect/staff.effect';
import { staffTypeReducer } from './store/reducer/master/staff-type.reducer';
import { StaffTypeEffect } from './store/effect/master/staff-type.effect';
import { leaveReducer } from './store/reducer/leave.reducer';
import { LeaveEffect } from './store/effect/leave.effect';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideNzIcons(),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      FormsModule,
      StoreModule.forRoot(
        {
          authInfo: authReducer,
          role: roleReducer,
          department: departmentReducer,
          position:positionReducer,
          leaveType: leaveTypeReducer,
          holiday: holidayReducer,
          staff: staffReducer,
          staffType: staffTypeReducer,
          leave: leaveReducer
        },
        {
          metaReducers,
          runtimeChecks: {
            strictActionImmutability: false,
            strictStateImmutability: true
          }
        }
      ),
      EffectsModule.forRoot([
        AuthEffect,
        RoleEffect,
        DepartmentEffect,
        PositionEffect,
        LeaveTypeEffect,
        HolidayEffect,
        StaffEffect,
        StaffTypeEffect,
        LeaveEffect
      ]),
      StoreDevtoolsModule.instrument()
    )
  ]
};
