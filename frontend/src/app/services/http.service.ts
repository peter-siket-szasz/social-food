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
}
