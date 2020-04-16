import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const BASE_URL = "http://192.168.225.115:8000/api";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(body){
    return this.http.post(BASE_URL+'/login',body,httpOptions);
  }

  refresh(){
    return this.http.post(BASE_URL+'/refresh',httpOptions);
  }
}
