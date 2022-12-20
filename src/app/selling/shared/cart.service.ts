import { Injectable } from '@angular/core';
import { CartItem } from '../shared/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  items: CartItem[] = [];

  addToCart(addedItem: CartItem) {    

    if (this.isItemInCart(addedItem)) {
      var c  = new CartItem();
      c = this.getItem(addedItem);

      if (c?.quantity != undefined) {
        c.quantity = c.quantity + 1;        
        this.removeItem(addedItem);
        this.items.push(c);
      }      
    }
    else {
      this.items.push(addedItem);
    }

    this.saveCart();
  }

  getItems() {
    const cItems = localStorage.getItem("cart_items");
    this.items = cItems !== null ? JSON.parse(cItems) : [];
    return this.items;
  } 

  loadCart(): void {
    const cItems = localStorage.getItem("cart_items");
    this.items = cItems !== null ? JSON.parse(cItems) : [];     
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items)); 
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem("cart_items");
  }

  getItem(item: CartItem): CartItem {
    const found = this.items.find((o) => {
      return o.id === item.id
    });  
    
    return found!;
  }

  getItemById(itemId: string): CartItem {
    const found = this.items.find((o) => {
      return o.id === itemId
    });  
    
    return found!;
  }

  removeItem(item: CartItem) {
    const index = this.items.findIndex(o => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  isItemInCart(item: CartItem): boolean {
    if (this.items.length > 0)
      return this.items.findIndex(o => o.id === item.id) > -1;
    else
      return false;
  }

  getTotal(): number {

    const result = this.items.reduce<number>((accumulator, obj) => {
      return accumulator + obj.subTotal;
    }, 0);
    
    return result!;
  }

}
