import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm = new FormGroup({
    name:new FormControl(""),
    category:new FormControl(""),
    price:new FormControl(""),
    stock:new FormControl(0),
  });

  constructor(private service:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
  add(){
    var body=JSON.stringify(this.addForm.value);
    console.log(body);
    this.service.addProduct(body).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('');
    });
  }

}
