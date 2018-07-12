import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';
import { Router } from '@angular/router';
import { Configuration } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public ngOnInit() {
    this.resolveCookie();
  }

  public constructor(private globalService: GlobalService, private router: Router, private configuration: Configuration) {

  }

  public resolveCookie() {
    let cookies = document.cookie.split("=");
    let index = -1;
    cookies.forEach((cookie, i) => {
      if (cookie === "token") {
        index = i;
      }
    });
    if (index >= 0) {
      this.globalService.verifyCookie(cookies[index + 1]).subscribe(
        res => {
          console.log("login response=" + JSON.stringify(res.data));
          this.globalService.userId = res.data;
          this.router.navigate(['dashboard']);
        },
        error => {
          this.router.navigate(['login']);
        }
      )
    }
    this.router.navigate(['login']);
  }
}
