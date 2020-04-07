import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://127.0.0.1:8000";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+localStorage.getItem("token"),
    'Access-Control-Allow-Origin':'*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts(){
   return this.http.get(BASE_URL+"/products",httpOptions);
  }
  getProduct(id){
   return this.http.get(BASE_URL+"/products/"+id,httpOptions);
  }
  addProduct(body){
   return this.http.post(BASE_URL+"/products",body,httpOptions);
  }
  updateProduct(id,body){
   return this.http.put(BASE_URL+"/products/"+id,body,httpOptions);
  }
  deleteProduct(id){
   return this.http.delete(BASE_URL+"/products/"+id,httpOptions);
  }
}
