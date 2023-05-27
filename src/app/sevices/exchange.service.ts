import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyEnum } from '../data/currencies';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getCurr(currency: CurrencyEnum) {
    this.http.get(`https://api.exchangerate.host/latest?base=${currency}`);
  }
}
