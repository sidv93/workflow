import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  private headers: Headers;
  constructor(private configutation: Configuration, private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json;charset=UTF-8');
  }

  public login(loginValues: any): Observable<any> {
    return this.http.post(this.configutation.baseUrl + this.configutation.loginUrl, loginValues, { headers: this.headers }).map(res => res.json());
  }
}