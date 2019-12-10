import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { BookServiceService } from "../book-service.service";
import { Book } from "../book";
import { switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { StarRatingColor } from "../star-rating/star-rating.component";

@Component({
  selector: 'app-details-page',
  template: `

    <app-header [content]="pageContent.header"></app-header>
    <hr>
    <div class="row banner"><div class="col-12"><h1>{{newBook?.name}}</h1><span *ngIf="authService.getCurrentUser()?.isAdmin" style="float:right !improtant"><a *ngIf="newBook" [routerLink]="['/updatebook', newBook?._id]">Update Book</a> | <button (click)="deleteSingleBook(newBook?._id)">DELETE</button></span></div></div>
    
    <div class="row">
      <div class="col-12 col-lg-9"></div>
      
      <div class="row"></div>
      
      <div class="col-12 col-md-6">
        
      <div class="item pic"><img src="https://book-info-sharing.herokuapp.com/routes/upload/{{ newBook?.image }}" width="150" height="150" style="float:left; margin-right:50px"></div>

        <p><strong>Rating:</strong> <app-rating-stars [rating]="newBook?.rating"></app-rating-stars></p>
        
        <p><strong>Author:</strong> {{newBook?.author}}</p>
        
        <p><strong>Description:</strong> {{newBook?.desc}}</p>

        <p><strong>Release Date:</strong> {{newBook?.release_date}}</p>

        <div *ngIf="newBook" class="card card-primary"><div class="card-block"><h2 class="card-title">Genre</h2>

          <span class="badge badge-warning" *ngFor="let types of newBook.type" style="margin-right:10px;"><i class="fa fa-check"></i>{{types}}</span>

        </div>
          
        </div>

        <div *ngIf="newBook" class="card card-primary">

          <h2 class="card-title">Customer reviews <button (click)="formVisible=true" *ngIf="authService.isLoggedin()" class="btn btn-primary float-right">Add
            review</button></h2>

          <div class="card-block col-12" *ngFor="let review of newBook.reviews">

            <div  class="col-12 no-gutters review-header card-title">
              <span class="rating i.fas.fa-star"></span>
              <span class="rating i.far.fa-star"></span>
              <span *ngIf="authService.isLoggedin() && authService.getCurrentUser().username === review.author" class="review" style=" text-transform: capitalize;"><a *ngIf="newBook" [routerLink]="['/book', newBook?._id, 'reviews', review?._id]">{{review.author}}</a><small class="review">{{review.createdOn | date }}</small></span>
              <span *ngIf="!authService.isLoggedin() || authService.getCurrentUser().username !== review.author" class="review" style=" text-transform: capitalize;">{{review.author}}<small class="review">{{review.createdOn | date }}</small></span>
              <span><app-rating-stars [rating]="review.rating"></app-rating-stars></span>
              <span style="float:right"></span>
            </div>

            <div class="col-12"><p>{{review.reviewText}}</p></div>

          </div>
          
          <div  *ngIf="formVisible">
            <form (ngSubmit)="onReviewSubmit()">
              <hr>
              <h4>Add your review</h4>
              <div *ngIf="formError" class="alert alert-danger" role="alert">
                {{ formError }}
              </div>
              <div class="form-group row">
                <label for="name" class="col-sm-12 col-form-label">Name</label>
                <div class="col-sm-10">
                  <span id="name" class="form-control">{{authService.getCurrentUser().username}}</span>
                </div>
              </div>
              <div class="form-group row">
                <label for="rating" class="col-sm-12 col-form-label">Rating</label>

                <div class="col-sm-10">
                  <mat-star-rating [rating]="rating" [starCount]="starCount" [color]="starColor" (ratingUpdated)="onRatingChanged($event)"></mat-star-rating>
                </div>
              </div>
              <div class="form-group row">
                <label for="review" class="col-sm-12 col-form-label">Review</label>
                <div class="col-sm-10">
                  <textarea  [(ngModel)]="newReview.reviewText" name="review" id="review" rows="5" class="form-control"></textarea>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary float-right" style="margin-left:15px">Submit review</button>
                  <button (click)="formVisible=false" type="button" class="btn btn-default float-right">Cancel</button>
                </div>
              </div>
              <hr>
            </form>

          </div>

        </div>

      </div>
    </div>  
  `,
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private bookServiceService: BookServiceService, private route: ActivatedRoute, private router: Router, public authService: AuthService) { }

  newBook: Book;
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.bookServiceService.getSingleBook(params['bookid'])
      })
    ).subscribe((newBooks: Book)=>{
      this.newBook = newBooks;
    })
  }

  pageContent = {
    header:{
      title: '',
      body: ''
    }
  };

  public newReview = {
    author: '',
    rating: 5,
    reviewText: ''
  };

  public formVisible: boolean = false;

  public formError: string;

  private formIsValid(): boolean {

    if (this.newReview.author && this.newReview.reviewText && this.newReview.rating ) {
      return true;
    } else {
      return false;
    }

  };

  public onReviewSubmit(): void {
  
    this.newReview.rating = this.rating;
    this.newReview.author = this.authService.getCurrentUser().username;
    this.formError = '';
    if (this.formIsValid()) {
      this.bookServiceService.addReviewByReviewId(this.newBook._id, this.newReview)
        .then(review => {
          let reviews = this.newBook.reviews.slice(0);
          reviews.unshift(reviews);
          this.newBook.reviews = reviews;
          this.resetAndHideReviewForm();
          //window.location.reload();
          const createRouter = this.router;
          setTimeout(function () {
            createRouter.navigateByUrl(`book/${this.newBook._id}`);
          }, 1000);
        });
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  private resetAndHideReviewForm(): void {

    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';

  }

  public deleteSingleBook(bookid: string):void {

    this.bookServiceService.deleteBook(bookid);

    var landingUrl = "http://" + window.location.host;
    window.location.href = landingUrl;
  }

  public onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;
  }
}
