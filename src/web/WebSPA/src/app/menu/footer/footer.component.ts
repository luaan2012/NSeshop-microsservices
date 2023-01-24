import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showNav(): boolean {
    var rotas = ['/conta/entrar','/conta/cadastrar','/conta/forget'];
    return rotas.includes(this.router.url);
  }

}
