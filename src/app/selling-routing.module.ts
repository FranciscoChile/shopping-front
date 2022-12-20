import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './selling/cart-list/cart-list.component';
import { SellingListComponent } from './selling/selling-list/selling-list.component';

const routes: Routes = [
  {
    path: 'selling',
    component: SellingListComponent
  },
  {
    path: 'cart',
    component: CartListComponent
  },
  { 
    path: '',
    redirectTo: 'selling',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SellingRoutingModule { }
