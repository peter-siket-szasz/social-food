import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http.service';

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

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private httpService: HttpService) {
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
      console.log(response);
    })
  }

}
