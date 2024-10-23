import { createAction, props } from "@ngrx/store";
import { Role } from "../../../core/models/master/role.interface";

export const loadRole = createAction('[Role] Load role');
export const loadRoleSuccess = createAction('[Role] Load role success', props<{ role: Role[] }>());
export const loadRoleFail = createAction('[Role] Load role fail', props<{ error: any }>());

export const createRole = createAction('[Role] Create role',props<{ role: Role }>());
export const createRoleSuccess = createAction('[Role] Create role success', props<{ msg: any }>());
export const createRoleFail = createAction('[Role] Create role fail', props<{ error: any }>());

export const updateRole = createAction('[Role] Update role',props<{ role: Role }>());
export const updateRoleSuccess = createAction('[Role] Update role success', props<{ msg: any }>());
export const updateRoleFail = createAction('[Role] Update role fail', props<{ error: any }>());

export const deleteRole = createAction('[Role] Delete role',props<{ id: string }>());
export const deleteRoleSuccess = createAction('[Role] Delete role success', props<{ msg: any }>());
export const deleteRoleFail = createAction('[Role] Delete role fail', props<{ error: any }>());