import { createAction, props } from "@ngrx/store";
import { Position } from "../../../core/models/master/position.interface";

export const loadPosition = createAction('[Position] Load position');
export const loadPositionSuccess = createAction('[Position] Load position success', props<{ position: Position[] }>());
export const loadPositionFail = createAction('[Position] Load position fail', props<{ error: any }>());

export const createPosition = createAction('[Position] Create position',props<{ position: Position }>());
export const createPositionSuccess = createAction('[Position] Create position success', props<{ msg: any }>());
export const createPositionFail = createAction('[Position] Create position fail', props<{ error: any }>());

export const updatePosition = createAction('[Position] Update position',props<{ position: Position }>());
export const updatePositionSuccess = createAction('[Position] Update position success', props<{ msg: any }>());
export const updatePositionFail = createAction('[Position] Update position fail', props<{ error: any }>());

export const deletePosition = createAction('[Position] Delete position',props<{ id: string }>());
export const deletePositionSuccess = createAction('[Position] Delete position success', props<{ msg: any }>());
export const deletePositionFail = createAction('[Position] Delete position fail', props<{ error: any }>());