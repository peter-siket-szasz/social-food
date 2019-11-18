import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/services/http.service';
import { UpdateService } from 'src/app/services/update.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  width = document.getElementById('wrapper').offsetWidth - 30 + 'px';
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
  };
  markers = [];
  openMarker;
  dibsed = false;
  offerId: number;

  modalRef: BsModalRef;
  offerForm;
  mapClickEvent;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,
              private cookieService: CookieService, private httpService: HttpService, private updateService: UpdateService) {
    this.offerForm = this.formBuilder.group({
      title: '',
      description: ''
    });
  }

  ngOnInit() {
    this.getOffers();
    this.updateService.refreshObs.subscribe(_ => this.getOffers());
  }

  openOfferModal(template: TemplateRef<any>, event) {
    if (!this.cookieService.get('user_id')) {
      alert('Please log in to offer food');
      return;
    }
    this.modalRef = this.modalService.show(template);
    this.mapClickEvent = event;
  }

  closeModal() {
    this.modalRef.hide();
  }

  addOffer(formData) {
    const requestData = {
      title: formData.title,
      description: formData.description,
      lat: this.mapClickEvent.latLng.lat(),
      lng: this.mapClickEvent.latLng.lng(),
      owner_id: this.cookieService.get('user_id')
    };
    this.httpService.addOffer(requestData).subscribe(_ => {
      this.getOffers();
      this.closeModal();
    });
  }

  getOffers() {
    this.httpService.getOffers().subscribe(response => {
      this.markers = [];
      response.forEach(data => {
        this.markers.push({
          position: {
            lat: data.lat,
            lng: data.lng
          },
          label: {
            color: 'black',
            text: '🥩'
          },
          title: data.title,
          description: data.description,
          dibsed: data.dibsedby_id,
          id: data.id,
          tg: data.owner.telegram,
          options: {
            animation: google.maps.Animation.DROP
          }
        });
      });
    });
  }

  openInfo(marker: MapMarker, markerObject) {
    this.openMarker = markerObject;
    this.dibsed = Boolean(markerObject.dibsed);
    this.offerId = markerObject.id;
    this.infoWindow.open(marker);
  }

  dibs() {
    const userId = this.cookieService.get('user_id');
    if (userId) {
      const requestData = {
        offer_id: this.offerId,
        user_id: userId
      };
      this.dibsed = true;
      this.httpService.dibs(requestData).subscribe(response => {
        this.updateService.refresh();
      });
    } else {
      alert('Please log in to dibs.');
    }
  }
}
