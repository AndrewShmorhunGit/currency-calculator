import { Component, OnInit } from '@angular/core';
import { Root } from 'src/app/data/currencies-request-body';
// import { CurrencyEnum } from 'src/app/data/currencies';
import { Currency, CurrencyLine, StatusEnum } from 'src/app/data/currency';
import { ExchangeService } from 'src/app/services/exchange.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    public exchangeService: ExchangeService
  ) {}

  date = new Date().toString();

  active1 = this.exchangeService.activeCurrency1;
  active2 = this.exchangeService.activeCurrency2;

  curArr1: CurrencyLine = this.exchangeService.currencyLine1;
  curArr2: CurrencyLine = this.exchangeService.currencyLine2;

  value: number = 1;

  loading: boolean = false;
  data: Root | any;

  // result = this.data?.rates

  ngOnInit(): void {
    this.loading = true;
    this.exchangeService.getCurrList(this.active2).subscribe((currencies) => {
      (this.data = currencies), (this.loading = false);
    });
    throw new Error('Method not implemented.');
  }
}
