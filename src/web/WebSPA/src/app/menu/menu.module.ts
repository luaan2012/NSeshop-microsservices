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
import { CartComponent } from "../components/cart/cart.component";
import { WishlistComponent } from "../components/wishlist/wishlist.component";
import { CartService } from "../components/services/cart.service";
import { WishService } from "../components/services/wish.service";

@NgModule({
  declarations:[
    FooterComponent,
    NavigationComponent,
    WishlistCountComponent,
    CartCountComponent,
    LoginComponent,
    CartComponent,
    WishlistComponent
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
  ],
  providers: [
    CartService,
    WishService
  ]
})

export class MenuModule {}
