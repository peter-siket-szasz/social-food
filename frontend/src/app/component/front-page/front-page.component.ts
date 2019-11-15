import { Component, OnInit } from '@angular/core';
import { CredentialService } from 'src/app/services/credential.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  username: string;

  constructor(private credService: CredentialService, private cookieService: CookieService) { }

  ngOnInit() {
    this.credService.currentUser.subscribe(name => {
      this.username = name;
    })

    const user = this.cookieService.get('user_name');
    if (user) {
      this.credService.changeUser(user);
    }

  }

}
