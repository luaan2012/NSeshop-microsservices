import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusOrder'
})
export class StatusOrder implements PipeTransform {

  public transform(value: number){
    let statusMessage = "";
    let statusClass = "";

    switch (value)
    {
      case 1:
        statusClass = "info";
        statusMessage = "Em aprovação";
        break;
      case 2:
        statusClass = "primary";
        statusMessage = "Aprovado";
        break;
      case 3:
        statusClass = "danger";
        statusMessage = "Recusado";
        break;
      case 4:
        statusClass = "success";
        statusMessage = "Entregue";
        break;
      case 5:
        statusClass = "warning";
        statusMessage = "Cancelado";
        break;
    }

    return `<span class='badge rounded-pill bg-${statusClass}'>${statusMessage}</span>`;
  }
}
