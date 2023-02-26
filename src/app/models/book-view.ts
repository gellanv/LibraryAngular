import { Review } from "./review";

export class BookView {
    public id?:number=0; 
    public title?:string="";  
    public author?:string="";
    public genre?:string="";
    public cover?:string=""; 
    public content?:string=""; 
    public rating?:number=0;
    public reviewNumber?:number=0;
    public reviewDtos?:Review[];
}
