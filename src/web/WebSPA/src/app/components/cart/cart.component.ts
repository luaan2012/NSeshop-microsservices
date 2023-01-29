import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/main/store/myStore/store.store';
import { Cart } from 'src/app/models/produto';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(private cartService: CartService,
      private store: Store, private toarst: ToastrService,
      private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCart();

    this.store.getProduct().subscribe({
      next: () => { setTimeout(() => {
        this.getCart();
      }, 200)},
      error: () => { },
    }).add(() => this.spinner.hide())
  }

  getCart(){
    this.spinner.show();

    this.cartService.GetCart().subscribe({
      next: (cart: Cart) => { this.cart = cart;},
      error: () => { this.toarst.warning('Erro ao tentar carregar seu carrinho');}
    }).add(() => this.spinner.hide())
  }

  closedCart(){
    document.getElementsByClassName('js-panel-cart')[0].classList.remove('show-header-cart');
  }

  cleanCart(){
    this.spinner.show();
    this.cartService.CleanCart().subscribe({
      next: () => {
        this.cart = null;
        this.store.set('store', '');
        this.toarst.info('Seu carrinho foi limpado com sucesso')
      },
      error: () => {
        this.toarst.warning('Erro ao tentar limpar seu carrinho')
      }
    }).add(() => this.spinner.hide());
  }
}
