import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from "@angular/router";
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router,
    private globalService: GlobalService) {
    this.loginForm = fb.group({
      'userId': [''],
      'password': [''],
      'rememberMe': ['']
    });
  }

  ngOnInit() {
  }

  public login(formValues: any): void {
    console.log('values=' + JSON.stringify(formValues));
    if(formValues.userId && formValues.password) {
      this.authService.login(formValues).subscribe(
        response => {
          this.globalService.userId = formValues.userId;
          if(formValues.rememberMe) {
            document.cookie = "token=" + response.data.token + ";expires=" + response.data.expires + ";path=/";
          }
          this.router.navigate(['dashboard']);
        },
        error => {
          console.log("error=" + JSON.stringify(error));
        }
      )
    }
  }
}
