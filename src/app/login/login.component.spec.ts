import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalService } from '../../../workflow/src/app/services/global.service';
import { Router } from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService;
  let globalService: GlobalService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule],
      providers: [{
        provide: AuthenticationService, userValue: loginService
      }, GlobalService, Router]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should test login function', () => {
    let result = component.login({"username":"asteria","password":"asteria","rememberMe":""});
    
    expect(globalService.userId).toEqual("asteria");
  });

  loginService = {
    login: () => {
      return Observable.of({"code": "200", "message": "Authentication successfull", "status": "success"})
    }
  }
});
