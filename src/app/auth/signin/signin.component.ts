/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../auth.style.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  hide: boolean = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router

  ) {
      this.signInForm = this.fb.group({
        email: ['',
          [
            Validators.email,
            Validators.required
          ]
        ],
        password: ['',
          [
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            Validators.required,
            Validators.min(6),
            Validators.max(25)

          ]
        ]
      });
   }

  ngOnInit(): void {
  }
  get email() {
    return this.signInForm.get('email') as FormControl;
  }

  get password() {
    return this.signInForm.get('password') as FormControl;
  }

  async signIn() {
    const user = await this.auth.signInEmail(this.email?.value, this.password?.value);
    if (this.signInForm.valid)
      [
        this.router.navigate(['/'])
      ];
  }

}
