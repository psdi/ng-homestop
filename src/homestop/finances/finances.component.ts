import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanceService } from '../finance.service';
import { Finance } from '../interfaces/finance';

import * as _moment from 'moment';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { FinancesDataSource } from './finances.datasource';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'expenses',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class FinancesComponent implements OnInit {

  finances$: Observable<Finance[]> = new Observable();
  date = new FormControl(moment());
  dateStr: string = '';

  // table
  dataSource: FinancesDataSource;
  displayedColumns: string[] = ['day', 'description', 'category', 'amount'];

  spanList: { [key: number]: number } = {};

  constructor(private finances: FinanceService) {
    this.dataSource = new FinancesDataSource(this.finances);
  }

  ngOnInit(): void {
    this.update();
  }

  selectMonth(newDate: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.date.value!;
    ctrlValue.month(newDate.month());
    ctrlValue.year(newDate.year());
    this.date.setValue(ctrlValue);
    this.update();

    datepicker.close();
  }

  toggleMonth(num: number): void {
    const ctrlValue = this.date.value!;
    ctrlValue.add(num, 'months');
    this.date.setValue(ctrlValue);
    this.update();
  }

  update(): void {
    const ctrlValue = this.date.value!;
    this.dataSource.loadFinances({
      month: ctrlValue.month() + 1, // months start at 0
      year: ctrlValue.year(),
    });

    this.dateStr = ctrlValue.format('MMMM YYYY');
  }

  getDay(date: string) {
    return (moment(date, 'YYYY-MM-DD HH:mm:ss')).date();
  }

  format(amount: number, is_expense: boolean = false) {
    const formatter = new Intl.NumberFormat('de-DE',  {
      style: 'currency',
      currency: 'EUR',
    });

    return formatter.format(is_expense ? amount * -1 : amount);
  }

  getRowSpan(i: number) {
    if (!Object.keys(this.spanList).length) {
      this.spanList = this.dataSource.getSpanList();
    }

    return this.spanList.hasOwnProperty(i) ? this.spanList[i] : 0;
  }

  getNet(): number {
    return this.dataSource.getNet();
  }
}
