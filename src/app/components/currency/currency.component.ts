import { Component } from '@angular/core';
import { CurrencyEnum } from 'src/app/data/currencies';
import { AddCurrency, Currency } from 'src/app/data/currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent {
  currArr: Currency[] = [
    { currency: CurrencyEnum.USD, description: 'united states dollar' },
    { currency: CurrencyEnum.EUR, description: 'euro' },
    { currency: CurrencyEnum.UAH, description: 'Ukrainian hryvnia' },
  ];

  addCurrency: AddCurrency = { currency: '+', description: 'add currency' };

  addCurrencyToList(currency: CurrencyEnum, description: string): void {
    this.currArr.push({ currency, description });
  }
}
