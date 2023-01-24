import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/produto';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products: Products[] = [];

  constructor(private storeService: StoreService, private toarst: ToastrService, private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();

    this.storeService.GetProductsStore().subscribe({
      next: (products: Products[]) => { this.products = products },
      error: (error: any) => {
        let toast = this.toarst.warning('Ocorreu um erro ao carregar a loja, tente novamente mais tarde.', 'Loja indisponivel');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/home']);
          });
        }else{
          this.router.navigate(['/home']);
        }
      }
    }).add(() => this.spinner.hide());
  }
}
