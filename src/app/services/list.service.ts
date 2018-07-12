import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalService } from './global.service';
import { List } from '../models/List';

@Injectable()
export class ListService {

  private headers: Headers;
  constructor(private configuration: Configuration, private http: Http, private globalService: GlobalService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json;charset=UTF-8');
  }

  public getLists() {
    return this.http.get(this.configuration.baseUrl + this.configuration.fetchListsUrl + this.globalService.boardId, { headers: this.headers })
      .map(res => res.json());
  }

  public createList(newList: List) {
    return this.http.post(this.configuration.baseUrl + this.configuration.createListUrl, newList, { headers: this.headers })
      .map(res => res.json());
  }

  public deleteList(listId: string) {
    return this.http.delete(this.configuration.baseUrl + this.configuration.deleteListUrl + listId, { headers: this.headers })
      .map(res => res.json());
  }
}
