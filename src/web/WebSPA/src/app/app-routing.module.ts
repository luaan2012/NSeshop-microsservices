import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './myCart/cart/cart.component';
import { AboutComponent } from './institutional/about/about.component';
import { BlogComponent } from './institutional/blog/blog.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { HomeComponent } from './main/home/home.component';
import { StoreComponent } from './main/store/store.component';
import { MyOrdersComponent } from './myCart/myOrders/myOrders.component';
import { OrderComponent } from './myCart/order/order.component';
import { OrderFinishedComponent } from './myCart/orderFinished/orderFinished.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:login', component: HomeComponent },
  {
    path: 'conta',
    loadChildren: () => import('./account/account.module')
      .then(m => m.AccountModule)
  },
  { path: 'loja', component: StoreComponent },
  { path: 'loja/:id', component: StoreComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'carrinho', component: MyCartComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'meus-pedidos', component: MyOrdersComponent },
  { path: 'finalizar-pedido', component: OrderComponent },
  { path: 'pedido-finalizado', component: OrderFinishedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
