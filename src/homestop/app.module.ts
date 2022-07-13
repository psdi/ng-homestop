import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomestopComponent } from './homestop.component';
import { FinancesComponent } from './finances/finances.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from './ng-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomestopComponent,
    FinancesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMaterialModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [HomestopComponent]
})
export class AppModule { }
