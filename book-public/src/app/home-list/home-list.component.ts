import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  @Input() books: Book[];

  type = [
    'Genre Fiction',
    'Biographies & Memoirs',
    'Arts & Photography',
    'Business & Investing',
    'Personal Finance',
    'Comics & Graphic Novels',
    'Ages 6-8',
    'Thriller',
    'Suspense'
  ];
  genre: any;
  searchText: any;
  selectUndefinedOptionValue: any;

  constructor(private bookService: BookServiceService) { }

  ngOnInit() {
    this.bookService
      .getBooks()
      .then((books: Book[]) => {
debugger
        this.books=books.map(book=>{return book;})
      })
  }

  pageContent = {
    header:{
      title: 'Book Info & Reviews',
      body: 'Find book information and reviews!'
    }
  }
}
