import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellingListComponent } from './selling/selling-list/selling-list.component';

const routes: Routes = [
  {
    path: 'product/list',
    component: SellingListComponent
  },
  {
    path: '',
    component: SellingListComponent
  },
  { 
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SellingRoutingModule { }
