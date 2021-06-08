import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserAnimationsModule,
    AuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    UserModule
  ],
  providers: [AuthService]
})
export class CoreModule { }
