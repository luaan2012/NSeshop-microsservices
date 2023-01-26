import { Component, ElementRef, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/account/service/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent{
  modalRef?: BsModalRef;

  constructor(private router: Router, public account: AccountService, private modalService: BsModalService){}

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
