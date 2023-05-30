import { Component, OnInit } from '@angular/core';
import { Root } from 'src/app/data/currencies-request-body';
import { CurrencyLine, StatusEnum } from 'src/app/data/currency';
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
  input: number = 1;
  loading: boolean = false;
  data: Root | any;

  newCurrList: string[];

  ngOnInit(): void {
    this.loading = true;
    this.exchangeService
      .getCurrList(this.exchangeService.activeCurrency2)
      .subscribe((currencies) => {
        (this.data = currencies), (this.loading = false);
      });
  }
}
