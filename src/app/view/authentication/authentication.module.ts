import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MaterialLibrary } from 'src/app/library/material.lib';
import { UpdateCredentialsComponent } from './update-credentials/update-credentials.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { AccountInfoComponent } from './signup/account-info/account-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [SignupComponent, LoginComponent, UpdateCredentialsComponent, ResetPasswordComponent, RecoveryComponent, AccountInfoComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialLibrary,
    ReactiveFormsModule,
    NgxCaptchaModule,
    RecaptchaModule,
    MatFormFieldModule
  ]
})
export class AuthenticationModule { }
