import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanceService } from '../finance.service';
import { Finance } from '../interfaces/finance';

import * as _moment from 'moment';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

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

  constructor(private finances: FinanceService) { }

  ngOnInit(): void {
    this.finances.loadFinances();
    this.finances$ = this.finances.getFinances();
  }

  selectMonth(date: Moment, datepicker: MatDatepicker<Moment>): void {
    this.finances.loadFinances({
      month: date.month() + 1, // months start at 0
      year: date.year(),
    });
    datepicker.close();
  }

}
