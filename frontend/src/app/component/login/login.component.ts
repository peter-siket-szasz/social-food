import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { CredentialService } from 'src/app/services/credential.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() username;

  modalRef: BsModalRef;
  headerText = 'Kirjaudu';

  registerForm;
  loginForm;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private httpService: HttpService,
              private cookieService: CookieService, private credentialService: CredentialService) {
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
    this.httpService.registerUser(data).subscribe(_ => {
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
        this.cookieService.set('user_name', response.name);
        if (this.cookieService.get('user_name') === response.name) {
          this.credentialService.changeUser(response.name);
          this.closeModal();
        } else {
          alert('Login failed. Please check that cookies are allowed.');
          this.closeModal();
        }
      }
    },
    error => {
      alert(error.error);
    });
  }

  logout() {
    this.credentialService.changeUser('');
    this.cookieService.deleteAll();
  }

}
