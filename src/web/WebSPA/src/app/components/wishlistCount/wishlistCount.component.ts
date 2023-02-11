import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/main/store/myStore/store.store';
import { WishService } from '../services/wish.service';

@Component({
  selector: 'app-wishlistCount',
  templateUrl: './wishlistCount.component.html',
})
export class WishlistCountComponent implements OnInit {

  count: number = 0;

  constructor(private wishService: WishService, private store: Store) { }

  ngOnInit() {
    this.getQuantity();

    this.store.getWish().subscribe({
      next: (a: any) => { this.getQuantity()},
      error: (a: any) => {},
    })

    this.store.getWishRemove().subscribe({
      next: (a: any) => { this.getQuantity()},
      error: (a: any) => {},
    })
  }

  getQuantity(){
    setTimeout(() => {
      this.wishService.GetQuantity().subscribe({
        next: (a: number) => { a > 0 ? this.count = a : this.count = 0},
        error: () => {}
      })
    }, 400);
  }
}
