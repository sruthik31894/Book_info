import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { UserNewComponent } from './user-new/user-new.component';
import {HomepageComponent} from "./homepage/homepage.component";
import {CreateComponent} from "./create/create.component";
import {DetailsPageComponent} from "./details-page/details-page.component";
import {FrameworkComponent} from "./framework/framework.component";
import {HeaderComponent} from "./header/header.component";
import {HomeListComponent} from "./home-list/home-list.component";
import {UpdateBookComponent} from "./update-book/update-book.component";
import {UpdateReviewComponent} from "./update-review/update-review.component";

const routes: Routes = [
  //{ path: '',  component: WelcomeComponent },
  { path: '', component: HomeListComponent },
  { path: 'book/:bookid', component: DetailsPageComponent },
  { path: 'create', component: CreateComponent },
  { path: 'book/:bookid/reviews/:reviewid', component: UpdateReviewComponent },
  { path: 'framework', component: FrameworkComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'home-list', component: HomeListComponent },
  { path: 'updatebook/:bookid', component: UpdateBookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/new',  component: UserNewComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
