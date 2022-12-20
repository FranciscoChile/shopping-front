import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartItem } from '../shared/cart-item';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  gridColumns = 5;
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();

    this.total = this.cartService.getTotal();
  }

  deleteItem(itemId: string){

    const c = this.cartService.getItemById(itemId);
    this.cartService.removeItem(c);

    this.total = this.cartService.getTotal();

  }

  changeSubtotal(item: any, index: number) {
    const qty = item.quantity;
    const amt = item.priceSell;
    const subTotal = amt * qty;
    item.subTotal = subTotal;
    this.cartService.saveCart();

    this.total = this.cartService.getTotal();
  }

}
