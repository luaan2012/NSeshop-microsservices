import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/service/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent{

  constructor(private router: Router, public account: AccountService){}

  @ViewChild('menudesktop', {static: true}) myNav:ElementRef;
  @ViewChild('wrapMenu', {static: true}) wrapMenu:ElementRef;

  @HostListener('window:scroll') onWindowScroll() {

    if (window.scrollY > 0) {
      this.myNav.nativeElement.classList.add('fix-menu-desktop');
      this.wrapMenu.nativeElement.setAttribute('style','top: 0px');
    } else {
      this.myNav.nativeElement.classList.remove('fix-menu-desktop');
      this.wrapMenu.nativeElement.setAttribute('style','top: 35px');
    }
  }

  showNav(): boolean {
    var rotas = ['/conta/entrar','/conta/cadastrar','/conta/forget'];
    return rotas.includes(this.router.url);
  }
}
