import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/main/store/myStore/store.store';
import { Cart, Products } from 'src/app/models/produto';
import { WishService } from '../services/wish.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {

  wishList: Cart;

  constructor(private wishService: WishService,
    private store: Store, private spinner: NgxSpinnerService,
    private toarst: ToastrService) { }

  ngOnInit() {
    this.store.getWish().subscribe({
      next: () => {
        setTimeout(() => {
          this.getWish()
        }, 1000);
      },
      error: () => { this.toarst.warning('Erro ao tentar carregar sua lista de desejo') }
    }).add(() => this.spinner.hide())
  }

  getWish(){
    this.spinner.show();
    this.wishService.GetWish().subscribe({
      next: (wish: Cart) => { this.wishList = wish},
      error: () => { },
    }).add(() => this.spinner.hide())
  }

  closeWish(){
    document.getElementsByClassName('js-panel-wish')[0].classList.remove('show-header-cart');
  }

  cleanWish(){
    this.spinner.show();
    this.wishService.RemoveWish().subscribe({
      next: () => { this.wishList = null; this.store.setWishRemove('wish', '');},
      error: (error: any) => { this.toarst.warning('Erro ao tentar limpar sua lista de desejo'); }
    }).add(() => this.spinner.hide())
  }

  removeItem(id: string, name: string){
    this.spinner.show();
    this.wishService.RemoveWishItem(id).subscribe({
      next: () => {
      this.toarst.info(name + ' foi removido do seu carrinho');
      this.store.setWish('wish', '');
      document.getElementsByClassName(id)[0].classList.remove('js-addedwish-b2');
    },
      error: () => { 'Não foi possível remover ' + name + ' do seu carrinho'}
    }).add( () => this.spinner.hide());
  }
}
