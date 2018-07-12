import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as uuidv4 from 'uuid/v4';
import { Http } from '@angular/http'; 
import { Configuration } from '../app.constants';

@Injectable()
export class GlobalService {

  public userId: string;
  public boardId: string;
  public boardName: string;
  public update$= new Subject();

  public generateToken() { 
    return uuidv4();
  }

  public verifyCookie(token: string) {
    let cookieToken = {
      "token": token
    };
    return this.http.post(this.configuration.baseUrl + this.configuration.loginUrl, cookieToken).map(res=> res.json());
  }
  constructor(private http: Http, private configuration: Configuration) { }

}
