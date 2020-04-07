import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './products/add/add.component';
import { IndexComponent } from './products/index/index.component';


const routes: Routes = [
  {"path":"add",component:AddComponent},
  {"path":"",component:IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
