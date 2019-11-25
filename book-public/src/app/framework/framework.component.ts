import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-framework',
  template: `
    
    <nav class="navbar fixed-top navbar-expand-md navbar-light">
      <a class="navbar-brand" href="#">Book Information</a>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a *ngIf="authService.getCurrentUser()?.isAdmin" class="nav-link" routerLink="create">Create<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a *ngIf="!authService.isLoggedin()" class="nav-link" routerLink="login">Login<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a *ngIf="authService.isLoggedin()" class="nav-link" (click)="signout()" routerLink="/">Signout(<strong style="color: dodgerblue">{{ authService.getCurrentUser()?.username }}</strong>)<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a *ngIf="!authService.isLoggedin()"  class="nav-link" routerLink="users/new">Signup<span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container"></div>
    
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {
  
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signout() {
    this.authService.logout();
  }
}
