import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';
import { ExchangeService } from './services/exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public modalService: ModalService,
    public exchangeService: ExchangeService
  ) {}
  title = 'Currency Converter';
}
