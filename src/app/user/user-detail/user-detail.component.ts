/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.userService.getUser(id).subscribe(user => this.user = user!);
    // console.log(this.user.displayName)
  }
}
