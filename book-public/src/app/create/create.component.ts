import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { Book } from "../book";
import { BookServiceService } from "../book-service.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from "@angular/material";
import { FileUploader } from '../file-upload/file-uploader.class';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  public newBook: Book = {
    _id: "",
    name: "",
    type: "",
    release_date: null,
    release_string: "",
    author: "",
    image: "",
    desc: "",
    rating: 0,
    reviews: []
  };
  
  types = [
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

  pageContent = {
    header : {
      title : '',
      body : ''
    }
  };

  constructor(private bookDataService: BookServiceService,
              private router: Router) {}

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);

      if(status === 200) {
        alert('File uploaded successfully');
        this.fileInfo = JSON.parse(response);
      } else {
        alert('File upload failed')
      }
    };
  }

  public formError: string;

  private formIsValid(): boolean {

    if (this.newBook.name && this.newBook.type && this.newBook.release_date
      && this.newBook.author && this.newBook.desc) {
      return true;
    } else {
      return false;
    }
  }

  public createNewBook(newBook: Book):void {
    this.formError = '';
debugger
    if(this.formIsValid()) {

      this.newBook.name = this.newBook.name.trim();
      this.newBook.type = this.newBook.type.trim();
      this.newBook.author = this.newBook.author.trim();
      this.newBook.desc = this.newBook.desc.trim();

      if(this.fileInfo.originalname !== "") {
        this.newBook.image = this.fileInfo.originalname;
      } else {
        this.newBook.image = this.newBook.image.trim();
        if(this.newBook.image !== "") {
          this.newBook.image = this.newBook.image.replace(/C:\\fakepath\\/, "");
        } else {
          this.newBook.image = "imgDefault.jpg";
        }
      }

      let theDate = new Date(this.newBook.release_date);
      this.newBook.release_string = theDate.toDateString();
debugger
      this.bookDataService.createBook(newBook);

      const createRouter = this.router;
      setTimeout(function () {
        createRouter.navigate(['']);
      }, 1000);

    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  @ViewChild('picker', {static: false}) datepicker: MatDatepicker<Date>;

  public uploader: FileUploader = new FileUploader({
    url: 'https://book-info-sharing.herokuapp.com/api/upload',
    itemAlias: 'image'
  });

  fileInfo = {
    originalname: '',
    // filename: ''
  };
}
