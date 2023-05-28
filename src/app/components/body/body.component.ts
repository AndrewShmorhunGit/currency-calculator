import { Component } from '@angular/core';
// import { CurrencyEnum } from 'src/app/data/currencies';
import { Currency, StatusEnum } from 'src/app/data/currency';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  constructor(public modalService: ModalService) {}
  date = new Date().toString();

  curArr1: Currency[] = [
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

  curArr2: Currency[] = [
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

  modalState: false;
  value: number = 1;
  activeCurrency1: string = 'USD';
  activeCurrency2: string = 'UAH';

  checkActive(currencyObj: Currency, isLine1: boolean): void {
    if (currencyObj) {
      if (isLine1) {
        this.activeCurrency1 = currencyObj.currency;
        // console.log(`active1: ${this.activeCurrency1}`);
        return;
      }
      this.activeCurrency2 = currencyObj.currency;
      // console.log(`active2: ${this.activeCurrency2}`);
    }
  }

  changeStatusToAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.AVAILABLE;
  }
  changeStatusToNotAvailable(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.NOT_AVAILABLE;
  }
  changeStatusToActive(currencyObj: Currency): void {
    currencyObj.status = StatusEnum.ACTIVE;
  }

  reverseCondition(currency: Currency): void {
    currency.status === StatusEnum.ACTIVE
      ? (currency.status = StatusEnum.NOT_AVAILABLE)
      : currency.status === StatusEnum.NOT_AVAILABLE
      ? (currency.status = StatusEnum.ACTIVE)
      : StatusEnum.AVAILABLE;
  }
  reverseStatus() {
    const [newActive1, newActive2] = [
      this.activeCurrency1,
      this.activeCurrency2,
    ];
    this.curArr1.map((currency) => this.reverseCondition(currency));
    this.curArr2.map((currency) => this.reverseCondition(currency));
    this.activeCurrency1 = newActive2;
    this.activeCurrency2 = newActive1;
    // console.log(`active1: ${this.activeCurrency1}`);
    // console.log(`active2: ${this.activeCurrency2}`);
  }

  changeCurrencyStatus(currencyObj: Currency) {
    const findLine1 = this.curArr1.find((obj) => obj === currencyObj);
    const findLine2 = this.curArr2.find((obj) => obj === currencyObj);

    const activeInLine1 = this.curArr1.find(
      (obj) => obj.status === StatusEnum.ACTIVE
    );
    const activeInLine2 = this.curArr2.find(
      (obj) => obj.status === StatusEnum.ACTIVE
    );

    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) return;

    if (currencyObj.status === StatusEnum.ACTIVE && findLine1) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.changeStatusToAvailable(currencyObj);
      this.curArr2.map((currency) => {
        if (currency.status === StatusEnum.NOT_AVAILABLE)
          this.changeStatusToAvailable(currency);
      });
    }
    if (currencyObj.status === StatusEnum.ACTIVE && findLine2) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.changeStatusToAvailable(currencyObj);
      this.curArr1.map((currency) => {
        if (currency.status === StatusEnum.NOT_AVAILABLE)
          this.changeStatusToAvailable(currency);
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      !activeInLine1 &&
      findLine1
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr2.map((currency) => {
        if (
          currency.status === StatusEnum.AVAILABLE &&
          currencyObj.currency === currency.currency
        )
          this.changeStatusToNotAvailable(currency);
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      !activeInLine2 &&
      findLine2
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr1.map((currency) => {
        if (
          currency.status === StatusEnum.AVAILABLE &&
          currencyObj.currency === currency.currency
        )
          this.changeStatusToNotAvailable(currency);
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      activeInLine1 &&
      findLine1
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr1.map((currency) => {
        if (
          currency.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
      });
      this.curArr2.map((currency) => {
        if (
          currency.status === StatusEnum.NOT_AVAILABLE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
        if (currencyObj.currency === currency.currency) {
          this.changeStatusToNotAvailable(currency);
        }
      });
    }

    if (
      currencyObj.status === StatusEnum.AVAILABLE &&
      activeInLine2 &&
      findLine2
    ) {
      currencyObj.status = StatusEnum.ACTIVE;
      this.curArr2.map((currency) => {
        if (
          currency.status === StatusEnum.ACTIVE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
      });
      this.curArr1.map((currency) => {
        if (
          currency.status === StatusEnum.NOT_AVAILABLE &&
          currencyObj.currency !== currency.currency
        )
          this.changeStatusToAvailable(currency);
        if (currencyObj.currency === currency.currency) {
          this.changeStatusToNotAvailable(currency);
        }
      });
    }

    this.checkActive(currencyObj, !findLine2);
  }
}
