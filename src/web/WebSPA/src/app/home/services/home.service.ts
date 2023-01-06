import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "src/app/services/base.service";
import { catchError, Observable } from "rxjs";
import { Banner } from "../models/banner";
import { Produto } from "src/app/models/produto";

@Injectable()
export class HomeService extends BaseService{
    constructor(private http: HttpClient) { super() }

    getBanners(): Observable<Banner[]> {
        return this.http
            .get<Banner[]>(this.UrlServiceV1 + "banners", super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    getHighLighted(): Observable<Produto[]> {
        return this.http
            .get<Produto[]>(this.UrlServiceV1 + "catalog/products/highlighted", super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }
}
