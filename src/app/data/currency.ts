import { CurrencyEnum } from './currencies';

export interface Currency {
  currency: CurrencyEnum;
  description?: string;
}

export interface AddCurrency {
  currency: '+';
  description: 'add currency';
}
