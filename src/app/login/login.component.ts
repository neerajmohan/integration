import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email:new FormControl(""),
    password:new FormControl(""),
  });

  constructor(private service:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    var body = JSON.stringify(this.loginForm.value);
    this.service.login(body).subscribe(data=>{
      console.log(data);
      if(data['success']==true){
        localStorage.setItem("token",data['token']);
        this.router.navigateByUrl("");
      }
    })
  }

}
