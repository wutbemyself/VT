import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  result: any;

  constructor(private _http: Http) { }
  getUser() {
    return this._http.get('/api/users').map(
      result => this.result = result.json().data
    );
  }

  Register(data) {
    let Header = new Headers();
    Header.append("Content-Type", "application/json");
    return this._http.post('/api/users/register', data, { headers: Header }).map(result =>
      result['_body'] || { resultCode: 500, data: this.result.json().data, message: 'insert fail.' }
    );
  }

  Login(data) {
    let Header = new Headers();
    Header.append("Content-Type", "application/json");
    return this._http.post('/api/users/authenticate', data, { headers: Header }).map(result =>
      result || { resultCode: 500, data: this.result.json().data, message: 'password fail.' }
    );
  }
}
