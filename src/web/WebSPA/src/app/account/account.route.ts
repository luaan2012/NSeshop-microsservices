import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAppComponent } from './account.app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountGuard } from './service/account.guard';

const contaRouterConfig: Routes = [
    {
      path: 'conta', component: AccountAppComponent,
      children: [
          { path: 'cadastrar', component: RegisterComponent, canActivate: [AccountGuard], canDeactivate: [AccountGuard] },
          { path: 'entrar', component: LoginComponent, canActivate: [AccountGuard] }
      ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contaRouterConfig)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
