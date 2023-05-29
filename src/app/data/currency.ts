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
  currency: string;
  description?: 'add';
}

export interface CurrencyLine {
  currencies: Currency[];
  line: number;
}

export const allCurrencies: Currency[] = [
  {
    currency: 'USD',
    description: 'united states dollar',
    status: StatusEnum.AVAILABLE,
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
    status: StatusEnum.AVAILABLE,
  },
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
