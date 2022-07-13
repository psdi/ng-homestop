import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMomentDateModule,
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class NgMaterialModule { }