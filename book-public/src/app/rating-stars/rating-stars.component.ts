import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  template: `
    <small>&nbsp;
      <i class="fa{{ rating < 1 ? 'r' : 's' }} fa-star" style="color: yellow"></i>
      <i class="fa{{ rating < 2 ? 'r' : 's' }} fa-star" style="color: yellow"></i>
      <i class="fa{{ rating < 3 ? 'r' : 's' }} fa-star" style="color: yellow"></i>
      <i class="fa{{ rating < 4 ? 'r' : 's' }} fa-star" style="color: yellow"></i>
      <i class="fa{{ rating < 5 ? 'r' : 's' }} fa-star" style="color: yellow"></i>
    </small>
  `,
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit {

  @Input() rating: number;

  constructor() { }

  ngOnInit() {
  }

}
