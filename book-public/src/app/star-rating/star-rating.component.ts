import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
//import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'mat-star-rating',
  template: `
    <button mat-icon-button [color]="color" *ngFor="let ratingId of ratingArr;index as i" [id]="'star_'+i" (click)="onClick(i+1)" [matTooltip]="ratingId+1" matTooltipPosition="above">
      <mat-icon>
        {{showIcon(i)}}
      </mat-icon>
    </button>
    <mat-error *ngIf="starCount == null || starCount == 0">
      Star count is <strong>required</strong> and cannot be zero
    </mat-error>
    <p class="body-2">
      Your rated <span class="body-2">{{rating}}</span> / <span class="body-2">{{starCount}}</span>
    </p>
  `,
  styleUrls: ['./star-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') private rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Input('color') private color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  //private snackBarDuration: number = 2000;
  private ratingArr = [];

  constructor(
    //private snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    console.log(rating)
    /* this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    }); */
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
