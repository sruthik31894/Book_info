import { Injectable } from '@angular/core';
import { Book, ReviewData } from './book';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable(
  {providedIn: "root"}
)
export class BookServiceService {

  private booksUrl = 'https://book-info-sharing.herokuapp.com/api/books';

  constructor(private http:HttpClient){}

  getBooks(): Promise<void | Book[]>{
debugger
    return this.http.get(this.booksUrl)
      .toPromise()
      .then(response=>response as Book[])
      .catch(this.handleError);
  }

  getSingleBook(bookId: String): Promise<void | Book>{

    return this.http.get(this.booksUrl + '/' + bookId)
      .toPromise().then(response=>response as Book)
      .catch(this.handleError);
  }

  getSingleReview(bookId: String, reviewId: String): Promise<void | ReviewData>{

    return this.http.get(this.booksUrl + '/' + bookId+ '/reviews/' + reviewId)
      .toPromise().then(response=>response as ReviewData)
      .catch(this.handleError);

  }


  createBook(newBook: Book): Promise<void | Book>{

    return this.http.post(this.booksUrl, newBook)
      .toPromise().then(response=>response as Book)
      .catch(this.handleError);

  }

  updateBook(bookId: string, theBook: { image: string; type: string; desc: string }): Promise<void | Book> {

    return this.http.put(this.booksUrl + '/' + bookId, theBook)
      .toPromise()
      .then(response => response as Book)
      .catch(this.handleError);
  }


  deleteBook(bookid: String): Promise<void | Book> {
    return this.http.delete(this.booksUrl + '/' + bookid)
      .toPromise()
      .then(response => response as Book)
      .catch(this.handleError);
  }

  public addReviewByReviewId(bookId: string, formData: any): Promise<any> {
    const url: string = `${this.booksUrl}/${bookId}/reviews`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  public updateReviewByReviewId(bookId: string, reviewId: string, formData: any): Promise<any> {
    const url: string = `${this.booksUrl}/${bookId}/reviews/${reviewId}`;
    return this.http
      .put(url, formData)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  public deleteReviewByReviewId(bookId: string, reviewId: string): Promise<any> {
    const url: string = `${this.booksUrl}/${bookId}/reviews/${reviewId}`;
    return this.http.delete(url).toPromise().then(response=>response as string).catch(this.handleError);

  }

  private handleError(error: any){
    console.log("error");
  }

}

