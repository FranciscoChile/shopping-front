import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CustomerRoutingModule } from './customer-routing.module';
import { ProductRoutingModule } from './product-routing.module';
import { SellingRoutingModule } from './selling-routing.module';

import { AppComponent } from './app.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { SellingListComponent } from './selling/selling-list/selling-list.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartListComponent } from './selling/cart-list/cart-list.component';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';


@NgModule({
  exports: [ NzMessageModule ],
  declarations: [
    AppComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    SellingListComponent,
    CartListComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, 
    CustomerRoutingModule, ProductRoutingModule, SellingRoutingModule,
    ReactiveFormsModule, NgxPaginationModule, FlexLayoutModule, Ng2SearchPipeModule, 
    HttpClientModule, NgbModule, BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoadingInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
