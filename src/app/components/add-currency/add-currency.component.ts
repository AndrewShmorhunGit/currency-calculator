import { Component } from '@angular/core';
import { AddCurrency, Currency } from 'src/app/data/currency';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss'],
})
export class AddCurrencyComponent {
  addCurrency: AddCurrency = { currency: '+', description: 'add' };
}
