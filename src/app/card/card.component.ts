import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../models/Card';
import { CardService } from '../services/card.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  public cardData: string;
  public showOptionsFlag: boolean= false;
  constructor(private cardService: CardService, private globalService: GlobalService) {
   }

  ngOnInit() {
    this.cardData= this.card.cardData;
  }

  public deleteCard() {
    this.cardService.deleteCard(this.card.cardId).subscribe(
      res=> {
        this.globalService.update$.next('list');
      },
      error=> {
        console.log("error=" + JSON.stringify(error));
      }
    )
  }

  public updateCard() {
    this.cardService.updateCard(this.card.cardId, this.cardData).subscribe(
      res=> {
        this.globalService.update$.next('list');
      },
      error=> {
        console.log("error=" + JSON.stringify(error));
      }
    )
  }

  public showOptions() {
    this.showOptionsFlag= true;
  }
}
