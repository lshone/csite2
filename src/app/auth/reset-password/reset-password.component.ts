/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email!: string;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword(){
    this.auth.resetPassword(this.email)
  }
}
