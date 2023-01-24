import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Products } from "src/app/models/produto";
import { BaseService } from "src/app/services/base.service";

@Injectable()
export class StoreService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  GetProductsStore(): Observable<Products[]> {
    return this.http.get<Products[]>(this.UrlStore + 'catalog/products/list', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
