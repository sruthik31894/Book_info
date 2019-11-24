import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  template: `
    <div class="page">
      <h2>
        404 Not Found!
      </h2>
    </div>
  `,
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
