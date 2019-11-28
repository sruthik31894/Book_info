import { Component, OnInit } from '@angular/core';
import { Book } from "../book";
import { BookServiceService } from '../book-service.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FileUploader } from '../file-upload/file-uploader.class';

@Component({
  selector: 'app-update-book',
  template: `
    <app-header [content]="pageContent.header"></app-header>

    <form *ngIf="theBook" (ngSubmit)="updateTheBook(renewBook)">
      <label for="name">Book Name: &nbsp;&nbsp;</label>
      <span id="name">{{theBook.name}}</span><br/><br/>
      <label for="type">Enter Book Type: &nbsp;&nbsp;</label>
      <input [(ngModel)]="renewBook.type" id="type" name="type" required="required" placeholder="{{theBook.type}}" autofocus><br/><br/>
      <label for="author">Author: &nbsp;&nbsp;</label>
      <span id="author">{{theBook.author}}</span><br/><br/>
      <label for="release">Release Date: &nbsp;&nbsp;</label>
      <span id="release">{{theBook.release_date}}</span><br/><br/>
      <label for="desc">Enter Description: &nbsp;&nbsp;</label><br/>
      <textarea rows="4" cols="50" id="desc" name="desc" required="required"
                [(ngModel)]="renewBook.desc" placeholder="{{theBook.desc}}" autofocus></textarea><br/><br/>

      <label for="image" class="col-sm-2 col-form-label">Upload Image:<span>*</span> </label>
      <input [(ngModel)]="renewBook.image" type="file" id="image" name="single" ng2FileSelect [uploader]="uploader"/>
      <button type="button" class="btn btn-success btn-s" (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
        <span>Upload...</span>
      </button><br /><br /><br />      
      <button type="submit" class="btn btn-primary float-right" style="margin-left:15px">Update Book</button>
    </form>
  `,
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  constructor(
    private bookDataService: BookServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  theBook: Book;

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.bookDataService.getSingleBook(params['bookid'])
      }))
      .subscribe((theBook: Book) => {
        this.theBook = theBook;
      });

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

  public renewBook: { image: string; type: string; desc: string } = {
    desc: "",
    image: "",
    type: "",
    //rating: 0
  };

  public updateTheBook(renewBook: { image: string; type: string; desc: string }):void {

    let id = "";

    if(renewBook.type === "") {
      renewBook.type = this.theBook.type.toString();
    } else {
      renewBook.type = renewBook.type.trim();
    }
    if(renewBook.desc === "") {
      renewBook.desc = this.theBook.desc
    } else {
      renewBook.desc = renewBook.desc.trim();
    }
debugger
    if(this.fileInfo.originalname !== "") {
      renewBook.image = this.fileInfo.originalname;
    } else {
      renewBook.image = renewBook.image.trim();
      if(renewBook.image !== "") {
        renewBook.image = renewBook.image.replace(/C:\\fakepath\\/, "");
      } else {
        renewBook.image = "imgDefault.jpg";
      }
    }

    this.route.params.pipe(
      switchMap((params: Params) => {
        id = params['bookid'];
        debugger
        return this.bookDataService.updateBook(params['bookid'], renewBook)
      }))
      .subscribe((renewBook: Book) => {
        this.renewBook = renewBook;
        //this.pageContent.header.title = newBook.name+" - "+newBook.type;
        this.pageContent.header.title = renewBook.name;
        this.pageContent.header.body = "Updates for selected book";
      });

    const updateRouter = this.router;
    setTimeout(function () {
      updateRouter.navigate(['book/' + id]);
    }, 1000);
  }

  pageContent = {
    header : {
      title : '',
      body : ''
    }
  };

  public uploader: FileUploader = new FileUploader({
    url: 'https://book-info-sharing.herokuapp.com/api/upload',
    itemAlias: 'image'
  });

  fileInfo = {
    originalname: '',
    // filename: ''
  };
}
