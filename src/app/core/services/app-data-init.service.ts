import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/state/app.state";
import { login } from "../../store/action/auth.action";
import { AuthCredential } from "../models/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AppDataInitService {
  constructor(
    private store: Store<AppState>
  ) { }

  public appDataInit(authCredentialData: AuthCredential): void {
    // this.store.dispatch(loadStaff());
    console.log(authCredentialData);
    this.store.dispatch(login(
      { authCredential: authCredentialData }
    ));
  }
}