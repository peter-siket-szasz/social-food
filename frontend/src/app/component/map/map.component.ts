import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  width = document.getElementById("wrapper").offsetWidth - 30 + 'px';
  height = window.innerHeight - 200 + 'px';
  zoom = 15;
  center: google.maps.LatLngLiteral = {
    lat: 60.186881, 
    lng: 24.827493
  };

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDoubleClickZoom: false,
    maxZoom: 18,
    minZoom: 14
  }
  markers = [];
  infoContent = '';
  dibsed = false;

  constructor() { }
  
  ngOnInit() {
  }
  
  addMarker(event) {
    this.markers.push({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      label: {
        color: 'black',
        text: 'Tikka masala ' + (this.markers.length + 1)
      },
      title: 'Title ' + (this.markers.length + 1),
      info: 'Mm, hyvää',
      options: {
        animation: google.maps.Animation.DROP
      }
    })
  }

  openInfo(marker: MapMarker, content) {
    this.dibsed = false;
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

  dibs() {
    this.dibsed = true;
    this.infoContent = 'Dibsed';
  }

  infoClosed() {
    this.dibsed = false;
  }

}
