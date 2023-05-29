import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency, StatusEnum } from '../data/currency';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getCurrList(currency: string) {
    return this.http
      .get(`https://api.exchangerate.host/latest?base=${currency}`)
      .pipe(delay(1000));
  }

  currencyToAdd = [
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

  currencyToAddCopy = [
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

  currencyLine1: Currency[] = [
    {
      currency: 'USD',
      description: 'united states dollar',
      status: StatusEnum.ACTIVE,
    },
    {
      currency: 'EUR',
      description: 'euro',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'GBP',
      description: 'great britain pound',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'UAH',
      description: 'Ukrainian hryvnia',
      status: StatusEnum.NOT_AVAILABLE,
    },
  ];

  currencyLine2: Currency[] = [
    {
      currency: 'USD',
      description: 'united states dollar',
      status: StatusEnum.NOT_AVAILABLE,
    },
    {
      currency: 'EUR',
      description: 'euro',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'GBP',
      description: 'great britain pound',
      status: StatusEnum.AVAILABLE,
    },
    {
      currency: 'UAH',
      description: 'Ukrainian hryvnia',
      status: StatusEnum.ACTIVE,
    },
  ];

  changeStatusToAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.AVAILABLE;
  }
  changeStatusToNotAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.NOT_AVAILABLE;
  }
  changeStatusToActive(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.ACTIVE;
  }

  updateLists(data: Currency[]): void {
    data.map((cur) => {
      const { currency, description, status } = cur;
      const curToPush: Currency | undefined = this.currencyToAddCopy.find(
        (c) => c.currency === currency
      );
      if (curToPush !== undefined) {
        this.currencyLine1.push(curToPush);
        this.currencyLine2.push(curToPush);
      }
    });
  }

  reverseCondition(currency: Currency): void {
    currency.status === StatusEnum.ACTIVE
      ? (currency.status = StatusEnum.NOT_AVAILABLE)
      : currency.status === StatusEnum.NOT_AVAILABLE
      ? (currency.status = StatusEnum.ACTIVE)
      : StatusEnum.AVAILABLE;
  }

  activeCurrency1: string = 'USD';
  activeCurrency2: string = 'UAH';

  checkActive(currencyObj: Currency, isLine1: boolean): void {
    if (currencyObj) {
      if (isLine1) {
        this.activeCurrency1 = currencyObj.currency;
        // console.log(`active1: ${this.activeCurrency1}`);
        return;
      }
      this.activeCurrency2 = currencyObj.currency;
      // console.log(`active2: ${this.activeCurrency2}`);
    }
  }

  reverseStatus() {
    const [newActive1, newActive2] = [
      this.activeCurrency1,
      this.activeCurrency2,
    ];
    this.currencyLine1.map((currency) => this.reverseCondition(currency));
    this.currencyLine2.map((currency) => this.reverseCondition(currency));
    this.activeCurrency1 = newActive2;
    this.activeCurrency2 = newActive1;
  }

  checkIfLineOne(currencyObj: Currency): boolean {
    return this.currencyLine1.find((obj) => obj === currencyObj) !== undefined
      ? true
      : false;
  }

  checkIfLineTwo(currencyObj: Currency): boolean {
    return this.currencyLine2.find((obj) => obj === currencyObj) !== undefined
      ? true
      : false;
  }

  checkStatus(currencyObj: Currency): any {
    if (currencyObj.status === undefined) {
      throw new Error('Error. Can not defined status!');
    }
    if (currencyObj.status === StatusEnum.ACTIVE) {
      return StatusEnum.ACTIVE;
    }
    if (currencyObj.status === StatusEnum.AVAILABLE) {
      return StatusEnum.AVAILABLE;
    }
    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) {
      return StatusEnum.NOT_AVAILABLE;
    }
  }

  changeCurrencyStatus(currencyObj: Currency) {
    const findLine1 = this.checkIfLineOne(currencyObj);
    const findLine2 = this.checkIfLineTwo(currencyObj);

    // can not select NOT_AVAILABLE
    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) return;

    // select AVAILABLE in line 1
    if (currencyObj.status === StatusEnum.AVAILABLE && findLine1) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.currencyLine1.map((currency) => {
        if (
          currency.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
      });
      this.currencyLine2.map((currency) => {
        if (
          currency.status === StatusEnum.NOT_AVAILABLE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
        if (currencyObj.currency === currency.currency) {
          this.changeStatusToNotAvailable(currency);
        }
        return;
      });
    }

    // select AVAILABLE in line 2
    if (currencyObj.status === StatusEnum.AVAILABLE && findLine2) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.currencyLine2.map((currency) => {
        if (
          currency.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
      });
      this.currencyLine1.map((currency) => {
        if (
          currency.status === StatusEnum.NOT_AVAILABLE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
        if (currencyObj.currency === currency.currency) {
          this.changeStatusToNotAvailable(currency);
        }
      });
      return;
    }

    this.checkActive(currencyObj, !findLine2);
  }
}
