import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderFinished } from 'src/app/models/OrderTransaction';
import { ConfigToarst } from 'src/app/utils/configToarst';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-myOrders',
  templateUrl: './myOrders.component.html'
})
export class MyOrdersComponent implements OnInit {

  order: OrderFinished[] = [];

  constructor(private toarst: ToastrService, private spinner: NgxSpinnerService,
    private confToarst: ConfigToarst, private orderService: OrderService)
   { }

  ngOnInit() {
    this.getMyOrders()
  }

  getMyOrders(){
    this.spinner.show();
    this.orderService.ListByClient().subscribe({
      next: (order: OrderFinished[]) => {this.order = order; },
      error: () => { this.toarst.warning('Erro ao carregar seu pedido :(')}
    }).add(() => this.spinner.hide());
  }

}
