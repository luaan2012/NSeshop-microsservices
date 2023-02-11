import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import {JwtHelperService} from '@auth0/angular-jwt'
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './account.service';


@Injectable()
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router){}

  canDeactivate(component: RegisterComponent) {
    if(component.chancesNotSave) {
        return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
    }
      return true
  }

  canActivate() {
    let token = this.localStorageUtils.GetTokenUser()
    if(token){
        this.router.navigate(['/home']);
    }

    return true;
  }

}
