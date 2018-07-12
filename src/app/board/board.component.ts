import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { List } from '../models/List';
import { CardService } from '../services/card.service';
import { Card } from '../models/Card';
import { GlobalService } from '../services/global.service';
import { BoardService } from '../services/board.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public lists: List[] = [];
  constructor(private listService: ListService, private cardService: CardService, public globalService: GlobalService,
    private boardService: BoardService, private router: Router) { 
      globalService.update$.subscribe(
        data=> {
          if(data=== 'list'){
            this.getLists();
          }
        }
      )
    }

  ngOnInit() {
    this.getLists();
  }

  public getLists() {
    this.listService.getLists().subscribe(
      res => {
        this.lists = res.data as List[];
        if (this.lists.length > 0) {
          this.lists.forEach(list => {
            this.cardService.getCards(list.listId).subscribe(
              cardRes => {
                list.cards = cardRes.data as Card[];
              },
              error => {
                console.log("error=" + JSON.stringify(error));
                list.cards = [];
              });
          });
        }
      },
      error => {
        console.log("error=" + JSON.stringify(error));
      }
    )
  }

  public addList() {
    let list = new List();
    list.listName = prompt("Enter list name");
    if (list.listName != '') {
      list.boardId = this.globalService.boardId;

      this.listService.createList(list).subscribe(
        res => {
          res.data.cards=[];
          this.lists.push(res.data as List);
        },
        error => {
          console.log("error=" + JSON.stringify(error));
        }
      )
    }
  }

  public deleteBoard() {
    this.boardService.deleteBoard().subscribe(
      res=> {
        this.router.navigate(['dashboard']);
      },
      error=> {
        console.log("error=" + JSON.stringify(error));
      }
    )
  }
}
