import { Component, OnInit } from '@angular/core';

export class ReviewData {
  book: {
    id: string;
    name: string;
  };
  review: {
    _id: string;
    author: string;
    rating: number;
    reviewText: string;
    createdOn: Date;
  };
}

export class Book {
  _id: string;
  name: string;
  type: string;
  release_date: Date;
  release_string: string;
  author: string;
  image: string;
  desc: string;
  rating: number;
  reviews: any[];
}
