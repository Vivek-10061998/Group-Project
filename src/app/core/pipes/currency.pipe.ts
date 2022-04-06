import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from "src/app/core/services/app-config.service";

@Pipe({
  name: 'mycurrency',
})
export class CurrencyPipe implements PipeTransform {
  constructor(private appConfigService: AppConfigService){}
  transform(value: string | number, currencyCode: string = 'INR'): string | null {
    return this.currencyFormat(value, currencyCode);
  }

  currencyFormat(price: any, currency: string = 'INR') {
    if(this.appConfigService.getSessionItem("maskingSelected") === "true"){
      return price;
    } else {
      let amount = parseFloat(price);
      if (currency == 'INR') {
        return amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });
      }
      else {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
      }  
    }

  }
}