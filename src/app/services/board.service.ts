import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalService } from './global.service';
import { Board } from '../models/Board';

@Injectable()
export class BoardService {

  private headers: Headers;
  constructor(private configuration: Configuration, private http: Http, private globalService: GlobalService) { 
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json;charset=UTF-8');
  }

  public getBoards() {
    return this.http.get(this.configuration.baseUrl + this.configuration.fetchBoardsUrl + this.globalService.userId, {headers: this.headers})
    .map(res => res.json());
  }

  public createBoard(newBoard: Board) {
    return this.http.post(this.configuration.baseUrl + this.configuration.createBoardUrl, newBoard, {headers: this.headers})
    .map(res=> res.json());
  }

  public deleteBoard(board?: string) {
    let boardId= board?board:this.globalService.boardId;
    return this.http.delete(this.configuration.baseUrl + this.configuration.deleteBoardUrl + boardId, {headers: this.headers})
    .map(res=> res.json());
  }

}
