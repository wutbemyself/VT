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

  Insert(data) {
    return this._http.post('/api/users/insert', data).map(result =>
      // this.result = result.json().data
      result.json().data || { resultCode: 500, data: this.result.json().data , message:'insert fail.' }
    );
  }
}
