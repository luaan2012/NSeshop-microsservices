import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { AboutComponent } from './institutional/about/about.component';
import { StoreComponent } from './store/store.component';
import { BlogComponent } from './institutional/blog/blog.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [	
    AppComponent,
    NavigationComponent,
    AccountComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    StoreComponent,
    BlogComponent,
      FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
