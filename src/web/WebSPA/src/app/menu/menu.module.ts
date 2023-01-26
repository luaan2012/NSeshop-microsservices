import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CartCountComponent } from "../components/cartCount/cartCount.component";
import { WishlistCountComponent } from "../components/wishlistCount/wishlistCount.component";
import { FooterComponent } from "./footer/footer.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from "../account/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations:[
    FooterComponent,
    NavigationComponent,
    WishlistCountComponent,
    CartCountComponent,
    LoginComponent
  ],
  imports:[
    RouterModule,
    BrowserModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    FooterComponent,
    NavigationComponent,
  ]
})

export class MenuModule {}
