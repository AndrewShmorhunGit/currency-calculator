import { StatusEnum } from './currency';

export const currencyToAdd = [
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

export const currencyLine1 = [
  {
    currency: 'USD',
    description: 'united states dollar',
    status: StatusEnum.ACTIVE,
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
    status: StatusEnum.NOT_AVAILABLE,
  },
];

export const currencyLine2 = [
  {
    currency: 'USD',
    description: 'united states dollar',
    status: StatusEnum.NOT_AVAILABLE,
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
    status: StatusEnum.ACTIVE,
  },
];
