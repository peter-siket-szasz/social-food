import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalRef: BsModalRef;
  headerText = 'Kirjaudu';

  registerForm;
  loginForm;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private httpService: HttpService,
              private cookieService: CookieService) {
    this.registerForm = this.formBuilder.group({
      name: '',
      email: '',
      telegram: '',
      pw: ''
    });

    this.loginForm = this.formBuilder.group({
      name: '',
      pw: ''
    });
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  registerUser(data) {
    this.httpService.registerUser(data).subscribe(response => {
      this.cookieService.set('user_id', response.id);
      this.closeModal();
      alert('Success!');
    },
    error => {
      alert(error.error);
    });
  }

  loginUser(data) {
    this.httpService.loginUser(data).subscribe(response => {
      if (response.error) {
        alert(response.error);
      } else {
        this.cookieService.set('user_id', response.id);
        this.closeModal();
      }
    },
    error => {
      alert(error.error);
    })
  }

}
