import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/main/store/myStore/store.store';
import { CartService } from '../../components/services/cart.service';
import { Cart } from '../../models/produto';
import { ConfigToarst } from '../../utils/configToarst';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../cart.component.css']
})
export class MyCartComponent implements OnInit {

  cart: Cart;
  appDiscount: any;

  constructor(private cartService: CartService, private toarst: ToastrService, private spinner: NgxSpinnerService, private router: Router,
    private confToarst: ConfigToarst, private store: Store) { }

  ngOnInit() {
    this.store.getProduct().subscribe({
      next: () => { setTimeout(() => {
        this.getCart();
        this.spinner.hide();
      }, 400)},
      error: () => { this.toarst.warning('Erro ao tentar carregar seu carrinho') }
    }).add(() => this.spinner.hide())
  }

  getCart(){
    this.spinner.show();
    this.cartService.GetCart().subscribe({
      next: (cart: Cart) => {
        if(cart?.items?.length > 0)
          this.cart = cart
        else{
          this.confToarst.toarstTimeOut(2000);
          this.confToarst.toarstPosition(7);
          let toarst = this.toarst.warning('Você ainda não possui items no carrinho :(');
          if (toarst) {
            toarst.onHidden.subscribe(() => {
              this.router.navigate(['/loja']);
            });
          }
        }
      },
      error: () => { this.toarst.warning('Erro ao carregar seu carrinho :(')}
    }).add(() => this.spinner.hide());
  }

  digitQuantity(id: string, input: HTMLInputElement){
    let product = this.cart?.items.find(x => x.productId == id);
    product.quantity = parseInt(input.value);
  }

  add(id: string){
    let product = this.cart?.items.find(x => x.productId == id);
    product.quantity++;
  }

  less(id: string){
    let product = this.cart?.items.find(x => x.productId == id);
    product.quantity--;
  }

  attCart(id: string){
    this.spinner.show();
    this.confToarst.toarstTimeOut(4000);
    this.confToarst.toarstPosition(3);
    let product = this.cart?.items.find(x => x.productId == id);

    this.cartService.updatedCart(product.productId, product).subscribe({
      next: () => { this.toarst.success(product.name + ' atualizado'); this.store.set('store', '') },
      error: (fail: any) => {
        let error = fail.error.errors['Messages'];
        if (error?.length > 0) {
          let message: string = '';
          for (let index = 0; index < error.length; index++) {
            message += error[index] + ' ';
          }
          this.toarst.warning(message);
        } else {
          this.toarst.warning(fail.error.errors[0]);
        }
        this.spinner.hide();
      }
    })
  }

  applyDiscount(){
    this.spinner.show();
    this.cartService.applyDiscount(this.appDiscount).subscribe({
      next: () => { this.toarst.success('Desconto aplicado com sucesso'); this.store.set('store', '') },
      error: () => { this.toarst.error('Aconteceu algo errado ao tentar aplicar o desconto') }
    }).add(() => this.spinner.hide())
  }

  removeDiscount(voucher: string){
    this.spinner.show();
    this.cartService.removeDiscount(voucher).subscribe({
      next: () => { this.toarst.success('Desconto removido com sucesso'); this.store.set('store', '') },
      error: () => { this.toarst.error('Aconteceu algo errado ao tentar remover o desconto') }
    }).add(() => this.spinner.hide())
  }
}
