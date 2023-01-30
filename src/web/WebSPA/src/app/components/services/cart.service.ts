import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Cart, Products } from "src/app/models/produto";
import { BaseService } from "src/app/services/base.service";

@Injectable()

export class CartService extends BaseService{
  constructor(private http: HttpClient) {
    super();
  }

  GetCart(): Observable<Cart> {
    return this.http.get<Cart>(this.UrlBFF + 'shops/cart', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  GetQuantity(): Observable<number> {
    return this.http.get<number>(this.UrlBFF + 'shops/cart-quantity', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  AddCart(product: Products): Observable<Products> {
    return this.http.post<Products>(this.UrlBFF + 'shops/cart/items', product, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  updatedCart(id: string, product: Products): Observable<Products> {
    return this.http.put<Products>(this.UrlBFF + 'shops/cart/items/' + id, product, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  CleanCart(): Observable<any> {
    return this.http.delete<any>(this.UrlBFF + 'shops/cart/removeCart', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  RemoveOneItem(id: string): Observable<any> {
    return this.http.delete<any>(this.UrlBFF + 'shops/cart/items/' + id, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  applyDiscount(voucherCode: string): Observable<any> {
    return this.http.post(`${this.UrlBFF + 'shops/cart/apply-voucher'}`,`\"${voucherCode}\"`, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  removeDiscount(voucherCode: string): Observable<any> {
    return this.http.post(`${this.UrlBFF + 'shops/cart/remove-voucher'}`,`\"${voucherCode}\"`, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
