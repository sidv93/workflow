import { Component, OnInit, Input } from '@angular/core';
import { List } from '../models/List';
import { Card } from '../models/Card';
import { CardService } from '../services/card.service';
import { ListService } from '../services/list.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: List;
  constructor(private cardService: CardService, private listService: ListService,private globalService: GlobalService) { }

  ngOnInit() {
  }

  public addCard() {
    let card = new Card();
    card.cardData = prompt("Enter card name");
    if (card.cardData != '') {
      card.listId = this.list.listId;

      this.cardService.createCard(card).subscribe(
        res => {
          this.list.cards.push(res.data as Card);
        },
        error => {
          console.log("error=" + JSON.stringify(error));
        }
      )
    }
  }

  public deleteList() {
    this.listService.deleteList(this.list.listId).subscribe(
      res=> {
        this.globalService.update$.next('list');
      },
      error=> {
        console.log("error=" + JSON.stringify(error));
      }
    )
  }
}
