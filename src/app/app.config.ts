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
import { roleReducer } from './store/reducer/role.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoleEffect } from './store/effect/role.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/reducer/auth.reducer';
import { AuthEffect } from './store/effect/auth.effect';
import { departmentReducer } from './store/reducer/department.reducer';
import { DepartmentEffect } from './store/effect/department.effect';
import { positionReducer } from './store/reducer/position.reducer';
import { PositionEffect } from './store/effect/position.effect';
import { leaveTypeReducer } from './store/reducer/leave-type.reducer';
import { LeaveTypeEffect } from './store/effect/leave-type.effect';

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
          leaveType: leaveTypeReducer
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
        LeaveTypeEffect
      ]),
      StoreDevtoolsModule.instrument()
    )
  ]
};
