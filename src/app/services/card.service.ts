import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalService } from './global.service';
import { Card } from '../models/Card';

@Injectable()
export class CardService {

  private headers: Headers;
  constructor(private configuration: Configuration, private http: Http, private globalService: GlobalService) { 
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json;charset=UTF-8');
  }

  public getCards(listId: string) {
    return this.http.get(this.configuration.baseUrl + this.configuration.fetchCardssUrl + listId, {headers: this.headers})
    .map(res=> res.json());
  }

  public createCard(card: Card) {
    return this.http.post(this.configuration.baseUrl + this.configuration.createCardUrl, card, {headers: this.headers})
    .map(res=> res.json());
  }

  public deleteCard(cardId: string) {
    return this.http.delete(this.configuration.baseUrl + this.configuration.deleteCardUrl + cardId, {headers: this.headers})
    .map(res=> res.json());
  }

  public updateCard(cardId: string, cardData: string) {
    let cardText = { "cardData": cardData };
    return this.http.put(this.configuration.baseUrl + this.configuration.createCardUrl + cardId, cardText, {headers: this.headers})
    .map(res=> res.json());
  }
}
