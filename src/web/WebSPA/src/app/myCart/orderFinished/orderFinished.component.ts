import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/client';
import { OrderFinished } from 'src/app/models/OrderTransaction';
import { ConfigToarst } from 'src/app/utils/configToarst';
import { AddressService } from '../services/address.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orderFinished',
  templateUrl: './orderFinished.component.html',
  styleUrls: ['./../cart.component.css']
})
export class OrderFinishedComponent implements OnInit {

  order: OrderFinished;
  address: Address;

  constructor(private toarst: ToastrService, private spinner: NgxSpinnerService, private titleService: Title,
  private addressService: AddressService, private confToarst: ConfigToarst, private orderService: OrderService)
  {
    this.titleService.setTitle("Pedido finalizado - NerdStore");
  }

  ngOnInit() {
    this.getLastOrder()
  }

  getLastOrder(){
    this.spinner.show();
    this.orderService.GetLastOrder().subscribe({
      next: (order: OrderFinished) => {this.order = order; this.getAddress() },
      error: () => { this.toarst.warning('Erro ao carregar seu pedido :(')}
    }).add(() => this.spinner.hide());
  }

  getAddress(){
    this.spinner.show();
    this.addressService.GetAddress().subscribe({
      next: (address: Address) => { this.address = address},
      error: () => { },
    }).add(() => this.spinner.hide())
  }
}
