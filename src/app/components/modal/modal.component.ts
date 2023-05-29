import { Component, Input } from '@angular/core';

import { Currency, StatusEnum } from 'src/app/data/currency';
import { ExchangeService } from 'src/app/services/exchange.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    public modalService: ModalService,
    public exchangeService: ExchangeService
  ) {}

  currencies: Currency[] = this.exchangeService.availableCurrencyArray;
  tempCurrList: string[] = [];

  prepareToAdd(currencyObj: Currency): Currency[] {
    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) return this.currencies;

    if (currencyObj) {
      currencyObj.status === StatusEnum.AVAILABLE
        ? (currencyObj.status = StatusEnum.ACTIVE)
        : (currencyObj.status = StatusEnum.AVAILABLE);
      if (this.tempCurrList.includes(currencyObj.currency)) {
        this.tempCurrList = this.tempCurrList.filter(
          (curr) => curr !== currencyObj.currency
        );
        return this.currencies;
      }
      this.tempCurrList.push(currencyObj.currency);
    }
    console.log(this.tempCurrList);
    return this.currencies;
  }

  updateCurrencies() {
    this.currencies = this.currencies.map((curr) => {
      this.tempCurrList.find((tempCurr) => {
        if (curr.currency === tempCurr) curr.status = StatusEnum.NOT_AVAILABLE;
      });
      return curr;
    });
  }
}
