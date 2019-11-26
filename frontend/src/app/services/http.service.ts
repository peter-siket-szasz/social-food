import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


const api_url: string = environment.api_url;


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpHeader = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(private http: HttpClient) { }

  registerUser(data) {
    return this.http.post<any>(api_url+'/users', data, this.httpHeader);
  }

  loginUser(data) {
    return this.http.post<any>(api_url+'/login', data, this.httpHeader);
  }

  getUser(id: string) {
    return this.http.get(api_url+'/users/'+id);
  }

  addOffer(data) {
    return this.http.post<any>(api_url+'/addoffer', data, this.httpHeader);
  }

  getOffers() {
    return this.http.get<any>(api_url+'/offers');
  }

  getOffersFor(id: string) {
    return this.http.get<any>(api_url+'/offers/'+id);
  }

  dibs(data) {
    return this.http.post<any>(api_url+'/dibs', data, this.httpHeader);
  }

  undibs(data) {
    return this.http.post<any>(api_url+'/undibs', data, this.httpHeader);
  }

  getDibsesFor(id: string) {
    return this.http.get<any>(api_url+'/dibses/'+id);
  }

  deleteOffer(id: string) {
    return this.http.delete(api_url+'/offers/'+id);
  }

  deleteUser(id: string) {
    return this.http.delete(api_url+'/users/'+id);
  }
}
