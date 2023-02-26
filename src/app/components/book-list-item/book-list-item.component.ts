import { Component, Input} from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {
  @Input() bookpreview:Book={}; 

  idBook:number=0;

  constructor(public mdialog: MatDialog, public bookService: BookService){}

  ngOnInit(): void {
    this.bookpreview.cover = 'data:image/jpeg;base64,' + this.bookpreview.cover;   
    this.idBook=this.bookpreview.id!;
  }

  OpenPopUp(){
    this.mdialog.open(ViewBookComponent, {
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '800ms',
      width:'50%',
      data: {
        id: this.bookpreview.id
      }
    });   
  }

  EditBook(){ 
    this.bookService.currentBook.next(this.bookpreview);
  }
  DellBook(){
    this.bookService.DellBook(this.bookpreview.id as number);
    this.bookService.wasUpdate.next({});
  }
}