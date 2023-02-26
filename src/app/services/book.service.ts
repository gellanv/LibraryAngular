import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Book } from '../models/book';
import { BookView } from '../models/book-view';
import { BookAdd } from '../models/book-add';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService { 
  
  public errorMessage: string = "";
  public baseUrl:string = "";
  public currentBook=new Subject();
  public wasUpdate = new Subject();

  constructor(private http: HttpClient) {
    this.baseUrl=environment.apiUrl;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.errorMessage = error;
      console.error(error);
      return of(result as T);
    };
  }

  public GetAllBooks(): Observable<Book[]> {
    var url =this.baseUrl+"books"
    return this.http.get<Book[]>(url)
      .pipe(
        catchError(this.handleError<Book[]>('GetAllBooks', []))
      );
  }
  public GetRecommendedBooks(): Observable<Book[]> {
    var url =this.baseUrl+"recommended"
    return this.http.get<Book[]>(url)
      .pipe(
        catchError(this.handleError<Book[]>('GetRecommendedBooks', []))
      );
  }  
  public GetBookById(id:number): Observable<BookView> {
    var url =this.baseUrl+"books/"+id
    return this.http.get<BookView>(url)
      .pipe(
        catchError(this.handleError<BookView>('GetBooksById',))
      );
  }

  public DellBook(id:number)  {
    var url =this.baseUrl+"books/"+id+"?secret=SecretCode";
    this.http.delete(url).subscribe({
      next:()=>this.wasUpdate=new Subject(),
      error:(error) => this.handleError<any>('DellBook', error)
    });
  }

  public SaveBook(book:BookAdd) {    
    var url =this.baseUrl+"books/save";
    return this.http.post<any>(url, book).subscribe({
      next:()=>this.wasUpdate=new Subject(),
      error:(error) => this.handleError<any>('SaveBook', error)
    }); 
  }
}