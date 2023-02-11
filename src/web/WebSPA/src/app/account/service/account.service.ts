import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { User } from 'src/app/models/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AccountService extends BaseService {

  refreshToken: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { super(); }

  RegisterUser(user: User): Observable<User> {
    let response = this.http
      .post(this.UrlAccount + 'new-account', user, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  Login(usuario: User): Observable<User> {
    let response = this.http
      .post(this.UrlAccount + 'authentication', usuario, this.ObterHeaderJson())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError));

    return response;
  }

  TokenExpired(): boolean{
    if (this.LocalStorage.GetTokenUser() && this.jwtHelper.isTokenExpired(this.LocalStorage.GetTokenUser())){
      this.LocalStorage.ClearDataUser();
      return true;
    }

    return false;
  }
}
