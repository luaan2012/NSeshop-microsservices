import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Address } from "src/app/models/client";
import { OrderFinished, OrderTransaction } from "src/app/models/OrderTransaction";
import { Cart } from "src/app/models/produto";
import { BaseService } from "src/app/services/base.service";
import { shipPrice } from "src/app/utils/creditCard";

@Injectable()

export class OrderService extends BaseService{
  constructor(private http: HttpClient) {
    super();
  }

  FinalizeOrder(order: OrderTransaction): Observable<OrderTransaction> {
    return this.http.post<Address>(this.UrlBFF + 'shops/order/addOrder', order, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  GetLastOrder(): Observable<OrderFinished> {
    return this.http.get<OrderFinished>(this.UrlBFF + 'shops/order/last', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  ListByClient(): Observable<OrderFinished[]> {
    return this.http.get<OrderFinished[]>(this.UrlBFF + 'shops/order/list-client', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  mapOrder(cart: Cart, address: Address): OrderTransaction{
    const order: OrderTransaction = {
      valueTotal: cart?.valueTotal - shipPrice,
      items: cart?.items,
      discount: cart?.discount,
      voucherUsed: cart?.voucherUsed,
      voucherCode: cart?.voucher?.code,
      address: {...address},
      cardExpiration: '',
      cardName: '',
      cvvCard: '',
      cardNumber: ''
    };
    return order;
  }
}
