import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency, StatusEnum } from '../data/currency';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

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

  updateLists(data: Currency[]): void {
    data.map((cur) => {
      if (cur.status !== StatusEnum.AVAILABLE) {
        cur.status = StatusEnum.AVAILABLE;
        this.currencyLine1.push(cur);
        this.currencyLine2.push(cur);
      }
    });
  }

  getCurrList(currency: string) {
    this.http.get(`https://api.exchangerate.host/latest?base=${currency}`);
  }
}
