import { Component } from '@angular/core';
import { Currency, StatusEnum } from 'src/app/data/currency';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}
  currencies: Currency[] = [
    {
      currency: 'AUD',
      description: 'australian dollar',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'CAD',
      description: 'canadian dollar',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'IDR',
      description: 'indian rupee',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'JPY',
      description: 'japanese yen',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'PLN',
      description: 'polish zloty',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'RUB',
      description: 'russian ruble',
      status: StatusEnum.AVAILABLE,
    },
  ];

  tempCurrArray: Currency[] = [];

  prepareToAdd(currencyObj: Currency): void {
    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) return;

    if (currencyObj) {
      currencyObj.status === StatusEnum.AVAILABLE
        ? (currencyObj.status = StatusEnum.ACTIVE)
        : (currencyObj.status = StatusEnum.AVAILABLE);
      if (this.tempCurrArray.includes(currencyObj)) {
        this.tempCurrArray = this.tempCurrArray.filter(
          (curr) => curr !== currencyObj
        );
        return;
      }
      this.tempCurrArray.push(currencyObj);
    }
    console.log(this.tempCurrArray);
  }

  addToList() {
    if (this.tempCurrArray.length === 0) return;

    console.log(this.tempCurrArray);
  }
}
