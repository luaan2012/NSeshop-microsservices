import { shipPrice } from './../../utils/creditCard';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/components/form-base.component';
import { CartService } from 'src/app/components/services/cart.service';
import { Address } from 'src/app/models/client';
import { OrderTransaction } from 'src/app/models/OrderTransaction';
import { Cart } from 'src/app/models/produto';
import { ConfigToarst } from 'src/app/utils/configToarst';
import { AddEventCreditcart } from 'src/app/utils/creditCard';
import { AddressService } from '../services/address.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['../cart.component.css']
})

export class OrderComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  address: Address;
  cart: Cart;
  order: OrderTransaction;
  registerForm: FormGroup;
  errors: any;;

  constructor(private fb: FormBuilder, private toarst: ToastrService, private spinner: NgxSpinnerService, private router: Router,
    private addressService: AddressService, private confToarst: ConfigToarst, private cartService: CartService, private orderService: OrderService,
    private titleService: Title)
  {
    super();
    this.titleService.setTitle("Finalizar Pedido - NerdStore");

    this.validationMessages = {
      cardName: {
        required: 'Nome é obrigatório',
        rangeLength: 'Nome deve ter mais que 3 caracteres'
      },
      cardNumber: {
        required: 'Informe o numero do cartao',
        rangeLength: 'Nome deve ter 16 caracteres'
      },
      cardExpiration: {
        required: 'Informe uma data',
      },
      cvvCard: {
        required: 'CVV obrigatorio',
        rangeLength: 'CVV teve conter no minimo 3'
      },
    };

    super.ConfMessagesValidationBase(this.validationMessages);
    }

  get f(): any { return this.registerForm.controls; }

  ngOnInit() {
    this.getCart();
    AddEventCreditcart.AddEvent();

    let cardNumber = new FormControl('', [Validators.required, Validators.min(19), Validators.maxLength(19)]);
    let cardName = new FormControl('', [Validators.required, CustomValidators.rangeLength([3, 200])]);
    let cvvCard = new FormControl('', [Validators.required, CustomValidators.rangeLength([3, 4])]);
    let cvvcardExpirationCard = new FormControl('', [Validators.required, CustomValidators.rangeLength([5, 5])]);

    this.registerForm = this.fb.group({
      cardName: cardName,
      cardNumber: cardNumber,
      cvvCard: cvvCard,
      cardExpiration: cvvcardExpirationCard,
    });
  }

  ngAfterViewInit(): void {
    super.ConfigValidFormBase(this.formInputElements, this.registerForm);
  }

  getCart(){
    this.spinner.show();
    this.cartService.GetCart().subscribe({
      next: (cart: Cart) => {
        if(cart?.items?.length > 0){
          this.cart = cart
          this.getAddress();
        }
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
      next: (address: Address) => { this.address = address; this.getOrder()},
      error: () => { },
    }).add(() => this.spinner.hide())
  }

  getOrder(){
    this.spinner.show();
    this.order = this.orderService.mapOrder(this.cart, this.address);
    this.spinner.hide();
  }

  finalizeOrder(){
    this.spinner.show();
    this.order = Object.assign(this.order, this.registerForm.value)
    this.orderService.FinalizeOrder(this.order).subscribe({
      next: () => { this.processSuccess()},
      error: (fail: any) => { this.ProcessFail(fail)},
    }).add(() => this.spinner.hide())
  }

  processSuccess() {
    this.errors = [];
    this.confToarst.toarstPosition(7);
    this.confToarst.toarstTimeOut(2000);

    let toast = this.toarst.success('Pedido realizado com sucesso!');

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/pedido-finalizado']);
      });
    }else{
      this.router.navigate(['/pedido-finalizado']);
    }
  }

  ProcessFail(fail: any) {
    this.errors = fail.error.errors['Messages'] ? fail.error.errors['Messages'] : fail.error.errors;
      console.log(this.errors)
    this.toarst.error('Aconteceu algo enquanto tentavamos prosseguir', 'Opa :(');
  }

}
