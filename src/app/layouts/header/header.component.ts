import { Component } from '@angular/core';
import { IMAGES } from '../../core/constants/images-url';
import { APP_IMPORT } from '../../app.import';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import * as AuthAction from '../../store/action/auth.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [APP_IMPORT],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  images = IMAGES;

  constructor(
    private store: Store<AppState>
  ) { }

  logOut(): void {
    this.store.dispatch(AuthAction.logOut());
  }
}
