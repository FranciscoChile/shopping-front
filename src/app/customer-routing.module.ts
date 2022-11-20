import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: 'customer/list',
    component: CustomerListComponent
  },
  {
    path: 'customer/add',
    component: CustomerAddComponent
  },
  {
    path: 'customer/edit/:id',
    component: CustomerEditComponent
  },
  {
    path: 'customer',
    redirectTo: 'customer/list',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
