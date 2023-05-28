import { Component, Input } from '@angular/core';
import { Currency, StatusEnum } from 'src/app/data/currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent {
  @Input() currencyObj: Currency;

  active = StatusEnum.ACTIVE;
  notAvailable = StatusEnum.NOT_AVAILABLE;
  available = StatusEnum.AVAILABLE;

  changeCurrencyStatus(currencyObj: Currency) {
    console.log(currencyObj.status);
  }
  // changeStatus(status) {}
}
