import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private refreshSource = new Subject<void>();
  refreshObs = this.refreshSource.asObservable();

  constructor() { }

  refresh() {
    this.refreshSource.next();
  }
}
