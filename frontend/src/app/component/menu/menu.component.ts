import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { UpdateService } from 'src/app/services/update.service';

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
  offers = [1, 2, 3];
  dibses = [];

  constructor(private modalService: BsModalService, private httpService: HttpService, private cookieService: CookieService,
              private updateService: UpdateService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, name: string) {
    if (!this.cookieService.get('user_id')) {
      alert('Please log in first');
      return;
    }
    if (name == 'offer') {
      this.offers = [];
      this.getOffers();
    } else if (name == 'dibs') {
      this.getDibses();
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
      })
    } else {
      alert('Error while getting offers. Please make sure you are logged in.');
      this.closeModal();
    }
  }

  getDibses() {

  }

  deleteOffer(id) {
    this.httpService.deleteOffer(id).subscribe(response => {
      this.getOffers();
      this.updateService.refresh();
    },
    error => {
      alert('Deleting failed');
    })
  }

}
