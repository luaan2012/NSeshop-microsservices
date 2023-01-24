import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "src/app/services/base.service";
import { catchError, Observable } from "rxjs";
import { Banner } from "../../../models/banner";
import { Products } from "src/app/models/produto";

@Injectable()
export class HomeService extends BaseService{
    constructor(private http: HttpClient) { super() }

    getBanners(): Observable<Banner[]> {
      return this.http
        .get<Banner[]>(this.UrlStore + "banners", super.ObterHeaderJson())
        .pipe(catchError(super.serviceError));
    }

    getHighLighted(): Observable<Products[]> {
      return this.http
        .get<Products[]>(this.UrlStore + "catalog/products/highlighted", super.ObterHeaderJson())
        .pipe(catchError(super.serviceError));
    }
}
