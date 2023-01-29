import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Cart, Products } from "src/app/models/produto";
import { BaseService } from "src/app/services/base.service";

@Injectable()

export class WishService extends BaseService{
  constructor(private http: HttpClient) {
    super();
  }

  GetWish(): Observable<Cart> {
    return this.http.get<Cart>(this.UrlBFF + 'shops/wishlist', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  GetQuantity(): Observable<number> {
    return this.http.get<number>(this.UrlBFF + 'shops/wishlist-quantity', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  AddWish(itemWish: Products): Observable<Products> {
    return this.http.post<Products>(this.UrlBFF + 'shops/wishlist/items', itemWish, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  RemoveWishItem(id: string): Observable<string> {
    return this.http.delete<string>(this.UrlBFF + 'shops/wishlist/items/' + id, this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  RemoveWish(): Observable<string> {
    return this.http.delete<string>(this.UrlBFF + 'shops/wishlist/removeWishList', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
