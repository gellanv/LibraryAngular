import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { BookView } from 'src/app/models/book-view';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit{
idBook:number=0;
curentBook:BookView={};

constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, public bookService: BookService){
  this.bookService.GetBookById(this.data.id).subscribe(res => {
    this.curentBook = res;
    this.curentBook.cover = 'data:image/jpeg;base64,' + this.curentBook.cover;
    this.idBook=this.data.id;
  }) 
}
ngOnInit(): void {}
}