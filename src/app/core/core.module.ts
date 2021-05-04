import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from './auth.service';




@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [AuthService]
})
export class CoreModule { }
