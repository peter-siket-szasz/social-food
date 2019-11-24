import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { UpdateService } from 'src/app/services/update.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() username;
  isCollapsed = true;
  mobile = window.innerWidth < 992;

  modalRef: BsModalRef;
  offers = [];
  dibses = [];
  profile;

  constructor(private modalService: BsModalService, private httpService: HttpService, private cookieService: CookieService,
              private updateService: UpdateService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, name: string) {
    if (!this.cookieService.get('user_id')) {
      alert('Please log in first');
      return;
    }
    if (name === 'offer') {
      this.offers = [];
      this.getOffers();
    } else if (name === 'dibs') {
      this.dibses = [];
      this.getDibses();
    } else if (name == 'profile') {
      this.getProfileInfo();
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  getOffers() {
    const id = this.cookieService.get('user_id');
    if (id) {
      this.httpService.getOffersFor(id).subscribe(response => {
        this.offers = response;
      });
    } else {
      alert('Error while getting offers. Please make sure you are logged in.');
      this.closeModal();
    }
  }

  getDibses() {
    const id = this.cookieService.get('user_id');
    if (id) {
      this.httpService.getDibsesFor(id).subscribe(response => {
        this.dibses = response;
      });
    } else {
      alert('Error while getting dibses. Please make sure you are logged in.');
      this.closeModal();
    }
  }

  deleteOffer(id) {
    this.httpService.deleteOffer(id).subscribe(response => {
      this.getOffers();
      this.updateService.refresh();
    },
    error => {
      alert('Deleting failed');
    });
  }

  undibs(id) {
    const request = {
      offer_id: id
    };
    this.httpService.undibs(request).subscribe(response => {
      this.getDibses();
      this.updateService.refresh();
    },
    error => {
      alert('Couldn\'t undibs');
      console.log(error);
    });
  }

  getProfileInfo() {
    const id = this.cookieService.get('user_id');
    if (id) {
      this.httpService.getUser(id).pipe(map(data => [data])).subscribe(response => {
        this.profile = response;
      })
    } else {
      alert('Error while getting profile info. Please make sure you are logged in.');
      this.closeModal();
    }
  }
}
