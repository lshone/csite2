import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({

  imports: [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatCardModule


],
  exports: [

  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatCardModule


]

})
export class MaterialModule { }
