import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiResponse } from '../api-response';

import { UtilService } from '../util.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-user-new',
  template: `
    <div class="page page-users">

      <form
        [formGroup]="form"
        (ngSubmit)="submit()"
        class="login-form form-horizontal"
      >
        <div class="contentBox">
          <h3 class="contentBoxTop">New User</h3>

          <fieldset>
            <div class="form-group" [ngClass]="{'has-error': formErrors.username}">
              <label for="username" class="col-sm-3 control-label">Username*</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" formControlName="username" id="username">
                <span *ngIf="formErrors.username" class="help-block">{{formErrors.username}}</span>
              </div>
            </div>
            <div class="form-group" [ngClass]="{'has-error': formErrors.name}">
              <label for="name" class="col-sm-3 control-label">Name*</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" formControlName="name" id="name">
                <span *ngIf="formErrors.name" class="help-block">{{formErrors.name}}</span>
              </div>
            </div>
            <div class="form-group" [ngClass]="{'has-error': formErrors.email}">
              <label for="email" class="col-sm-3 control-label">Email</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" formControlName="email" id="email">
                <span *ngIf="formErrors.email" class="help-block">{{formErrors.email}}</span>
              </div>
            </div>
            <div class="form-group" [ngClass]="{'has-error': formErrors.password}">
              <label for="password" class="col-sm-3 control-label">Password*</label>
              <div class="col-sm-9">
                <input class="form-control" type="password" formControlName="password" id="password">
                <span *ngIf="formErrors.password" class="help-block">{{formErrors.password}}</span>
              </div>
            </div>
            <div class="form-group" [ngClass]="{'has-error': formErrors.passwordConfirmation}">
              <label for="passwordConfirmation" class="col-sm-12 control-label">Password Confirmation*</label>
              <div class="col-sm-9 col-sm-offset-3">
                <input class="form-control" type="password" formControlName="passwordConfirmation" id="passwordConfirmation">
                <span *ngIf="formErrors.passwordConfirmation" class="help-block">{{formErrors.passwordConfirmation}}</span>
              </div>
            </div>
            <p>
              <small>*Required</small>
            </p>
            <div *ngIf="errorResponse?.message" class="alert alert-danger">
              {{errorResponse?.message}}
            </div>
          </fieldset>
        </div>
        <div class="buttons">
          <button type="submit" class="btn btn-default">Submit</button>
        </div>
      </form>

    </div>
  `,
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  errorResponse: ApiResponse;
  form: FormGroup;
  formErrors = {
    'username':'',
    'name':'',
    'email':'',
    'password':'',
    'passwordConfirmation':'',
  };
  formErrorMessages = {
    'username': {
      'required': 'Username is required!',
      'pattern': 'Should be 4-12 characters!',
    },
    'name': {
      'required': 'Name is required!',
      'pattern': 'Should be 4-12 characters!',
    },
    'email': {
      'pattern': 'Should be a vaild email address!',
    },
    'password': {
      'required': 'Password is required!',
      'pattern': 'Should be minimum 8 characters of alphabet and number combination!',
    },
    'passwordConfirmation': {
      'required': 'Password Confirmation is required!',
      'match': 'Password Confirmation does not matched!',
    },
  };
  buildForm(): void {
    this.form = this.formBuilder.group({
      username:["", [Validators.required, Validators.pattern(/^.{4,12}$/)]],
      name:["", [Validators.required, Validators.pattern(/^.{4,12}$/)]],
      email:["", [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password:["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)]],
      passwordConfirmation:["", [Validators.required]],
      isAdmin:false
    }, {
      validator: this.customValidation,
    });

    this.form.valueChanges.subscribe(data => {
      this.utilService.updateFormErrors(this.form, this.formErrors, this.formErrorMessages);
    });
  };

  customValidation(group: FormGroup) {
    var password = group.get('password');
    var passwordConfirmation = group.get('passwordConfirmation');
    if(password.dirty && passwordConfirmation.dirty && password.value != passwordConfirmation.value){
      passwordConfirmation.setErrors({'match': true});
    }
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private userService: UserService,
    private authService: AuthService,
    private historyService: HistoryService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  submit() {
    this.utilService.makeFormDirtyAndUpdateErrors(this.form, this.formErrors, this.formErrorMessages);
    if(this.form.valid){
      if(this.form.value.username === "admin") {this.form.value.isAdmin = true;}
      this.userService.create(this.form.value)
        .then(data =>{
          //this.router.navigate(['/login']);
          //this.router.navigateByUrl(this.historyService.getLastNonLoginUrl());
          this.authService.login(this.form.value.username, this.form.value.password);
          //this.router.navigate([history.back()]);
          this.router.navigateByUrl(this.historyService.getLastNonLoginUrl());
        })
        .catch(response =>{
          this.errorResponse = response;
          this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors);
        });
    }
  }
}
