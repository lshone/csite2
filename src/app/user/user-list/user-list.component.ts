/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users!: Observable<any[]>

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  this.getUsers();
  }

  getUsers(){
    this.users = this.userService.getUsers();
  }
}
