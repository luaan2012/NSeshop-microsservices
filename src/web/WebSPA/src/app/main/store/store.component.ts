import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/components/services/cart.service';
import { WishService } from 'src/app/components/services/wish.service';
import { Cart, Products } from 'src/app/models/produto';
import { ConfigToarst } from 'src/app/utils/configToarst';
import { Store } from './myStore/store.store';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {

  modalRef?: BsModalRef;
  products: Products[] = [];
  filters: Products[] = [];
  product: Products;
  quantity: number = 1;
  idDetail: any;
  idBanner: any;

  constructor(private storeService: StoreService, private toarst: ToastrService,
    private spinner: NgxSpinnerService, private router: Router, private cartService: CartService,
    private wishService: WishService, private store: Store, private configToarst: ConfigToarst,
    private activeRouter: ActivatedRoute, private titleService: Title)
    {
      this.titleService.setTitle("Loja - NerdStore");
    }

  ngOnInit(): void {
    this.idDetail = this.activeRouter.snapshot.paramMap.get('id');
    this.activeRouter.paramMap.subscribe(parms =>{
      this.idBanner = parms.get('banner')
    })

    if(this.idDetail)
      window.history.pushState({}, document.title, "/" + "");

    if(this.idBanner)
      window.history.pushState({}, document.title, "/" + "loja");

    this.spinner.show();

    this.configToarst.toarstPosition(3);
    this.configToarst.toarstTimeOut(4000);

    this.storeService.GetProductsStore().subscribe({
      next: (products: Products[]) => { this.wishList(products);},
      error: () => {
        let toast = this.toarst.warning('Ocorreu um erro ao carregar a loja, tente novamente mais tarde.', 'Loja indisponivel');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/home']);
          });
        }
      }
    }).add(() => this.spinner.hide());

    this.store.getWishRemove().subscribe({
      next: () => { this.removeWishListItem();},
      error: () => {}
    })
  }

  productDetail(id: any) {
    this.product = this.products.find(x => x.id == id);
    document.getElementsByClassName('js-modal1')[0].classList.add('show-modal1');
  }

  addCart(id: string) {
    this.spinner.show();
    this.product = this.products.find(x => x.id == id);
    this.product.productId = id;
    this.product.quantity = this.quantity;

    this.store.set('store', '');

    this.cartService.AddCart(this.product).subscribe({
      next: () => {
        this.toarst.info(this.product.name + ' foi adicionado ao carrinho')
        document.getElementsByClassName('js-modal1')[0].classList.remove('show-modal1');
        this.quantity = 1
      },
      error: (fail: any) => {
        let error = fail.error.errors['Messages'];
        if (error?.length > 0) {
          let message: string = '';
          for (let index = 0; index < error.length; index++) {
            message += error[index] + ', ';
          }
          this.toarst.warning(message);
        }else{
          this.toarst.warning(fail.error.errors[0]);
        }
      }
    });
  }

  closeModal(modal: HTMLDivElement){
    modal.classList.remove('show-modal1');
    this.quantity = 1;
  }

  add(){
    this.quantity++;
  }

  less(){
    this.quantity > 1 ? this.quantity-- : '';
  }

  addWish(id: string, element: HTMLAnchorElement){
    this.spinner.show();
    this.product = this.products.find(x => x.id == id);
    this.product.productId = id;
    this.product.quantity = this.quantity;

    if(element.classList.contains('js-addedwish-b2')){
      this.wishService.RemoveWishItem(this.product.id).subscribe({
        next: () => {
          this.store.setWish('wish', '');
          element.classList.remove('js-addedwish-b2');
          this.toarst.info(this.product.name + ' foi removido da sua lista de desejos')
        },
        error: () => {this.toarst.warning('Algo deu errado ao remover ' + this.product.name + ' da sua lista de desejo')}
      }).add(() => this.spinner.hide());
    }else{
      this.wishService.AddWish(this.product).subscribe({
        next: () => {
          this.store.setWish('wish', '');
          element.classList.add('js-addedwish-b2');
          this.toarst.info(this.product.name + ' foi adicionado a sua lista de desejos')
        },
        error: () => {this.toarst.warning('Algo deu errado ao remover ' + this.product.name + ' da sua lista de desejo')}
      }).add(() => this.spinner.hide());
    }
  }

  wishList(products: Products[]){
    this.wishService.GetWish().subscribe({
      next: (a: Cart) => {
        products.forEach((v, i) => {
          if(a?.items?.some(x => x.productId == v.id)){
            v.wishList = 'js-addedwish-b2';
          }
        })
        if(this.idDetail)
          this.productDetail(this.idDetail);

        if(this.idBanner){
          console.log(this.idBanner)
          var html = document.getElementById('filters') as HTMLDivElement;
          this.filter(html, this.idBanner);
        }
      },
      error: () => {}
    });
    this.filters = products;
    this.products = products;
  }

  removeWishListItem(){
    var elements = document.getElementsByClassName('js-addwish-b2');

    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove('js-addedwish-b2');
    }
  }

  filter(button: HTMLDivElement, type: number){
    this.products = this.filters;

    for (let index = 0; index < button.children.length; index++) {
      if(button.children[index].className.includes('type-'+type))
        button.children[index].classList.add('how-active1')
      else
        button.children[index].classList.remove('how-active1')
    }

    if(type == 0)
      return;

    this.products = this.products.filter(x => x.productType == type);
  }
}
