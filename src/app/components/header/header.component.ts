import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Root } from 'src/app/data/currencies-request-body';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(public exchangeService: ExchangeService) {}
  private $inActive = new Subject<boolean>();

  date = new Date().toString();
  time = new Date();

  loading: boolean = false;
  data: Root | any;

  startClock() {
    interval(1)
      .pipe(takeUntil(this.$inActive))
      .subscribe((data) => {
        this.time = new Date();
      });
  }

  ngOnDestroy(): void {
    this.$inActive.next(true);
    this.$inActive.unsubscribe();
  }

  ngOnInit(): void {
    this.startClock();
    this.loading = true;
    this.exchangeService.getCurrList('UAH').subscribe((currencies) => {
      (this.loading = false), console.log(currencies), (this.data = currencies);
    });
  }
}
