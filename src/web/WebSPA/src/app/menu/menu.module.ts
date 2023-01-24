import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CartCountComponent } from "../components/cartCount/cartCount.component";
import { WishlistCountComponent } from "../components/wishlistCount/wishlistCount.component";
import { FooterComponent } from "./footer/footer.component";
import { NavigationComponent } from "./navigation/navigation.component";

@NgModule({
  declarations:[
    FooterComponent,
    NavigationComponent,
    WishlistCountComponent,
    CartCountComponent
  ],
  imports:[
    RouterModule,
    BrowserModule,
    TooltipModule.forRoot(),
  ],
  exports:[
    FooterComponent,
    NavigationComponent,
  ]
})

export class MenuModule {}
