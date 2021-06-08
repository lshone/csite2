import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { PostModule } from './post/post.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    PostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
