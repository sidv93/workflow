import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Board } from '../../models/Board';
import { Router } from "@angular/router";
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public boards: Board[] = [];
  constructor(private boardService: BoardService, private router: Router, private globalService: GlobalService) {
    globalService.update$.subscribe(
      data=> {
        if(data === 'board') {
          this.getBoards();
        }
      }
    )
  }

  ngOnInit() {
    this.getBoards();
  }

  public getBoards() {
    this.boardService.getBoards().subscribe(
      res => {
        this.boards = res.data as Board[];
      },
      error => {
        console.log("Error=" + JSON.stringify(error));
      }
    )
  }
  public getBoardDetails(boardId: string, boardName: string) {
    this.globalService.boardId = boardId;
    this.globalService.boardName = boardName;
    this.router.navigate(['board']);
  }

  public addBoard() {
    let board = new Board();
    board.boardName = prompt("Enter board name");
    if (board.boardName != '') {
      board.user = this.globalService.userId;

      this.boardService.createBoard(board).subscribe(
        res => {
          this.boards.push(res.data as Board);
        },
        error => {
          console.log("error" + JSON.stringify(error));
        }
      )
    }
  }

  public deleteBoard(boardId: string) {
    this.boardService.deleteBoard(boardId).subscribe(
      res=> {
        this.globalService.update$.next('board');
      },
      error=> {
        console.log("error=" + JSON.stringify(error));
      }
    )
  }
}
