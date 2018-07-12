import { Injectable } from "@angular/core";

@Injectable()
export class Configuration {
    public baseUrl: string = "http://localhost:3000";
    public loginUrl: string= "/api/v1/user/login/";
    public fetchBoardsUrl: string= "/api/v1/boards/";
    public fetchListsUrl: string= "/api/v1/lists/";
    public fetchCardssUrl: string= "/api/v1/cards/";
    public createBoardUrl: string= "/api/v1/board/";
    public createListUrl: string= "/api/v1/list/";
    public createCardUrl: string= "/api/v1/card/";
    public deleteBoardUrl: string= "/api/v1/board/";
    public deleteListUrl: string= "/api/v1/list/";
    public deleteCardUrl: string= "/api/v1/card/";
}