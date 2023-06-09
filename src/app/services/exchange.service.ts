import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Currency,
  StatusEnum,
  CurrencyLine,
  allCurrencies,
  allCurrenciesCopy1,
  allCurrenciesCopy2,
  activeCurrenciesList,
  allCurrenciesList,
} from '../data/currency';
import { delay } from 'rxjs';
import { Root } from '../data/currencies-request-body';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getCurrList(currency: string) {
    return this.http
      .get(`https://api.exchangerate.host/latest?base=${currency}`)
      .pipe(delay(500));
  }

  getAvailableCurrenciesList(
    allCurrenciesList: string[],
    activeCurrenciesList: string[]
  ): string[] {
    return allCurrenciesList.filter((c) => {
      const curr = activeCurrenciesList.filter((ac) => ac === c);
      return c === curr[0];
    });
  }

  getAvailableCurrencies(
    allCurrenciesArray: Currency[],
    activeCurrenciesList: string[]
  ): Currency[] {
    return allCurrenciesArray.filter((c) => {
      const curr = activeCurrenciesList.filter((ac) => ac === c.currency);
      return c.currency !== curr[0];
    });
  }

  getActiveCurrencies(
    allCurrenciesArray: Currency[],
    activeCurrenciesList: string[]
  ): Currency[] {
    return allCurrenciesArray.filter((c) => {
      const curr = activeCurrenciesList.filter((ac) => ac === c.currency);
      return c.currency === curr[0];
    });
  }

  allCurrenciesArray: Currency[] = allCurrencies;

  activeCurrenciesList: string[] = activeCurrenciesList;

  allCurrenciesList: string[] = allCurrenciesList;

  activeCurrenciesArray: Currency[] = this.getActiveCurrencies(
    this.allCurrenciesArray,
    this.activeCurrenciesList
  );

  allCurrenciesArrayLine1 = allCurrenciesCopy1;

  allCurrenciesArrayLine2 = allCurrenciesCopy2;

  activeCurrency1: string = 'USD';
  activeCurrency2: string = 'UAH';

  availableCurrencyArray: Currency[] = this.getAvailableCurrencies(
    this.allCurrenciesArray,
    this.activeCurrenciesList
  );

  availableCurrenciesList = this.getAvailableCurrenciesList(
    this.allCurrenciesList,
    this.activeCurrenciesList
  );

  currenciesOfLine1 = this.getActiveCurrencies(
    this.allCurrenciesArrayLine1,
    this.activeCurrenciesList
  ).map((c) => {
    if (c.currency === 'USD') c.status = StatusEnum.ACTIVE;
    if (c.currency === 'UAH') c.status = StatusEnum.NOT_AVAILABLE;
    return c;
  });

  currenciesOfLine(
    allCurrArrLine: Currency[],
    allActiveCurrenciesList: string[],
    active1: string,
    active2: string,
    line: number
  ): Currency[] {
    return this.getActiveCurrencies(
      allCurrArrLine,
      allActiveCurrenciesList
    ).map((c) => {
      if (c.currency === (line === 1 ? active1 : active2))
        c.status = StatusEnum.ACTIVE;
      if (c.currency === (line === 1 ? active2 : active1))
        c.status = StatusEnum.NOT_AVAILABLE;
      return c;
    });
  }

  currencyLine1: CurrencyLine = {
    currencies: this.currenciesOfLine(
      this.allCurrenciesArrayLine1,
      this.activeCurrenciesList,
      this.activeCurrency1,
      this.activeCurrency2,
      1
    ),
    line: 1,
  };

  currencyLine2: CurrencyLine = {
    currencies: this.currenciesOfLine(
      this.allCurrenciesArrayLine2,
      this.activeCurrenciesList,
      this.activeCurrency1,
      this.activeCurrency2,
      2
    ),
    line: 2,
  };

  changeStatusToAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.AVAILABLE;
  }
  changeStatusToNotAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.NOT_AVAILABLE;
  }
  changeStatusToActive(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.ACTIVE;
  }

  updateLists(list: string[]): void {
    list.map((item) => this.activeCurrenciesList.push(item));
    console.log(this.activeCurrenciesList);

    (this.currencyLine1 = {
      ...this.currencyLine1,
      currencies: this.currenciesOfLine(
        this.allCurrenciesArrayLine1,
        this.activeCurrenciesList,
        this.activeCurrency1,
        this.activeCurrency2,
        1
      ),
    }),
      console.log(this.currencyLine1.currencies);
    (this.currencyLine2 = {
      ...this.currencyLine2,
      currencies: this.currenciesOfLine(
        this.allCurrenciesArrayLine2,
        this.activeCurrenciesList,
        this.activeCurrency1,
        this.activeCurrency2,
        2
      ),
    }),
      console.log(this.currencyLine2.currencies);
  }

  reverseCondition(currency: Currency): void {
    currency.status === StatusEnum.ACTIVE
      ? (currency.status = StatusEnum.NOT_AVAILABLE)
      : currency.status === StatusEnum.NOT_AVAILABLE
      ? (currency.status = StatusEnum.ACTIVE)
      : StatusEnum.AVAILABLE;
  }

  checkActive(currencyObj: Currency, isLine1: boolean): void {
    if (currencyObj) {
      if (isLine1) {
        this.activeCurrency1 = currencyObj.currency;
        console.log(`active1: ${this.activeCurrency1}`);
        return;
      }
      this.activeCurrency2 = currencyObj.currency;
      console.log(`active2: ${this.activeCurrency2}`);
    }
  }

  reverseStatus() {
    const [newActive1, newActive2] = [
      this.activeCurrency1,
      this.activeCurrency2,
    ];
    this.currencyLine1.currencies.map((currency) =>
      this.reverseCondition(currency)
    );
    this.currencyLine2.currencies.map((currency) =>
      this.reverseCondition(currency)
    );
    this.activeCurrency1 = newActive2;
    this.activeCurrency2 = newActive1;
  }

  checkIfLineOne(currencyLine: CurrencyLine): boolean {
    return this.currencyLine1.line === currencyLine.line ? true : false;
  }

  checkIfLineTwo(currencyLine: CurrencyLine): boolean {
    return this.currencyLine2.line === currencyLine.line ? true : false;
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

  changeCurrencyStatus(currencyObj: Currency, currencyLine: CurrencyLine) {
    const findLine1 = this.checkIfLineOne(currencyLine);
    const findLine2 = this.checkIfLineTwo(currencyLine);

    // can not select NOT_AVAILABLE
    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) return;

    // select AVAILABLE in line 1
    if (currencyObj.status === StatusEnum.AVAILABLE && findLine1) {
      this.currencyLine1.currencies.map((cur) => {
        if (
          cur.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== cur.currency
        ) {
          this.changeStatusToAvailable(cur);
          currencyObj.status = StatusEnum.ACTIVE;
        }
      });
      this.currencyLine2.currencies.map((currency) => {
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

    // select AVAILABLE in line 2
    if (currencyObj.status === StatusEnum.AVAILABLE && findLine2) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.currencyLine2.currencies.map((currency) => {
        if (
          currency.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
      });
      this.currencyLine1.currencies.map((currency) => {
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

    this.checkActive(currencyObj, !findLine2);
  }

  // Exchange functions

  getUsdHrn(data: Root | any) {
    return (1 / data.rates.USD).toFixed(2);
  }

  getEurHrn(data: Root | any) {
    return (1 / data.rates.EUR).toFixed(2);
  }

  // Exchange calculator function

  currCalc(
    data: Root | any,
    active1: string,
    active2: string = 'UAH',
    multiply: number,
    reverse: boolean
  ): number {
    const list = data.rates;
    if (!reverse) {
      return multiply / list[active1];
    }
    return multiply / list[active2];
  }
}
