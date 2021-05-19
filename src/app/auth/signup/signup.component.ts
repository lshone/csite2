/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth.style.css']
})
export class SignupComponent implements OnInit {


  signUpForm: FormGroup;
  hide: boolean = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router

  ) {
      this.signUpForm = this.fb.group({
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
    return this.signUpForm.get('email') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }

  async signUp() {
    const user = await this.auth.signUpEmail(this.email?.value, this.password?.value);
    if (this.signUpForm.valid)
      [
        this.router.navigate(['/'])
      ];
  }


}
