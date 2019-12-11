import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '../api-response';

import { UtilService } from '../util.service';
import { AuthService } from '../auth.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="page page-login">
      <form [formGroup]="form" (ngSubmit)="submit()" class="login-form form-horizontal">
        <div class="contentBox">
          <h3 class="contentBoxTop">Login</h3>
          <fieldset>
            <div class="form-group" [ngClass]="{'has-error': formErrors.username}">
              <label for="username" class="col-sm-3 control-label">Username</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" formControlName="username" id="username" name="username" value="">
                <span *ngIf="formErrors.username" class="help-block">{{formErrors.username}}</span>
              </div>
            </div>
            <div class="form-group" [ngClass]="{'has-error': formErrors.password}">
              <label for="password" class="col-sm-3 control-label">Password</label>
              <div class="col-sm-9">
                <input class="form-control" type="password" formControlName="password" id="password" name="password" value="">
                <span *ngIf="formErrors.password" class="help-block">{{formErrors.password}}</span>
              </div>
            </div>
          </fieldset>
          <div *ngIf="errorResponse?.message" class="alert alert-danger">
            {{errorResponse?.message}}
          </div>
        </div>
        <div class="buttons">
          <input class="btn btn-default" type="submit" value="Submit">
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  redirectTo: string;
  errorResponse: ApiResponse;
  form: FormGroup;
  formErrors = {
    'username':'',
    'password':'',
  };
  formErrorMessages = {
    'username': {
      'required': 'Username is required!',
    },
    'password': {
      'required': 'Password is required!',
    },
  };
  buildForm(): void {
    this.form = this.formBuilder.group({
      username:["", Validators.required],
      password:["", Validators.required],
    });

    this.form.valueChanges.subscribe(data => {
      this.utilService.updateFormErrors(this.form, this.formErrors, this.formErrorMessages);
    });
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private authService: AuthService,
    private historyService: HistoryService
  ) {
    this.buildForm();
    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
  }

  ngOnInit() {
  }

  submit() {
    this.utilService.makeFormDirtyAndUpdateErrors(this.form, this.formErrors, this.formErrorMessages);
    if(this.form.valid){
      this.authService.login(this.form.value.username, this.form.value.password)
        .then(() =>{
          //this.router.navigate([this.redirectTo?this.redirectTo:'/']);
          //this.router.navigate([history.back()]);
          this.router.navigate([this.historyService.getLastNonLoginUrl()]);
        })
        .catch(response =>{
          this.errorResponse = response;
          this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors);
        });

    }
  }
}
