import { createAction, props } from "@ngrx/store";
import { Department } from "../../../core/models/master/department.interface";

export const loadDepartment = createAction('[Department] Load department');
export const loadDepartmentSuccess = createAction('[Department] Load department success', props<{ department: Department[] }>());
export const loadDepartmentFail = createAction('[Department] Load department fail', props<{ error: any }>());

export const createDepartment = createAction('[Department] Create department',props<{ department: Department }>());
export const createDepartmentSuccess = createAction('[Department] Create department success', props<{ msg: any }>());
export const createDepartmentFail = createAction('[Department] Create department fail', props<{ error: any }>());

export const updateDepartment = createAction('[Department] Update department',props<{ department: Department }>());
export const updateDepartmentSuccess = createAction('[Department] Update department success', props<{ msg: any }>());
export const updateDepartmentFail = createAction('[Department] Update department fail', props<{ error: any }>());

export const deleteDepartment = createAction('[Department] Delete department',props<{ id: string }>());
export const deleteDepartmentSuccess = createAction('[Department] Delete department success', props<{ msg: any }>());
export const deleteDepartmentFail = createAction('[Department] Delete department fail', props<{ error: any }>());