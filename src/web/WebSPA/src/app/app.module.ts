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


@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    HomeComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent
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
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
