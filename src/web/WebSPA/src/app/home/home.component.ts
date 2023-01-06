import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './services/home.service';
import { Banner } from './models/banner';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public banners: Banner[];
  public maisVendidos: Produto[];
  public novidades: Produto[];
  public ofertas: Produto[];
  public maisBuscados: Produto[];
  errorMessage: string;
  myInterval: number = 2000;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getBanners().subscribe({
      next: (banners: Banner[]) => this.banners = banners,
      error: (error: any) => this.errorMessage
    })

    this.homeService.getHighLighted().subscribe({
      next: (produto: Produto[]) => {
        this.maisVendidos = produto.filter(x => x.productCategory == 0),
        this.novidades = produto.filter(x => x.productCategory == 1),
        this.ofertas = produto.filter(x => x.productCategory == 2),
        this.maisBuscados = produto.filter(x => x.productCategory == 3)
      },
      error: (error: any) => this.errorMessage
    })
  }

   changeInterval(interval:number){
    this.myInterval = interval;
   }

}
