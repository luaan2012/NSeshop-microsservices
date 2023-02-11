import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/main/store/myStore/store.store';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cartCount',
  templateUrl: './cartCount.component.html',
})
export class CartCountComponent implements OnInit {

  count: number = 0;

  constructor(private cartService: CartService,
    private store: Store) { }

  ngOnInit() {
    this.getQuantity()

    this.store.getProduct().subscribe({
      next: () => {
        setTimeout(() => {
          this.getQuantity()
        }, 1000);
      },
      error: () => {}
    })
  }

  getQuantity() {
    this.cartService.GetQuantity().subscribe({
      next: (count: number) => { count > 0 ? this.count = count : this.count = 0;},
      error: () => {}
    })
  }
}
