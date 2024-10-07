import { Component, inject } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { IMAGES } from '../../../core/constants/images-url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppDataInitService } from '../../../core/services/app-data-init.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { selectAuthUserInfo } from '../../../store/selector/auth.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    APP_IMPORT
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  images = IMAGES;

  loginForm!: FormGroup;

  loginLoding: boolean = false;
  loginError: any;

  private appService = inject(AppDataInitService);

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.minLength(6)]
    });
  }

  loginClick(): void {
    this.loginLoding = true;
    if (this.loginForm.valid) {
      this.appService.appDataInit(this.loginForm.value);
      this.store.select(selectAuthUserInfo).subscribe(res => {
        console.log(res);
        this.loginLoding = res.loading;
        this.loginError = res.error;
      })
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.loginLoding = false;
    }
  }
}
