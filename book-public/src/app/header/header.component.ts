import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-header',
  template: `
    <h2 *ngIf="!authService.getCurrentUser()?.isAdmin">{{ content.title }}</h2>
      <h4 *ngIf="!authService.getCurrentUser()?.isAdmin">{{ content.body }}</h4>
    <h2 *ngIf="authService.getCurrentUser()?.isAdmin">Welcome, <strong style="color:dodgerblue">{{ authService.getCurrentUser().username }}</strong>!<br/>You can create and edit book information.</h2>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() content: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
