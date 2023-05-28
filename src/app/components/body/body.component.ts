import { Component } from '@angular/core';
import { CurrencyEnum } from 'src/app/data/currencies';
import { Currency, StatusEnum } from 'src/app/data/currency';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  date = new Date().toString();
  // currencyObj1: Currency;
  // currencyObj2: Currency;

  curArr1: Currency[] = [
    {
      currency: CurrencyEnum.USD,
      description: 'united states dollar',
      status: StatusEnum.ACTIVE,
    },
    {
      currency: CurrencyEnum.EUR,
      description: 'euro',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: CurrencyEnum.UAH,
      description: 'Ukrainian hryvnia',
      status: StatusEnum.NOT_AVAILABLE,
    },
  ];

  curArr2: Currency[] = [
    {
      currency: CurrencyEnum.USD,
      description: 'united states dollar',
      status: StatusEnum.NOT_AVAILABLE,
    },
    {
      currency: CurrencyEnum.EUR,
      description: 'euro',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: CurrencyEnum.UAH,
      description: 'Ukrainian hryvnia',
      status: StatusEnum.ACTIVE,
    },
  ];

  value: number = 1;
  activeCurrency1: string = 'USD';
  activeCurrency2: string = 'UAH';
  // activeCurrencyLine1(arr: Currency[]): void {
  //   arr.find((currency) => {
  //     if (currency.status === StatusEnum.ACTIVE) {
  //      return this.active1 = currency.currency;
  //     } else {
  //       this.active1 = 'NO ACTIVE';
  //     }
  //   });
  // }

  // checkActive() {
  //   this.activeCurrencyLine1(this.curArr1);
  //   console.log(`LINE 1 ACTIVE: ${this.active1}`);
  // }

  changeStatusToAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.AVAILABLE;
  }
  changeStatusToNotAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.NOT_AVAILABLE;
  }
  changeStatusToActive(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.ACTIVE;
  }

  changeCurrencyStatus(currencyObj: Currency) {
    const findLine1 = this.curArr1.find((obj) => obj === currencyObj);
    const findLine2 = this.curArr2.find((obj) => obj === currencyObj);

    const activeInLine1 = this.curArr1.find(
      (obj) => obj.status === StatusEnum.ACTIVE
    );
    const activeInLine2 = this.curArr2.find(
      (obj) => obj.status === StatusEnum.ACTIVE
    );

    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) return;

    if (currencyObj.status === StatusEnum.ACTIVE && findLine1) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.changeStatusToAvailable(currencyObj);
      this.curArr2.map((currency) => {
        if (currency.status === StatusEnum.NOT_AVAILABLE)
          this.changeStatusToAvailable(currency);
      });
    }
    if (currencyObj.status === StatusEnum.ACTIVE && findLine2) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.changeStatusToAvailable(currencyObj);
      this.curArr1.map((currency) => {
        if (currency.status === StatusEnum.NOT_AVAILABLE)
          this.changeStatusToAvailable(currency);
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      !activeInLine1 &&
      findLine1
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr2.map((currency) => {
        if (
          currency.status === StatusEnum.AVAILABLE &&
          currencyObj.currency === currency.currency
        )
          this.changeStatusToNotAvailable(currency);
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      !activeInLine2 &&
      findLine2
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr1.map((currency) => {
        if (
          currency.status === StatusEnum.AVAILABLE &&
          currencyObj.currency === currency.currency
        )
          this.changeStatusToNotAvailable(currency);
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      activeInLine1 &&
      findLine1
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr1.map((currency) => {
        if (
          currency.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
      });
      this.curArr2.map((currency) => {
        if (
          currency.status === StatusEnum.NOT_AVAILABLE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
        if (currencyObj.currency === currency.currency) {
          this.changeStatusToNotAvailable(currency);
        }
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      activeInLine2 &&
      findLine2
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr2.map((currency) => {
        if (
          currency.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
      });
      this.curArr1.map((currency) => {
        if (
          currency.status === StatusEnum.NOT_AVAILABLE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
        if (currencyObj.currency === currency.currency) {
          this.changeStatusToNotAvailable(currency);
        }
      });
    }
  }
}
