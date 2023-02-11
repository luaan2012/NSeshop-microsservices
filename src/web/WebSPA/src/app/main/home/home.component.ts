import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './services/home.service';
import { Banner } from '../../models/banner';
import { Products } from '../../models/produto';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigToarst } from 'src/app/utils/configToarst';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('carrosel', {static: true}) myNav:ElementRef;

  public banners: Banner[];
  public maisVendidos: Products[];
  public novidades: Products[];
  public ofertas: Products[];
  public maisBuscados: Products[];
  errorMessage: string;
  myInterval: number = 2000;
  detaisProduct: string;

  constructor(private homeService: HomeService, private spinner: NgxSpinnerService,
    private activeRouter: ActivatedRoute, private configToarst: ConfigToarst,
    private toarst: ToastrService, private router: Router) {}

  ngOnInit(): void {
    let login = this.activeRouter.snapshot.paramMap.get('login')

    if(login){
      this.configToarst.toarstPosition(3);
      this.toarst.error('Sua sessao expirou, faca o login novamente');
      window.history.pushState({}, document.title, "/" + "");
      document.getElementById('loginNav').click();
    }

    this.spinner.show();

    this.homeService.getBanners().subscribe({
      next: (banners: Banner[]) => this.banners = banners,
      error: (error: any) => this.errorMessage
    }).add(() => this.spinner.hide());

    this.homeService.getHighLighted().subscribe({
      next: (produto: Products[]) => {
        this.maisVendidos = produto.filter(x => x.productCategory == 0),
        this.novidades = produto.filter(x => x.productCategory == 1),
        this.ofertas = produto.filter(x => x.productCategory == 2),
        this.maisBuscados = produto.filter(x => x.productCategory == 3)
      },
      error: (error: any) => this.errorMessage
    }).add(() => this.spinner.hide());
  }

  ngAfterViewInit(): void {

    var a = document.createElement('div')
    a.classList.add('fa-light')
    a.classList.add('fa-arrow-left')

    setTimeout(() => {
      var left = document.querySelectorAll('.carousel-control-prev-icon');
      var right = document.querySelectorAll('.carousel-control-next-icon');


      for (let index = 0; index < left.length; index++) {
        left[index].classList.remove('carousel-control-prev-icon');
        left[index].setAttribute('style','margin-right: 150px');
        left[index].insertAdjacentHTML('beforeend', '<i class="fa-solid fa-chevron-left fa-2xl text-dark"></i>');
      }

      for (let index = 0; index < right.length; index++) {
        right[index].classList.remove('carousel-control-next-icon');
        right[index].setAttribute('style','margin-left: 170px');
        right[index].insertAdjacentHTML('beforeend', '<i class="fa-solid fa-chevron-right fa-2xl text-dark"></i>');
      }
    }, 1000);
  }

   changeInterval(interval:number){
    this.myInterval = interval;
   }

   details(id: string){
    if(this.homeService.LocalStorage.IsLogged())
      this.router.navigate(['/loja', id]);
    else{
      document.getElementById('loginNav').click();
      localStorage.setItem('detail', id);
    }
   }

   bannersDetails(id: string){
    if(this.homeService.LocalStorage.IsLogged())
      this.router.navigate(['/loja', { banner: id }]);
    else{
      document.getElementById('loginNav').click();
      localStorage.setItem('detailBanner', id);
    }
   }
}
