
import { Injectable } from '@angular/core';
import { provideRoutes, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../auth/user.model';
import { Md5 } from 'ts-md5'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<User | null | undefined>;

  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router

  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
      this.afAuth.authState.subscribe(data => {
        this.authState = data
      })
    }

    get Authenticated(): boolean {
      return this.authState !== null
    }

    get currentId(): string | null {
      return this.Authenticated ? this.authState.uid : null
    }

  async signInEmail(email: string, password: string){
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      return console.log('Signed in.');
    } catch (error) {
      return console.log('Sign in error.', error.message);
    }
  }

  async signUpEmail(email: string, password: string){
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.updateUserData(credential.user);
      await this.SendVerificationMail();
      return console.log('Welcome, your account has been created.');
    } catch (error) {
      return console.log('Account creation error.', error.message);
    }
  }

    async SendVerificationMail() {
      (await this.afAuth.currentUser)!.sendEmailVerification().then(() => {
         return console.log('email sent');
      });
  }

  async resetPassword(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return console.log("A password reset link has been sent to your emaill address. ");
    } catch (error) {
      return console.log('Account creation error.', error.message);
    }
  }

  private async socialLogin(provider: firebase.auth.AuthProvider){
    const credential = await this.afAuth.signInWithPopup(provider);
    try {
      return this.updateUserData(credential.user);
    } catch (error) {
      return console.log(error.message);
    }
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialLogin(provider);
  }

  facebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialLogin(provider);
  }

  async signOut (){
    await this.afAuth.signOut()
      .then (() => this.router.navigate(['/']));

  }

  private updateUserData(user: any)  {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      myCustomData: '',
      photoURL: user.photoURL || 'http://www.gravatar.com/avatar/' + Md5.hashStr(user.uid) + '?d=identicon'
    }
    return userRef.set(data, {merge:true})

  }

}
