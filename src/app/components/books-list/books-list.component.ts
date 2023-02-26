import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from "rxjs";
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  public books$: Observable<Book[]>|undefined;  


  constructor(public bookService: BookService) {  
    bookService.wasUpdate.subscribe(value => {    
      setTimeout(()=>{this.books$ = this.bookService.GetAllBooks()}, 500);   
      })
  }
   ngOnInit() {
    this.books$ = this.bookService.GetAllBooks();  
  }
  getAll(){
    this.books$ = this.bookService.GetAllBooks();
  }

  getRecommend(){
    this.books$ = this.bookService.GetRecommendedBooks(); 
  }  
}
