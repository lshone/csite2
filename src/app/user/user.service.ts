
import { Injectable } from '@angular/core';
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument} from '@angular/fire/firestore';

import { AuthService } from '../core/auth.service';

import { User } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection!: AngularFirestoreCollection<User>;
  userDoc!: AngularFirestoreDocument<User>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService

    ) { }

  getUsers() {
    this.userCollection = this.afs.collection('users')
    return this.userCollection.valueChanges()
  }

  getUser (id: string | null){
    this.userDoc = this.afs.doc<User>(`users/${id}`)
    return this.userDoc.valueChanges();
  }

  updateProfileData(displayName: string | undefined, photoURL:string | undefined){
    const user = this.auth.authState
    const data = {displayName, photoURL}
    return user.updateProfile(data)
    .then(() => this.afs.doc(`users/${user.uid}`).update({displayName, photoURL}))
    .then(() => console.log('Profile has been updated'))
    .catch((error: { message: any; }) => console.log(error.message))
    }

  updateEmailData(email: string | null | undefined){
    const user = this.auth.authState;
    const error = '';
    return user.updateEmail(email)


    .then(() => this.afs.doc(`users/${user.uid}`).update({email} ))
    .then(() => console.log('Email has been updated' + email))
    .then( (user: User) => {
      this.auth.authState.sendSendEmailVerification()
      .then(() => console.log("Email verification has been sent."))
      .catch((error: { message: any; }) => console.log(error.message))
    })
    .catch((error: { message: any; }) => console.log(error.message))
  }

  updateUserData(data: any){
    const uid = this.auth.currentId;
    return this.afs.doc(`users/${uid}`).update(data)

  }
}
