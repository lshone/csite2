import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: SigninComponent, data: {title: 'Sign In'} },
  {path: 'signin', component: SigninComponent, data: {title: 'Sign In'} },
  {path: 'signup', component: SignupComponent, data: {title: 'Sign Up'} },
  {path: 'reset-password', component: ResetPasswordComponent, data: {title: 'Reset Password'}}
]

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthModule { }
