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
import { FormsModule } from '@angular/forms';
import { MyCartComponent } from './myCart/cart/cart.component';
import { AddressService } from './myCart/services/address.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    HomeComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    MyCartComponent
   ],
  imports: [
    AccountModule,
    MenuModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HomeService,
    Store,
    StoreService,
    ConfigToarst,
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
