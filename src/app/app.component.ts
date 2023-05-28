import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';
// import { Currency } from './data/currencies';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Currency Converter';
  constructor(public modalService: ModalService) {}
}
