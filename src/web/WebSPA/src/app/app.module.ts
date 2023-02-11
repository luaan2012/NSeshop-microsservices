import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { StoreComponent } from './main/store/store.component';
import { HomeComponent } from './main/home/home.component';
import { BlogComponent } from './institutional/blog/blog.component';
import { AboutComponent } from './institutional/about/about.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { MenuModule } from './menu/menu.module';
import { HomeService } from './main/home/services/home.service';
import { Store } from './main/store/myStore/store.store';
import { StoreService } from './main/store/services/store.service';
import { ConfigToarst } from './utils/configToarst';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCartComponent } from './myCart/cart/cart.component';
import { AddressService } from './myCart/services/address.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';
import { CustomFormsModule } from 'ng2-validation';
import { MyOrdersComponent } from './myCart/myOrders/myOrders.component';
import { OrderService } from './myCart/services/order.service';
import { OrderComponent } from './myCart/order/order.component';
import { StatusOrder } from './utils/pipeStatus';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    HomeComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    MyCartComponent,
    MyOrdersComponent,
    OrderComponent,
    StatusOrder
   ],
  imports: [
    AccountModule,
    MenuModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgBrazil,
    CustomFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HomeService,
    Store,
    StoreService,
    ConfigToarst,
    AddressService,
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
