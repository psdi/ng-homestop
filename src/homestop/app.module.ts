import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomestopComponent } from './homestop.component';
import { FinancesComponent } from './finances/finances.component';

@NgModule({
  declarations: [
    HomestopComponent,
    FinancesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [HomestopComponent]
})
export class AppModule { }
