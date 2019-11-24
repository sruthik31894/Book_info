import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { BookServiceService } from "../book-service.service";
import { Book, ReviewData } from "../book";
import { switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import {StarRatingColor} from "../star-rating/star-rating.component";

@Component({
  selector: 'app-update-review',
  template: `
    <app-header [content]="pageContent.header"></app-header>
    
    <div class="row banner"><div class="col-12"><h1 *ngIf="bookReview">{{bookReview.review.author}}</h1></div></div>

    <form (ngSubmit)="onReviewUpdate(bookReview.book.id, bookReview.review._id, bookReview)">
      <hr>
      <h4>Edit your review</h4><br>
      <div *ngIf="formError" class="alert alert-danger" role="alert">
        {{ formError }}
      </div>
      <div class="form-group row">
        <label for="rating" class="col-sm-2 col-form-label">Rating</label>
        <div class="col-sm-10">
          <mat-star-rating [rating]="rating" [starCount]="starCount" [color]="starColor" (ratingUpdated)="onRatingChanged($event)"></mat-star-rating>
        </div>
      </div>
      <div class="form-group row">
        <label for="review" class="col-sm-2 col-form-label">Review</label>
        <div class="col-sm-10">
          <textarea [(ngModel)]="bookReview.review.reviewText" name="review" id="review" rows="5" class="form-control" value="{{bookReview.review.reviewText}}"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12">
          <button (click)="onDelete(bookReview.book.id, bookReview.review._id)" type="button" class="btn btn-primary float-right" style="margin-left:15px">Delete Review</button>
          <button type="submit" class="btn btn-primary float-right" style="margin-left:15px">Update Review</button>
          <button (click)="onReviewCancel(bookReview.book.id)" type="button" class="btn btn-default float-right">Cancel</button>
        </div>
      </div>
      <hr>
    </form>
  `,
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {

  bookReview: ReviewData;

  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private bookServiceService: BookServiceService, private route: ActivatedRoute, private router: Router) {}
  public formError: string;

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.bookServiceService.getSingleReview(params['bookid'], params['reviewid'])
      })
    ).subscribe((bookReviews: ReviewData)=>{
      this.bookReview = bookReviews;
      this.rating = this.bookReview.review.rating;
      console.log(this.bookReview);
    })
  }

  pageContent = {
    header:{
      title: '',
      body: ''
    }
  };

  public onReviewUpdate(bookid: string, reviewid: string, bookReview: ReviewData): void {

    this.bookReview.review.rating = this.rating;
    this.formError = '';

    if (this.formIsValid()) {
      this.bookServiceService.updateReviewByReviewId(bookid, reviewid, bookReview)
        .then(review => {
          const createRouter = this.router;
          setTimeout(function () {
            createRouter.navigateByUrl(`book/${bookid}`);
          }, 1000);
        });
    } else {
        this.formError = 'All fields required, please try again';
    }
  }

  public onReviewCancel(bookId: string): void {
    this.router.navigateByUrl(`book/${bookId}`);
  }

  public onDelete(bookId:string, reviewId:string): void {
    this.bookServiceService.deleteReviewByReviewId(`${bookId}`, `${reviewId}`)
      .then(review => {
        this.router.navigateByUrl(`book/${bookId}`);
      });
  }

  private formIsValid(): boolean {
    if (this.bookReview.review.rating && this.bookReview.review.reviewText) {
      return true;
    } else {
      return false;
    }
  }

  public onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;
  }

}
