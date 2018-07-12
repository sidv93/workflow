import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.routing';
import { AuthenticationService } from './services/authentication.service';
import { Configuration } from './app.constants';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { BoardService } from './services/board.service';
import { GlobalService } from './services/global.service';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { ListService } from './services/list.service';
import { CardService } from './services/card.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BoardComponent,
    ListComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthenticationService,Configuration, BoardService,GlobalService,ListService,CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
