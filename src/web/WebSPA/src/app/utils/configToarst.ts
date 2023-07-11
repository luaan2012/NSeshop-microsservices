import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ConfigToarst {

  constructor(private toarst: ToastrService){}

  toarstPosition(num: number){
    switch (num) {
      case 1:
        this.toarst.toastrConfig.positionClass = 'toast-top-right';
        break;
      case 2:
        this.toarst.toastrConfig.positionClass = 'toast-bottom-right';
        break;
      case 3:
        this.toarst.toastrConfig.positionClass = 'toast-bottom-left';
        break;
      case 4:
        this.toarst.toastrConfig.positionClass = 'toast-top-full-width';
        break;
      case 5:
        this.toarst.toastrConfig.positionClass = 'toast-bottom-full-width';
        break;
      case 6:
        this.toarst.toastrConfig.positionClass = 'toast-bottom-full-width';
        break;
      case 7:
        this.toarst.toastrConfig.positionClass = 'toast-top-center';
        break;
      case 8:
        this.toarst.toastrConfig.positionClass = 'toast-bottom-center';
        break;
      case 9:
        this.toarst.toastrConfig.positionClass = 'toast-top-left';
        break;
      }
  }

  toarstTimeOut(time: number){
    this.toarst.toastrConfig.timeOut = time;
  }
}
