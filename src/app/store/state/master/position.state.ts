import { Position } from "../../../core/models/position.interface";

export interface PositionState {
    position: Position[];
    loading: boolean;
    error: any;
}

export const positionInitialState: PositionState = {
    position: [],
    loading: false,
    error: null
}
