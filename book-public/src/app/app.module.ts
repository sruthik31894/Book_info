import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Directive, ElementRef, Input, NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { AppComponent } from './app.component';
import { HomeListComponent } from './home-list/home-list.component';
import { CreateComponent } from './create/create.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { HeaderComponent } from './header/header.component';
import { FrameworkComponent } from './framework/framework.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookServiceService } from './book-service.service';
import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { UserNewComponent } from './user-new/user-new.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {UserService} from "./user.service";
import {UtilService} from "./util.service";
import {AuthService} from "./auth.service";
import {RequestInterceptor} from './request-interceptor.service';
import {RatingStarsComponent} from './rating-stars/rating-stars.component'
import { FileUploadModule } from './file-upload/file-upload.module';
import { StarRatingComponent } from './star-rating/star-rating.component';
import {MatButtonModule} from "@angular/material";
import {MatTooltipModule} from "@angular/material";
import {MatIconModule} from "@angular/material";
import {MatFormFieldModule} from "@angular/material";
import { FilterPipe} from './filter.pipe';
import {HistoryService} from "./history.service";
//import { FileSelectDirective } from "./file-upload/file-upload.module";

@NgModule({
  declarations: [
    //AppComponent,
    HomeListComponent,
    CreateComponent,
    DetailsPageComponent,
    UpdateBookComponent,
    UpdateReviewComponent,
    HeaderComponent,
    FrameworkComponent,
    HomepageComponent,
    Error404Component,
    LoginComponent,
    UserNewComponent,
    WelcomeComponent,
    RatingStarsComponent,
    StarRatingComponent,
    FilterPipe
    //FileSelectDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeListComponent
      }, {
        path: 'create',
        component: CreateComponent
      }, {
        path: 'book/:bookid',
        component: DetailsPageComponent
      }, {
        path: 'book/:bookid/reviews/:reviewid',
        component: UpdateReviewComponent
      },
      {
        path: 'updatebook/:bookid',
        component: UpdateBookComponent
      }
    ]),
    MatDatepickerModule,
    MatNativeDateModule,
    FileUploadModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [
    {
      //provide: APP_BASE_HREF, useValue:'/'
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    BookServiceService,
    UtilService,
    AuthService,
    UserService,
    HistoryService
  ],
  //bootstrap: [AppComponent],
  bootstrap: [FrameworkComponent]
})

export class AppModule {}

