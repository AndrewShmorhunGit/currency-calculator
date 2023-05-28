import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../data/currency';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);

  open() {
    this.isVisible$.next(true);
  }

  close() {
    this.isVisible$.next(false);
  }

  addCurrencies(curArr: Currency): void {}
}
