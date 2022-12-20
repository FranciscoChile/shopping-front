import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/shared/product';
import { ProductService } from 'src/app/product/shared/product.service';
import { CartService } from '../shared/cart.service'
import { CartItem } from '../shared/cart-item';

@Component({
  selector: 'app-selling-list',
  templateUrl: './selling-list.component.html',
  styleUrls: ['./selling-list.component.css']
})
export class SellingListComponent implements OnInit {

  products: Product[]  = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 12;
  gridColumns = 5;
  search!: string;

  cartItems: CartItem[] = []; //items in cart to show in the cart icon

  constructor(
    private api: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {    
    this.findProducts();    
    this.cartService.loadCart();
    this.cartItems = this.cartService.getItems();
  }

  findProducts() {

    this.api.findAll().subscribe({
      next: (data) => {
        this.products = data;        
      },
      error: (e) => {
        throw new Error('Error cargando información');
      }
    });
    
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.findProducts();
  }

  addToCart(item: any) {    
    item.quantity = 1;
    item.subTotal = item.priceSell;
    this.cartService.addToCart(item); //add items in cart
    this.cartItems = [...this.cartService.getItems()];      
  }

}
