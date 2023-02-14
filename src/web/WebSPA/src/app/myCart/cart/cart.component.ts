import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/main/store/myStore/store.store';
import { Address } from 'src/app/models/client';
import { CartService } from '../../components/services/cart.service';
import { Cart } from '../../models/produto';
import { ConfigToarst } from '../../utils/configToarst';
import { AddressService } from '../services/address.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBaseComponent } from 'src/app/components/form-base.component';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { NgTemplateOutlet } from '@angular/common';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../cart.component.css']
})
export class MyCartComponent extends FormBaseComponent implements OnInit {

  cart: Cart;
  appDiscount: any;
  address: Address;
  cep: any;
  modalRef?: BsModalRef;
  cepDigit: string = '';
  registerForm: FormGroup;
  MASKS = MASKS;
  errors: any[] = []

  constructor(private fb: FormBuilder, private cartService: CartService, private toarst: ToastrService,
  private spinner: NgxSpinnerService, private router: Router, private addressService: AddressService,
   private confToarst: ConfigToarst, private store: Store, private modalService: BsModalService,
   private titleService: Title)
  {
    super();
    this.titleService.setTitle("Carrinho - NerdStore");
  }
  get f(): any { return this.registerForm.controls; }

  ngOnInit() {
    this.store.getProduct().subscribe({
      next: () => { setTimeout(() => {
        this.getCart();
        this.spinner.hide();
      }, 400)},
      error: () => { this.toarst.warning('Erro ao tentar carregar seu carrinho') }
    }).add(() => this.spinner.hide())

    this.getAddress();

    this.registerForm = this.fb.group({
      cep: ['', [Validators.minLength(9), NgBrazilValidators.cep]],
      neighborhood: ['', Validators.required],
      publicPlace: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      number: ['', Validators.required],
      complement: ['']
    });
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

  getAddress(){
    this.spinner.show();
    this.addressService.GetAddress().subscribe({
      next: (address: Address) => { this.address = address },
      error: () => { },
    }).add(() => this.spinner.hide())
  }

  openAddress(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  openEditAddress(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);

    this.cep = this.address.cep;

    this.registerForm = this.fb.group({
      cep: [this.address.cep],
      neighborhood: [this.address.neighborhood, Validators.required],
      publicPlace: [this.address.publicPlace, Validators.required],
      city: [this.address.city, Validators.required],
      state: [this.address.state, Validators.required],
      number: [this.address.number, Validators.required],
      complement: [this.address.complement]
    });
  }

  closeAddress(){
    this.modalRef.hide();
    this.registerForm.reset();
    this.cep = null;
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
    product.quantity <= 0 ? product.quantity = 0 : product.quantity--;
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
            message += error[index] + ', ';
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

  public getCep(cepe: string){
    if(cepe.length < 8)
      return;

    document.getElementById('hidecep').classList.add('d-none');
    document.getElementById('loadingCep').classList.remove('d-none');

    setTimeout(() => {
      this.addressService.getCep(CurrencyUtils.CleanString(cepe)).subscribe({
        next: (cep: any) => {
          this.cep = cep;

          this.registerForm = this.fb.group({
            cep: [cepe, Validators.minLength(9)],
            neighborhood: [cep.bairro, Validators.required],
            publicPlace: [cep.logradouro, Validators.required],
            city: [cep.localidade, Validators.required],
            state: [cep.uf, Validators.required],
            number: ['', Validators.required],
            complement: ['']
          });
        },
        error: (error: any) => { }
      })
      document.getElementById('loadingCep').classList.add('d-none');
      document.getElementById('hidecep').classList.remove('d-none');
    }, 2000);
  }

  EditAddress(){
    this.address = Object.assign({}, this.address, this.registerForm.value)
    this.address.cep = CurrencyUtils.CleanString(this.address.cep);
    this.address.number = this.address.number.toString();
    this.addressService.EditAddress(this.address).subscribe({
       next: (success) => { this.processSuccess('Endereco editado com sucesso!'); this.getAddress()},
       error: (error) => { this.ProcessFail(error) }
     }).add(() => this.spinner.hide());
  }

  AddAddress(){
    this.spinner.show();

    if(document?.getElementsByClassName('editAddress')[0]){
      this.EditAddress();
      return;
    }

    this.address = Object.assign({}, this.address, this.registerForm.value)
    this.address.cep = CurrencyUtils.CleanString(this.address.cep);
    this.address.number = this.address.number.toString();
    this.addressService.AddAddress(this.address).subscribe({
       next: () => { this.processSuccess('Endereco adicionado com sucesso!')},
       error: (error) => { this.ProcessFail(error) }
     }).add(() => this.spinner.hide());
  }

  processSuccess(message) {
    this.registerForm.reset();
    this.errors = [];

    this.toarst.toastrConfig.timeOut = 1500;
    this.toarst.toastrConfig.positionClass = 'toast-top-center';

    this.toarst.success(message);

    this.modalRef.hide();
  }

  ProcessFail(fail: any) {
    console.log(fail)
    this.errors = fail?.error?.errors['Messages'] ? fail?.error?.errors['Messages'] : fail?.error?.errors;
    this.toarst.error(this.errors[0], 'Opa :(');
  }
}
