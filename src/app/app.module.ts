import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { HeaderComponent } from './components/header/header.component';
import { AddCurrencyComponent } from './components/add-currency/add-currency.component';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from './components/body/body.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { FilterCurrenciesPipe } from './pipes/filter-currencies.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    HeaderComponent,
    AddCurrencyComponent,
    BodyComponent,
    ModalComponent,
    FilterCurrenciesPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
