/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';

import { User } from '../user.model';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../user.service';

import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})

export class UserDashboardComponent implements OnInit {
  user!: User | null | undefined;
  editing: boolean = false;
  image: string ='';


  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    return this.auth.user.subscribe(user => (this.user = user))
  }

  updateProfile(){
    console.log('user profile update')
    return this.userService.updateProfileData(
      this.user?.displayName,
      this.user?.photoURL
    )
  }
  updateEmail() {
    return this.userService.updateEmailData(
      this.user?.email
    )
  }

  uploadPhotoURL (event:any){
    const file = event.target.files[0];
    const path = `users/${this.user?.uid}photo/${file.name}`

    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task = this.storage.upload(path, file);

      //this.uploadPercent = task.percentageChanges();

      const storageRef = this.storage.ref(path);
     // this.downloadURL = storageRef.getDownloadURL();

     task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(url => {
          (this.image = url);
          this.userService.updateProfileData(this.user?.displayName, url)
          console.log('url of photo ' + url); // <-- do what ever you want with the url..
        });
      })
    ).subscribe();
    }
  }

  updateUser(){
    const data = {
      website: this.user?.website || null,
      location: this.user?.location || null,
      bio: this.user?.bio || null
    };
    return this.userService.updateUserData(data);
  }

  goBack(){
    this.location.back()
  }

}
