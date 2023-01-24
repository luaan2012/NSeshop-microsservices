import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask';
import { CustomFormsModule } from 'ng2-validation'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AccountAppComponent } from "./account.app.component";
import { AccountRoutingModule } from "./account.route";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { AccountGuard } from "./service/account.guard";
import { AccountService } from "./service/account.service";
import { StoreService } from "../main/store/services/store.service";

@NgModule({
  declarations:[
    LoginComponent,
    RegisterComponent,
    AccountAppComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgBrazil,
    CustomFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    })
  ],
  providers:[
    AccountGuard,
    AccountService,
    StoreService
  ]
})

export class AccountModule {}
