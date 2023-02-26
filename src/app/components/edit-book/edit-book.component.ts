import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { BookAdd } from 'src/app/models/book-add';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{ 
  public textAction:string = "Add book";
  public textButton:string = "Add";
  public curentBook:Book={}; 
  public newCover:string="";
 

  constructor (public bookService: BookService){
    bookService.currentBook.subscribe(value => {
      this.curentBook = value as Book;
      this.textAction="Edit book";
      this.textButton="Save"})   
  }

  ngOnInit(): void {  }

  clearForm(myForm: NgForm){  
    this.curentBook = {};
    this.bookService.currentBook.next({});
    this.textAction="Add book";
    this.textButton="Add"
    myForm.reset();
  }  
  
  onFileChanges(event:any){
    var files = event.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this.handleFile.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  handleFile(event:any) {
    var binaryString = event.target.result;
    this.newCover= btoa(binaryString);
    console.log(btoa(binaryString));
   }

  addBook(myForm: NgForm){

    var tempPhoto=myForm.value.cover;
    if(tempPhoto==null&&this.curentBook.cover!=null)
    {      
      this.newCover = this.curentBook.cover.slice(23);
    } 
    var newBook:BookAdd = {"id":myForm.value.id, "title":myForm.value.title, "content":myForm.value.content, "genre": myForm.value.genre, "author":myForm.value.author, "cover":this.newCover}
   this.bookService.SaveBook(newBook); 
    this.clearForm(myForm);  
    this.bookService.wasUpdate.next({});
 }
}