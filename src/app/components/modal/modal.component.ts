import { Component } from '@angular/core';
import { currencyToAdd } from 'src/app/data/currencies';
import { Currency, StatusEnum } from 'src/app/data/currency';
import { ModalService } from 'src/app/services/modal.service';
// import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    public modalService: ModalService // public bodyComponent: BodyComponent
  ) {}
  currencies: Currency[] = currencyToAdd;

  tempCurrArray: Currency[] = [];

  prepareToAdd(currencyObj: Currency): Currency[] {
    if (currencyObj.status === StatusEnum.NOT_AVAILABLE) return this.currencies;

    if (currencyObj) {
      currencyObj.status === StatusEnum.AVAILABLE
        ? (currencyObj.status = StatusEnum.ACTIVE)
        : (currencyObj.status = StatusEnum.AVAILABLE);
      if (this.tempCurrArray.includes(currencyObj)) {
        this.tempCurrArray = this.tempCurrArray.filter(
          (curr) => curr !== currencyObj
        );
        return this.currencies;
      }
      this.tempCurrArray.push(currencyObj);
    }
    console.log(this.tempCurrArray);
    return this.currencies;
  }

  addToList() {
    if (this.tempCurrArray.length === 0) return;

    const arrToPush = this.tempCurrArray.map(
      (cur) => (cur.status = StatusEnum.AVAILABLE)
    );

    this.currencies = this.currencies.map((curr) => {
      this.tempCurrArray.find((tempCurr) => {
        if (curr.currency === tempCurr.currency)
          curr.status = StatusEnum.NOT_AVAILABLE;
      });
      return curr;
    });
    console.log(this.tempCurrArray);
  }
}
