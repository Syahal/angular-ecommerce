import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// 17.2 develop cartservice
export class CartService {

  cartItem: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //check if already have the item in our cart
    let alreaadyExistsIncart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItem.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItem.find( tempCartItem => tempCartItem.id === theCartItem.id );

      // check if we found it
      alreaadyExistsIncart = (existingCartItem != undefined);
    }

    if (alreaadyExistsIncart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItem.push(theCartItem);
    }

    // compute cart total price and quantity
    this.computeCartTotals();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.removeItem(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  removeItem(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItem.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItem.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItem) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publis the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
