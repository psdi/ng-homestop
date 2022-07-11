import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomestopComponent } from './homestop.component';

@NgModule({
  declarations: [
    HomestopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomestopComponent]
})
export class AppModule { }
