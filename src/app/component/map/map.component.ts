import { Component, OnInit } from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from "@angular/google-maps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  width = document.getElementById("wrapper").offsetWidth - 30 + 'px';
  height = window.innerHeight - 200 + 'px';
  zoom = 15;
  center: google.maps.LatLngLiteral = {
    lat: 60.186881, 
    lng: 24.827493
  };

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 18,
    minZoom: 14
  }


  constructor() { }

  ngOnInit() {
  }

}
