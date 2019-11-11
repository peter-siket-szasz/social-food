import { Component, OnInit } from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from "@angular/google-maps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8
  }


  constructor() { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
    })
  }

}
