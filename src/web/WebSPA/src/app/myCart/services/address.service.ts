import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { Address } from "src/app/models/client";
import { BaseService } from "src/app/services/base.service";

@Injectable()

export class AddressService extends BaseService{
  constructor(private http: HttpClient) {
    super();
  }

  GetAddress(): Observable<Address> {
    return this.http.get<Address>(this.urlClient + 'client/address', this.GetAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getCep(): Observable<any> {
    return this.http.get<any>('https://viacep.com.br/ws/01001000/json/', this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
