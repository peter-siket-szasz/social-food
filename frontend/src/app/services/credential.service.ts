import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  private credSource = new Subject<string>();
  currentUser = this.credSource.asObservable();

  constructor() { }

  changeUser(name: string) {
    this.credSource.next(name);
  }
}
