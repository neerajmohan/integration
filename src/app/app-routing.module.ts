import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './products/add/add.component';
import { IndexComponent } from './products/index/index.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/auth-guard.service';


const routes: Routes = [
  {"path":"login",component:LoginComponent,},
  {"path":"add",component:AddComponent,canActivate: [AuthGuardService],},
  {"path":"index/:page",component:IndexComponent,canActivate: [AuthGuardService],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
