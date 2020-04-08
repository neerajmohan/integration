import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

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
    stock:new FormControl(0),
  });
  
  constructor(private modalService: NgbModal,private service:ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(data=>{
      this.products = data;
    })
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  open(id,modal) {
    this.id=id;
    if(modal=="edit"){
    this.service.getProduct(id).subscribe(data=>{
      this.editForm.controls['name'].setValue(data['name']);
      this.editForm.controls['category'].setValue(data['category']);
      this.editForm.controls['stock'].setValue(data['stock']);
      this.editForm.controls['price'].setValue(data['price']);
    });
  }
  }
  edit(){
    this.editForm.value.id=this.id;
    var body=JSON.stringify(this.editForm.value);
    console.log(body);
    this.service.updateProduct(body,this.id).subscribe(data=>{
      console.log(data);
      location.reload();
    });
  }

  delete(id){
    this.service.deleteProduct(id).subscribe(res=>{
      console.log(res);
      location.reload();
    })
  }
}
