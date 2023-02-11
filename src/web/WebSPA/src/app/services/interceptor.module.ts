import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AccountService } from "../account/service/account.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
req: HttpRequest<any>

constructor( private accountService: AccountService, private toarst: ToastrService, private router: Router){}

 intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

  if(this.accountService.LocalStorage.GetTokenUser() && this.accountService.TokenExpired()){
    this.router.navigate(['/home', 'login']);
    return next.handle(this.req);
  }

  request = request.clone({});

  return next.handle(request);
 }
}
