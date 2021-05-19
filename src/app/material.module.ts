import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';

@NgModule({

  imports: [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule


],
  exports: [

  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule


]

})
export class MaterialModule { }
