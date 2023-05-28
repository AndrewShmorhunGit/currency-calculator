import { CurrencyEnum } from './currencies';

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export interface Currency {
  currency: string;
  description?: string;
  status: StatusEnum;
}

export interface AddCurrency {
  currency: '+';
  description: 'add currency';
}
