import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Echo from 'laravel-echo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
  
})
export class IndexComponent implements OnInit {
  id:any;
  products:any;

  currPage:any;
  pages:any;
  count:any;

  editForm = new FormGroup({
    name:new FormControl(""),
    category:new FormControl(""),
    price:new FormControl(""),
    stock:new FormControl(0),
  });
  
  constructor(private modalService: NgbModal,private service:ProductsService, private router:Router,private route: ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit(): void {
    var echo = new Echo({
      broadcaster: 'pusher',
      key: '0c542dfcb9f4cf639da6',
      cluster: 'ap2',
      forceTLS: true
    });
    var channel = echo.channel('products');
    channel.listen('ProductUpdated', (e) => {
      console.log('Product updated : '+e.user+' updated '+e.productName);
      this.toastr.info(e.user+' updated '+e.productName,'Product Updated!',{
        timeOut: 10000
      });
  });
    this.route.params.subscribe(params => {
      this.currPage = +params['page'];
    });
    this.service.getProducts(this.currPage).subscribe(data=>{
      this.products = data['data'];
      this.count=data['last_page']
      this.pages=[...Array(this.count).keys()];
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
    this.service.updateProduct(body,this.id).subscribe(data=>{
      this.ngOnInit();
    });
  }

  delete(id){
    this.service.deleteProduct(id).subscribe(res=>{
      this.ngOnInit();
    })
  }
}
