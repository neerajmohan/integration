import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
  
})
export class IndexComponent implements OnInit {
  id:any;
  products:any;

  editForm = new FormGroup({
    name:new FormControl(""),
    category:new FormControl(""),
    price:new FormControl(""),
    stock:new FormControl(""),
  });
  
  constructor(private modalService: NgbModal,private service:ProductsService) { }

  ngOnInit(): void {
    localStorage.setItem("token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4NjIzNTk0OCwiZXhwIjoxNTg2MjM5NTQ4LCJuYmYiOjE1ODYyMzU5NDgsImp0aSI6IlptTDQxcWI1WEFHVERkYnIiLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.k7xNCWPGM7PmA70bH75noF29u695EVjOj5rAmCZFEpA");
    this.service.getProducts().subscribe(data=>{
      this.products = data;
    })
  }

  open(id) {
    console.log(id);
    this.id = id;
  }
  edit(){
    var body=JSON.stringify(this.editForm.value);
    console.log(body);
  }
}
