import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({

  imports: [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatCardModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatToolbarModule,
],
  exports: [

  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatCardModule,
  MatProgressBarModule,
   MatSlideToggleModule,
  MatToolbarModule,
]

})
export class MaterialModule { }
