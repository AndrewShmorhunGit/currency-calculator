import { Component, OnInit } from '@angular/core';
import { Root } from 'src/app/data/currencies-request-body';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  date = new Date().toString();
  constructor(public exchangeService: ExchangeService) {}

  loading: boolean = false;
  data: Root | any;
  getUsdHrn() {
    return (1 / this.data?.rates.USD).toFixed(2);
  }

  getEurHrn() {
    return (1 / this.data.rates.EUR).toFixed(2);
  }

  exchangeResultFunction() {}

  ngOnInit(): void {
    this.loading = true;
    this.exchangeService.getCurrList('UAH').subscribe((currencies) => {
      (this.loading = false), console.log(currencies), (this.data = currencies);
    });
  }
}
