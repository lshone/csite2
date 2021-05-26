import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';


import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component'

const routes: Routes = [
  {path: 'me', component: UserDashboardComponent, data: {title: 'Dashboard'}},
  {path: 'users', component: UserListComponent, data: {title: 'Users'}},
  {path: 'profile', component: UserDetailComponent, data: {title: 'My Profile'}}

]

@NgModule({
  declarations: [
    UserDetailComponent,
    UserListComponent,
    UserDashboardComponent,
    UserListItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [UserService]
})
export class UserModule { }
