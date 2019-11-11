import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";

import { AppComponent } from './app.component';
import { FrontPageComponent } from './component/front-page/front-page.component';
import { MapComponent } from './component/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
