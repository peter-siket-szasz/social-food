import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { MatMenuModule, MatIconModule, MatButtonModule } from "@angular/material";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { AppComponent } from './app.component';
import { FrontPageComponent } from './component/front-page/front-page.component';
import { MapComponent } from './component/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './component/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    MapComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
