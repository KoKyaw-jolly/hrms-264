import { AppState } from "../state/app.state";

export const selectAuthUserInfo = (state: AppState) => state.authInfo;