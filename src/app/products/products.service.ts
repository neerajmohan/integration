import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://192.168.225.115:8000/api";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'Bearer '+localStorage.getItem("token"),
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts(page){
   return this.http.get(BASE_URL+"/products?page="+page,httpOptions);
  }
  getProduct(id){
    console.log('hello');
   return this.http.get(BASE_URL+"/products/"+id,httpOptions);
  }
  addProduct(body){
   return this.http.post(BASE_URL+"/products",body,httpOptions);
  }
  updateProduct(body,id){
   return this.http.put(BASE_URL+"/products/"+id,body,httpOptions);
  }
  deleteProduct(id){
   return this.http.delete(BASE_URL+"/products/"+id,httpOptions);
  }
}
